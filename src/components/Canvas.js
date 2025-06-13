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
      addComponentToCanvas,
      onSelectWidget,
      projectId
    },
    ref
  ) => {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const api = new API();

    const pushToUndoStack = (items) => {
      setUndoStack((prev) => [...prev, items]);
      setRedoStack([]);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      const componentType = e.dataTransfer.getData("componentType");
      if (componentType) {
        pushToUndoStack(canvasItems);
        addComponentToCanvas(componentType);
      }
    };

    const saveCanvasToDatabase = async () => {
      console.log(projectId)
      try {
        await api.putData(api.apiUrl + `/api/project/update/${projectId}`, {canvasItems}, false);
      } catch (error) {
        console.error("Erreur de sauvegarde :", error);
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

    return (
      <div
        className="flex-1 overflow-auto  p-10 flex items-center justify-center"
        style={{ backgroundColor: "#F3F4F6" }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleCanvasClick}
      >
        <div
          className="relative bg-white shadow-xl"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            transform: `scale(${zoom / 100})`,
            transformOrigin: "center center",
          }}
        >
          <div className="relative w-full h-full bg-gray-100">
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
      </div>
    );
  }
);

export default Canvas;
