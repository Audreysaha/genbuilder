import React, { useEffect, useRef, useState } from "react";
import lowcode from "../assets/images/lowcode.jpeg";
import { FiSearch} from "react-icons/fi";
import * as FiIcons from "react-icons/fi"; 
import { Rnd } from "react-rnd";

const CanvasItem = ({ item, onUpdate, isSelected, onSelect }) => {
  const {
    borderRadius,
    src,
    content,
    type,
  } = item;
  
  const initialX = item.x ?? Math.floor(Math.random() * 200);
  const initialY = item.y ?? Math.floor(Math.random() * 200);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onUpdate(item.id, { src: url });
  };

  const triggerFileInput = () => {
    const input = document.createElement("input");
    input.type = "file";
    if (type === "image") input.accept = "image/*";
    if (type === "video") input.accept = "video/*";
    input.onchange = handleFileChange;
    input.click();
  };

  const contentRef = useRef(null);

  const commonStyle = {
    backgroundColor: item.backgroundColor || "transparent",
    borderRadius: item.borderRadius ? `${item.borderRadius}px` : "none",
    fontSize: item.fontSize ? `${item.fontSize}px` : "Arial",
    padding: "1px",
    cursor: "cursor",
    userSelect: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const inputStyle = {
    ...commonStyle,
    padding: "0.25rem",
    lineHeight: 1.2,
    resize: "none",
  };

  useEffect(() => {
    if ((item.width == null || item.height == null) && contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect();
      onUpdate(item.id, {
        width: Math.ceil(rect.width),
        height: Math.ceil(rect.height),
      });
    }
  }, [item.width, item.height, item.content, item.src]); 

  const renderContent = () => {
    switch (type) {

case "submit-button":
  return (
    <button
      type="button"
      className="w-full h-full px-4 py-2 rounded-md"
      style={{
        ...commonStyle,
        backgroundColor: item.backgroundColor || "#4f46e5",
        cursor: "grab",
      }}
      contentEditable={true}
      suppressContentEditableWarning={true}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item.id); 
      }}
      onInput={(e) =>
        onUpdate(item.id, { content: e.currentTarget.textContent })
      }
    >
      {content || "Submit"}
    </button>
  );

case "textfield":
  return (
    <input
      className="w-full h-full"
      style={{
        ...inputStyle,
        border: isSelected ? "2px solid gray" : "1px solid #6b7280",
        borderRadius: "10px",
        cursor: "grab", // 👈 Add grab cursor
      }}
      value={content || ""}
      onChange={(e) => onUpdate(item.id, { content: e.target.value })}
      onClick={(e) => {
        e.stopPropagation();  
        onSelect(item.id);    
      }}
    />
  );

case "text":
  return (
    <div
  style={{

    color: item.textColor || "black",
  }}
>
  {item.content || "Enter a text"} 
</div>

  );


case "checkbox":
        return (
          <label
            className="h-full w-full items-center space-x-2"
            style={{ ...commonStyle, padding: "0.25rem",
            }}
          >
            <input type="checkbox" />
            <span>{content || "Check me"}</span>
          </label>
        );

case "icon":
  const SelectedIcon =
    FiIcons[item.iconName] && typeof FiIcons[item.iconName] === "function"
      ? FiIcons[item.iconName]
      : FiIcons.FiBox;

  return (
    <div style={commonStyle}>
      <SelectedIcon
        size={item.fontSize || 24}
        color={item.textColor || "#000"}
        style={{
          strokeWidth: 1.0,
        }}
      />
    </div>
  );

case "dropdown":
  return (
    <select
      className="w-full h-[50px] bg-gray-200 text-sm rounded px-2 cursor-pointer focus:outline-none"
      style={{
        ...inputStyle,
        backgroundColor: item.backgroundColor || "#e5e7eb",
        appearance: "auto", // ensures native dropdown UI
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item.id);
      }}
      value={content || ""}
      onChange={(e) => onUpdate(item.id, { content: e.target.value })}
    >
      <option value="" disabled>
        Select an option
      </option>
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
    </select>
  );


case "search":
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <FiSearch
        style={{
          position: "absolute",
          top: "50%",
          left: "12px",
          transform: "translateY(-50%)",
          color: "#6b7280", // Tailwind gray-500
          pointerEvents: "none",
          fontSize: "1rem",
        }}
      />
      <input
        type="search"
        className="w-full"
        placeholder="Search..."
        style={{
          ...inputStyle,
          paddingLeft: "2rem", // Creates space between icon and text
          backgroundColor: item.backgroundColor || "#e5e7eb", // gray-200
          border: isSelected ? "2px solid blue" : "1px solid #6b7280", // gray-500
          borderRadius: "10px",
          height: "40px",

        }}
      />
    </div>
  );

case "list":
  return (
    <ul
      className="list-disc list-inside flex space-x-1 w-full h-full"
      style={commonStyle}
    >
      {(item.content || "Item 1,Item 2,Item 3")
        .split(",")
        .map((li, i, arr) => (
          <li
            key={i}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              const newContent = [...arr];
              newContent[i] = e.target.textContent;
              onUpdate(item.id, { content: newContent.join(",") });
            }}
            className="cursor-text outline-none"
          >
            {li.trim()}
          </li>
        ))}
    </ul>
  );

case "container":
  return (
    <div
      className="w-full h-full p-2 border border-dashed border-gray-400 dark:border-gray-600"
      style={commonStyle}
      onClick={(e) => {
        e.stopPropagation(); // Prevent deselecting on parent click
        onSelect(); // Mark container as selected
      }}
    >
      {item.children && item.children.length > 0 ? (
        item.children.map((child) => (
          <CanvasItem
            key={child.id}
            item={child}
            onUpdate={(childId, updates) => {
              const updatedChildren = item.children.map((c) =>
                c.id === childId ? { ...c, ...updates } : c
              );
              onUpdate(item.id, { children: updatedChildren });
            }}
            isSelected={child.id === item.selectedChildId}
            onSelect={() =>
              onUpdate(item.id, { selectedChildId: child.id })
            }
          />
        ))
      ) : (
        <div className="text-gray-400 text-sm italic">Drop items here...</div>
      )}
    </div>
  );

case "grid": {
  // Map gridType to number of columns, default 2
  const columnsMap = {
    "2-cols": 2,
    "3-cols": 3,
    "4-cols": 4,
    "5-cols": 5,
    "6-cols": 6,
  };
  const cols = columnsMap[item.gridType] || 2;
  const childrenInCells = Array.from({ length: cols }, () => []);

  (item.children || []).forEach((child, index) => {
    childrenInCells[index % cols].push(child);
  });

  const handleDropInColumn = (colIndex, droppedItem) => {
    const updatedChildren = [...(item.children || [])];
    updatedChildren.push({
      ...droppedItem,
      id: droppedItem.id || `child-${Date.now()}`,
      // Optionally store column index if needed
      parentGridId: item.id,
      columnIndex: colIndex,
    });

    onUpdate(item.id, { children: updatedChildren });
  };

  return (
    <div
      className="grid gap-4 w-full h-full p-4"
      style={{
        ...commonStyle,
        backgroundColor: item.backgroundColor || "transparent",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        minHeight: 300,  // Increased size here
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {childrenInCells.map((childArray, colIndex) => (
        <div
          key={colIndex}
          className="border border-gray-400 dark:border-gray-700 p-4 min-h-[150px] rounded"
          style={{ minHeight: 150, backgroundColor: "#fafafa" }}
          // Add your drop event handlers here, example:
          onDrop={(e) => {
            e.preventDefault();
            // Extract dropped data from event - adjust as per your DnD setup
            const data = e.dataTransfer.getData("application/json");
            if (!data) return;
            const droppedItem = JSON.parse(data);
            handleDropInColumn(colIndex, droppedItem);
          }}
          onDragOver={(e) => e.preventDefault()} // Allow drop
        >
          {childArray.length > 0 ? (
            childArray.map((child) => (
              <CanvasItem
                key={child.id}
                item={child}
                onUpdate={(childId, updates) => {
                  const updatedChildren = item.children.map((c) =>
                    c.id === childId ? { ...c, ...updates } : c
                  );
                  onUpdate(item.id, { children: updatedChildren });
                }}
                isSelected={isSelected && child.id === item.selectedChildId}
                onSelect={() => onUpdate(item.id, { selectedChildId: child.id })}
              />
            ))
          ) : (
            <div className="text-gray-400 text-sm italic select-none text-center">
              Drop items here...
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

case "wireframe":
  return (
    <div
      className="w-full h-[200px] bg-gray-100 border border-dashed border-gray-400 text-center flex items-center justify-center text-gray-500 cursor-grab"
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item.id);
      }}
    >
      Wireframe Placeholder
    </div>
  );


case "navbar":
  return (
    <nav
      className="flex space-x-2 px-2 py-1"
      style={{
        ...commonStyle,
        backgroundColor: item.backgroundColor || "white",
      }}
    >
      <span>Home</span>
      <span>About</span>
      <span>Contact</span>
    </nav>
  );

 case "sidebar":
        return (
          <aside className="space-y-1 p-1 h-full" style={commonStyle}>
            <div>Dashboard</div>
            <div>Settings</div>
            <div>Logout</div>
          </aside>
        );

      case "image":
        return (
          <div
            className="cursor-grab w-full h-full"
            onDoubleClick={triggerFileInput}
            style={commonStyle}
          >
            <img
              src={lowcode}
              alt="Canvas"
              className="w-full h-full object-cover"
              style={{ borderRadius }}
            />
          </div>
        );

      case "video":
        return (
          <div
            className="cursor-grab w-full h-full"
            onDoubleClick={triggerFileInput}
            style={commonStyle}
          >
            <video className="w-full h-full" controls style={{ borderRadius }}>
              <source
                src={src || "https://www.w3schools.com/html/mov_bbb.mp4"}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        );

case "H1":
  return (
    <h1
      className="text-center font-bold p-2"
      style={{ ...commonStyle, fontSize: "2.5rem" }}
      contentEditable
      suppressContentEditableWarning={true}
      onInput={(e) => item.text = e.currentTarget.textContent}
      spellCheck={false}
    >
      {item.text || "Header 1"}
    </h1>
  );


case "H2":
  return (
    <h2
      className="text-center font-bold p-2"
      style={{ ...commonStyle, fontSize: "2rem" }}
      contentEditable
      suppressContentEditableWarning={true}
      onInput={(e) => item.text = e.currentTarget.textContent}
      spellCheck={false}
    >
    {item.text || "Header 2"}
    </h2>
  );

case "H3":
  return (
    <h3
      className="text-center font-bold p-2"
      style={{ ...commonStyle, fontSize: "1.5rem" }}
       contentEditable
      suppressContentEditableWarning={true}
      onInput={(e) => item.text = e.currentTarget.textContent}
      spellCheck={false}
    >
      {item.text || "Header 3"}
    </h3>
  );

  case "H4":
  return (
    <h4
      className="text-center font-bold p-2"
      style={{ ...commonStyle, fontSize: "1.25rem" }}
      contentEditable
      suppressContentEditableWarning={true}
      onInput={(e) => item.text = e.currentTarget.textContent}
      spellCheck={false}
    >
    {item.text || "Header 4"}
    </h4>
  );

case "H5":
  return (
    <h5
      className="text-center font-bold p-2"
      style={{ ...commonStyle, fontSize: "1rem" }}
      contentEditable
      suppressContentEditableWarning={true}
      onInput={(e) => item.text = e.currentTarget.textContent}
      spellCheck={false}
    >
    {item.text || "Header 5"}
    </h5>
  );      
    }
  };

  return (
  <Rnd
  size={{
    width: item.width || "auto",
    height: item.height || "auto",
  }}
  position={{ x: item.x ?? initialX, y: item.y ?? initialY }}
  bounds="parent"
  onDragStop={(e, d) => onUpdate(item.id, { x: d.x, y: d.y })}
  onResizeStop={(e, direction, ref, delta, position) => {
    onUpdate(item.id, {
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height),
      x: position.x,
      y: position.y,
    });
  }}
  onClick={(e) => {
    e.stopPropagation();
    onSelect();
  }}
  onContextMenu={(e) => {
    e.preventDefault();
    if (typeof window.showCanvasContextMenu === "function") {
      window.showCanvasContextMenu(e, item.id);
    }
  }}
  enableResizing={true}
  style={{
    border: isSelected ? "2px solid blue" : "none",
    boxSizing: "border-box",
  }}
>
  <div style={{ width: "100%", height: "100%" }}>
    {renderContent()}
  </div>
</Rnd>

  );
};

export default CanvasItem;
