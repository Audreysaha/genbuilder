import React, { useEffect, useRef } from "react";
import lowcode from "../assets/images/lowcode.jpeg";
import { Rnd } from "react-rnd";

const CanvasItem = ({ item, onUpdate, isSelected, onSelect }) => {
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
    borderRadius: item.borderRadius ? `${item.borderRadius}px` : "0px",
    color: item.textColor || "#000000",
    fontSize: item.fontSize ? `${item.fontSize}px` : "inherit",
    fontWeight: item.fontWeight || "normal",
    border: isSelected ? "2px solid blue" : "1px solid transparent",
    boxSizing: "border-box",
    padding: "4px",
    cursor: "pointer",
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
      case "heading":
        return (
          <input
            className="w-full font-bold"
            style={inputStyle}
            value={content || ""}
            onChange={(e) => onUpdate(item.id, { content: e.target.value })}
          />
        );

      case "paragraph":
        return (
          <textarea
            className="w-full"
            style={inputStyle}
            value={content || ""}
            onChange={(e) => onUpdate(item.id, { content: e.target.value })}
          />
        );

      case "textfield":
        return (
          <input
            className="w-full border"
            style={inputStyle}
            value={content || ""}
            onChange={(e) => onUpdate(item.id, { content: e.target.value })}
          />
        );

  case "text":
  return (
    <textarea
      className="w-full resize-none"
      style={{
        ...inputStyle,
        fontWeight: item.fontWeight === "bold" ? "bold" : "normal",
        textDecoration: item.fontStyle === "underline" ? "underline" : "none",
        textAlign: item.textAlign || "left",
        fontFamily: item.fontFamily || "inherit",
      }}
      value={content || ""}
      onChange={(e) => onUpdate(item.id, { content: e.target.value })}
    />
  );


      case "submit-button":
        return (
          <button className="w-full h-full" style={commonStyle}>
            {content || "Submit"}
          </button>
        );

      case "checkbox":
        return (
          <label
            className="flex items-center space-x-2"
            style={{ ...commonStyle, padding: "0.25rem" }}
          >
            <input type="checkbox" />
            <span>{content || "Check me"}</span>
          </label>
        );

      case "dropdown":
        return (
          <select className="w-full" style={inputStyle}>
            <option>{content || "Select an option"}</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        );

      case "search":
        return (
          <input
            type="search"
            className="w-full"
            style={inputStyle}
            value={content || ""}
            onChange={(e) => onUpdate(item.id, { content: e.target.value })}
          />
        );

      case "image":
        return (
          <div
            className="cursor-pointer w-full h-full"
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
            className="cursor-pointer w-full h-full"
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

      case "tabs":
        return (
          <div className="flex border-b" style={commonStyle}>
            <button className="px-2 py-1 border-b-2 border-blue-500">Tab 1</button>
            <button className="px-2 py-1">Tab 2</button>
          </div>
        );

      case "breadcrumbs":
        return (
          <div className="text-sm" style={commonStyle}>
            Home &gt; Category &gt; Page
          </div>
        );

      case "grid":
        return (
          <div className="grid grid-cols-2 gap-1 w-full h-full" style={commonStyle}>
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

      case "sidepanel":
        return (
          <div className="p-1 w-full h-full" style={commonStyle}>
            Side Panel Content
          </div>
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
            {/* Your content */}
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
      position={{ x: item.x || 0, y: item.y || 0 }}
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
      enableResizing={true}
      style={{
        border: isSelected ? "2px solid blue" : "none",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>{renderContent()}</div>
    </Rnd>
  );
};

export default CanvasItem;
