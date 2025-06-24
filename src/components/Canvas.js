import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useMemo,
} from "react";
import CanvasItem from "./CanvasItem";
import debounce from "lodash.debounce";
import API from "../utils/API";

const Canvas = forwardRef(
  (
    {
      width,
      height,
      zoom,
      canvasItems,
      setCanvasItems,
      // addComponentToCanvas,
      onSelectWidget,
      projectId,
    },
    ref
  ) => {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, itemId: null });
    const api = new API();

    const pushToUndoStack = (items) => {
      setUndoStack((prev) => [...prev, items]);
      setRedoStack([]);
    };

    // const handleDrop = (e) => {
    //   e.preventDefault();
    //   const componentType = e.dataTransfer.getData("componentType");
    //   if (componentType) {
    //     pushToUndoStack(canvasItems);
    //     addComponentToCanvas(componentType);
    //   }
    // };

    const addComponentToCanvas = (componentType, position = { x: 50, y: 50 }) => {
  const newItem = {
    id: Date.now(),
    type: componentType,
    x: position.x,
    y: position.y,
    // ...other default properties...
  };
  setCanvasItems((prev) => [...prev, newItem]);
};

 
   const handleDrop = (e) => {
  e.preventDefault();
  const componentType = e.dataTransfer.getData("componentType");
  if (componentType) {
    // Find the inner canvas div (the one with relative w-full h-full bg-white)
    const canvasDiv = e.currentTarget.querySelector('.relative.w-full.h-full.bg-white');
    const rect = canvasDiv.getBoundingClientRect();

    // Calculate mouse position relative to the canvas, accounting for zoom
    const x = (e.clientX - rect.left) / (zoom / 100);
    const y = (e.clientY - rect.top) / (zoom / 100);

    pushToUndoStack(canvasItems);
    addComponentToCanvas(componentType, { x, y });
  }
};
    const saveCanvasToDatabase = async () => {
      console.log(projectId);
      try {
        await api.putData(
          api.apiUrl + `/api/project/update/${projectId}`,
          { canvasItems },
          false
        );
      } catch (error) {
        console.error("Error in Saving :", error);
      }
    };

    const debouncedSave = useMemo(
      () => debounce(saveCanvasToDatabase, 3000),
      [canvasItems]
    );

    useEffect(() => {
      if (canvasItems.length > 0) {
        debouncedSave();
      }
    }, [canvasItems]);

    const handleCanvasClick = (e) => {
      if (e.target.dataset.item) return;
      setSelectedItemId(null);
      if (onSelectWidget) onSelectWidget(null);
    };

    const handleDragOver = (e) => e.preventDefault();

    const handleUndo = () => {
      if (undoStack.length === 0) return;
      const previous = undoStack[undoStack.length - 1];
      setRedoStack((r) => [...r, canvasItems]);
      setCanvasItems(previous);
      setUndoStack((u) => u.slice(0, -1));
      setSelectedItemId(null);
      if (onSelectWidget) onSelectWidget(null);
    };

    const handleRedo = () => {
      if (redoStack.length === 0) return;
      const next = redoStack[redoStack.length - 1];
      setUndoStack((u) => [...u, canvasItems]);
      setCanvasItems(next);
      setRedoStack((r) => r.slice(0, -1));
      setSelectedItemId(null);
      if (onSelectWidget) onSelectWidget(null);
    };

    const handleUpdate = (id, changes) => {
      pushToUndoStack(canvasItems);
      setCanvasItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, ...changes } : item
        )
      );
    };

    useImperativeHandle(ref, () => ({
      undo: handleUndo,
      redo: handleRedo,
    }));

    const handleSelect = (id) => {
      setSelectedItemId(id);
      if (onSelectWidget) {
        onSelectWidget(id);
      }
    };

    useEffect(() => {
      
      const handleKeyDown = (e) => {
        const target = e.target;
        const isInput =
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable;

        if (isInput) return;

        const isCtrl = e.ctrlKey || e.metaKey;

        if ((e.key === "Delete" || e.key === "Backspace") && selectedItemId) {
          e.preventDefault();
          pushToUndoStack(canvasItems);
          setCanvasItems((items) =>
            items.filter((item) => item.id !== selectedItemId)
          );
          setSelectedItemId(null);
          if (onSelectWidget) onSelectWidget(null);
        }
        if (isCtrl && e.key.toLowerCase() === "z") {
          e.preventDefault();
          handleUndo();
        }
        if (isCtrl && e.key.toLowerCase() === "y") {
          e.preventDefault();
          handleRedo();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [canvasItems, selectedItemId, undoStack, redoStack]);

    useEffect(() => {
  window.showCanvasContextMenu = (e, itemId) => {
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      itemId,
    });
  };
  // Hide menu on click elsewhere
  const hideMenu = () => setContextMenu((m) => ({ ...m, visible: false }));
  window.addEventListener("click", hideMenu);
  return () => {
    window.removeEventListener("click", hideMenu);
    window.showCanvasContextMenu = null;
  };
}, []);

    return (
      <div
        className=" custom-scrollbar flex-1 overflow-auto p-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 cursor-grab"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleCanvasClick}
      >
        <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #a5b4fc;
          border-radius: 10px;
          border: 2px solid #f3f4f6;
        }
        html.dark .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
        }
        html.dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #6366f1;
          border: 2px solid #1f2937;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #a5b4fc #f3f4f6;
        }
        html.dark .custom-scrollbar {
          scrollbar-color: #6366f1 #1f2937;
        }
        /* Reduce icon stroke width */
        .icon-wrapper svg {
          stroke-width: 1 !important;
        }
      `}</style>
        <div
          className="relative shadow-xl"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            transform: `scale(${zoom / 100})`,
            transformOrigin: "center center",
            backgroundColor: "white", // Keep drop area white
          }}
        >
        
          <div className="relative w-full h-full bg-white">
            {canvasItems.map((item) => (
              <CanvasItem
                key={item.id}
                item={item}
                onUpdate={handleUpdate}
                isSelected={selectedItemId === item.id}
                onSelect={() => handleSelect(item.id)}
              />
            ))}
          </div>
        </div>
        {contextMenu.visible && (
  <div
    style={{
      position: "fixed",
      top: contextMenu.y,
      left: contextMenu.x,
      background: "white",
      border: "1px solid #ccc",
      zIndex: 9999,
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      padding: "8px 0",
      minWidth: 120,
    }}
    onClick={(e) => e.stopPropagation()}
  >
    <div
      style={{ padding: "8px 16px", cursor: "pointer" }}
      onClick={() => {
        // Delete item
        pushToUndoStack(canvasItems);
        setCanvasItems((items) =>
          items.filter((item) => item.id !== contextMenu.itemId)
        );
        setContextMenu((m) => ({ ...m, visible: false }));
      }}
    >
      Delete
    </div>
    <div
      style={{ padding: "8px 16px", cursor: "pointer" }}
      onClick={() => {
        // Edit item (select it for editing)
        setSelectedItemId(contextMenu.itemId);
        if (onSelectWidget) onSelectWidget(contextMenu.itemId);
        setContextMenu((m) => ({ ...m, visible: false }));
      }}
    >
      Edit
    </div>
  </div>
)}
      </div>
    );
  }
);

export default Canvas;
