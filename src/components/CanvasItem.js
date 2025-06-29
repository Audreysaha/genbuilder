import React, { useEffect, useRef } from "react";
import lowcode from "../assets/images/lowcode.jpeg";
import { FiSearch } from "react-icons/fi";
import * as FiIcons from "react-icons/fi";
import { Rnd } from "react-rnd";

const CanvasItem = ({ item, onUpdate, isSelected, onSelect, isPreviewMode }) => {
  const {
    backgroundColor,
    borderColor,
    borderWidth,
    borderRadius,
    color,
    fontSize,
    fontWeight,
    src,
    content,
    type,
  } = item;

  const initialX = item.x ?? Math.floor(Math.random() * 200);
  const initialY = item.y ?? Math.floor(Math.random() * 200);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file || typeof onUpdate !== "function") return;
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
    borderRadius: item.borderRadius ? `${item.borderRadius}px` : "10px",
    color: item.textColor || "#000000",
    fontSize: item.fontSize ? `${item.fontSize}px` : "Arial",
    fontWeight: item.fontWeight || "normal",
    boxSizing: "border-box",
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
    if (
      !isPreviewMode &&
      (item.width == null || item.height == null) &&
      contentRef.current &&
      typeof onUpdate === "function"
    ) {
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
            className="w-full h-full"
            style={{
              ...commonStyle,
              border: isSelected ? "2px solid gray" : "1px solid #6b7280",
              backgroundColor: item.backgroundColor || "#4f46e5",
              cursor: "grab",
            }}
            onClick={(e) => e.stopPropagation()}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={(e) =>
              !isPreviewMode &&
              typeof onUpdate === "function" &&
              onUpdate(item.id, { content: e.currentTarget.textContent })
            }
          >
            {content || "button"}
          </button>
        );

      case "textfield":
        return (
          <input
            className="w-full h-full border-10px"
            style={{
              inputStyle,
              backgroundColor: item.backgroundColor || "white",
              border: isSelected ? "2px solid gray" : "1px solid #6b7280",
              borderRadius: "10px",
            }}
            value={content || ""}
            onChange={(e) =>
              !isPreviewMode &&
              typeof onUpdate === "function" &&
              onUpdate(item.id, { content: e.target.value })
            }
          />
        );

      case "text":
        return (
          <textarea
            className="w-full h-full focus:outline-none"
            placeholder="Enter text..."
            style={{
              ...inputStyle,
              color: item.textColor || "black",
              backgroundColor: item.backgroundColor || "white",
            }}
            value={item.content || ""}
            onChange={(e) =>
              !isPreviewMode &&
              typeof onUpdate === "function" &&
              onUpdate(item.id, { content: e.target.value })
            }
          />
        );

      case "checkbox":
        return (
          <label className="flex items-center space-x-2" style={commonStyle}>
            <input type="checkbox" />
            <span>{content || "Check me"}</span>
          </label>
        );

      case "dropdown":
        return (
          <select
            className="w-full"
            style={{
              ...inputStyle,
              backgroundColor: item.backgroundColor || "#e5e7eb",
              height: "50px",
            }}
          >
            <option>{content || "Select an option"}</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        );

      case "icon":
        const SelectedIcon = FiIcons[item.iconName] || FiIcons.FiBox;
        return (
          <div style={commonStyle}>
            <SelectedIcon
              size={item.fontSize || 24}
              color={item.textColor || "#000"}
            />
          </div>
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
                color: "#6b7280",
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
                paddingLeft: "2rem",
                backgroundColor: item.backgroundColor || "#e5e7eb",
                border: isSelected ? "2px solid blue" : "1px solid #6b7280",
                borderRadius: "10px",
                height: "40px",
                color: item.textColor || "black",
              }}
              value={content || ""}
              onChange={(e) =>
                !isPreviewMode &&
                typeof onUpdate === "function" &&
                onUpdate(item.id, { content: e.target.value })
              }
            />
          </div>
        );

      case "list":
        return (
          <ul
            className="list-disc pl-5 space-x-8 w-full h-full"
            style={commonStyle}
          >
            {(item.content || "Item 1,Item 2,Item 3")
              .split(",")
              .map((li, i) => (
                <li key={i}>{li.trim()}</li>
              ))}
          </ul>
        );

      case "image":
        return (
          <div
            className="cursor-grab w-full h-full"
            onDoubleClick={!isPreviewMode ? triggerFileInput : undefined}
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
            onDoubleClick={!isPreviewMode ? triggerFileInput : undefined}
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

      case "navbar":
        return (
          <nav className="flex space-x-2 px-2 py-1" style={commonStyle}>
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

      case "grid":
        return (
          <div
            className="grid grid-cols-2 gap-1 w-full h-full"
            style={commonStyle}
          >
            <div className="bg-gray-100 p-1">Col 1</div>
            <div className="bg-gray-200 p-1">Col 2</div>
          </div>
        );

      case "headers":
        return (
          <header className="text-center font-bold p-2" style={commonStyle}>
            Header
          </header>
        );

      case "footer":
        return (
          <footer className="text-center p-2" style={commonStyle}>
            Footer Content
          </footer>
        );

      case "card":
        return (
          <div className="shadow p-2 w-full h-full" style={commonStyle}>
            <h2 className="text-lg font-bold" style={{ margin: 0 }}>
              Card Title
            </h2>
            <p style={{ margin: 0 }}>Card content goes here.</p>
          </div>
        );

      default:
        return (
          <div ref={contentRef} style={commonStyle}>
            {item.content || "Unknown Component"}
          </div>
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
      disableDragging={isPreviewMode}
      enableResizing={!isPreviewMode}
      onDragStop={(e, d) => {
        if (!isPreviewMode && typeof onUpdate === "function") {
          onUpdate(item.id, { x: d.x, y: d.y });
        }
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        if (!isPreviewMode && typeof onUpdate === "function") {
          onUpdate(item.id, {
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
            x: position.x,
            y: position.y,
          });
        }
      }}
      onClick={(e) => {
        if (!isPreviewMode) {
          e.stopPropagation();
          typeof onSelect === "function" && onSelect();
        }
      }}
      enableUserSelectHack={false}
      dragAxis={isPreviewMode ? "none" : "both"}
      resizeHandleComponent={isPreviewMode ? {} : undefined}
      resizeHandleStyles={isPreviewMode ? {} : undefined}
      className={isPreviewMode ? "pointer-events-none" : ""}
      style={{
        border: isSelected && !isPreviewMode ? "2px solid blue" : "none",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%", height: "100%", pointerEvents: "auto" }}>
        {renderContent()}
      </div>
    </Rnd>
  );
};

export default CanvasItem;
