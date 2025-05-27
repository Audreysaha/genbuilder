import React, { useEffect, useState } from "react";
import CanvasItem from "./CanvasItem";

const Canvas = ({
  width,
  height,
  zoom,
  canvasItems,
  setCanvasItems,
  addComponentToCanvas,
}) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const pushToUndoStack = (items) => {
    setUndoStack((prev) => [...prev, items]);
    setRedoStack([]); // reset redo stack on any new action
  };

  const updateCanvasItem = (id, updates) => {
    pushToUndoStack(canvasItems);
    setCanvasItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData("componentType");
    if (componentType) {
      pushToUndoStack(canvasItems);
      addComponentToCanvas(componentType);
    }
  };

  const handleCanvasClick = (e) => {
    if (e.target.dataset.item) return;
    setSelectedItemId(null);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    setRedoStack((r) => [...r, canvasItems]);
    setCanvasItems(previous);
    setUndoStack((u) => u.slice(0, -1));
    setSelectedItemId(null);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setUndoStack((u) => [...u, canvasItems]);
    setCanvasItems(next);
    setRedoStack((r) => r.slice(0, -1));
    setSelectedItemId(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const target = e.target;
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isInput) {
        return;
      }

      const isCtrl = e.ctrlKey || e.metaKey;

      if ((e.key === "Delete" || e.key === "Backspace") && selectedItemId) {
        e.preventDefault();
        pushToUndoStack(canvasItems);
        setCanvasItems((items) =>
          items.filter((item) => item.id !== selectedItemId)
        );
        setSelectedItemId(null);
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
      className="flex-1 overflow-auto p-10 flex items-center justify-center"
      style={{ backgroundColor: "#F3F4F6" }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleCanvasClick}
    >
      <div
        className="relative bg-white shadow-xl"
        style={{
          width: `${(width * zoom) / 100}px`,
          height: `${(height * zoom) / 100}px`,
          transform: `scale(${zoom / 100})`,
          transformOrigin: "center center",
        }}
      >
        <div className="relative w-full h-full bg-gray-100">
          {canvasItems.map((item) => (
            <CanvasItem
              key={item.id}
              item={item}
              isSelected={selectedItemId === item.id}
              onSelect={() => setSelectedItemId(item.id)}
              onUpdate={updateCanvasItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Canvas;
