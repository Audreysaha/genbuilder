import CanvasItem from './CanvasItem';

const DropZone = ({ canvasItems, addComponentToCanvas }) => {
  const handleDrop = (e) => {
    const componentType = e.dataTransfer.getData("componentType");
    addComponentToCanvas(componentType);
  };

  return (
    <div
      className="canvas-area"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {canvasItems.map((item) => (
        <div key={item.id} className="mb-4 p-4 bg-white border rounded shadow-sm">
          <CanvasItem item={item} />
        </div>
      ))}
    </div>
  );
};

export default DropZone;
