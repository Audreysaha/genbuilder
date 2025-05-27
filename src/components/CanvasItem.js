import React, { useState } from "react";
import { Rnd } from "react-rnd";

const CanvasItem = ({ item, onUpdate, isSelected, onSelect }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.content || "");
  const [src, setSrc] = useState(item.src || "");

  const handleDoubleClick = () => {
    if (item.type === "heading" || item.type === "paragraph") {
      setIsEditing(true);
    } else if (item.type === "image" || item.type === "video") {
      triggerFileInput();
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    onUpdate(item.id, { content: text });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSrc(url);
    onUpdate(item.id, { src: url });
  };

  const triggerFileInput = () => {
    const input = document.createElement("input");
    input.type = "file";
    if (item.type === "image") input.accept = "image/*";
    if (item.type === "video") input.accept = "video/*";
    input.onchange = handleFileChange;
    input.click();
  };

  const renderContent = () => {
    switch (item.type) {
      // Topography
      case "heading":
        return isEditing ? (
          <input
            autoFocus
            className="text-2xl font-bold w-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
          />
        ) : (
          <h1 className="text-2xl font-bold cursor-text" onDoubleClick={handleDoubleClick}>
            {item.content || "Heading"}
          </h1>
        );

      case "paragraph":
        return isEditing ? (
          <textarea
            autoFocus
            className="text-gray-700 w-full h-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
          />
        ) : (
          <p className="text-gray-700 cursor-text" onDoubleClick={handleDoubleClick}>
            {item.content || "Lorem ipsum dolor sit amet..."}
          </p>
        );

      case "image":
        return (
          <div
            className="w-full h-full cursor-pointer"
            onDoubleClick={triggerFileInput}
          >
            <img
              src={src || "https://via.placeholder.com/150"}
              alt="Canvas"
              className="w-full h-full object-cover"
            />
          </div>
        );

      case "video":
        return (
          <div
            className="w-full h-full cursor-pointer"
            onDoubleClick={triggerFileInput}
          >
            <video className="w-full h-full" controls>
              <source
                src={src || "https://www.w3schools.com/html/mov_bbb.mp4"}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        );

      // Visual items
      case "textfield":
        return isEditing ? (
          <input
            autoFocus
            className="w-full border p-1"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
          />
        ) : (
          <input
            type="text"
            className="w-full border p-1"
            placeholder={item.content || "Enter text..."}
            onDoubleClick={handleDoubleClick}
          />
        );

      case "submit-button":
        return <button className="bg-blue-500 text-white px-4 py-2 rounded w-full h-full">{item.content || "Submit"}</button>;

      case "checkbox":
        return (
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>{item.content || "Check me"}</span>
          </label>
        );

      case "dropdown":
        return (
          <select className="border p-1 w-full">
            <option>{item.content || "Select an option"}</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        );

      case "search":
        return isEditing ? (
          <input
            autoFocus
            className="w-full border p-1"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
          />
        ) : (
          <input
            type="search"
            className="w-full border p-1"
            placeholder={item.content || "Search..."}
            onDoubleClick={handleDoubleClick}
          />
        );

      // Navigation
      case "navbar":
        return (
          <nav className="bg-gray-800 text-white px-4 py-2 flex space-x-4">
            <span>Home</span>
            <span>About</span>
            <span>Contact</span>
          </nav>
        );

      case "sidebar":
        return (
          <aside className="bg-gray-200 h-full p-2 space-y-2">
            <div>Dashboard</div>
            <div>Settings</div>
            <div>Logout</div>
          </aside>
        );

      case "tabs":
        return (
          <div className="flex border-b">
            <button className="px-4 py-2 border-b-2 border-blue-500">Tab 1</button>
            <button className="px-4 py-2">Tab 2</button>
          </div>
        );

      case "breadcrumbs":
        return (
          <div className="text-sm text-gray-600">
            Home &gt; Category &gt; Page
          </div>
        );

      // Layout
      case "grid":
        return (
          <div className="grid grid-cols-2 gap-2 w-full h-full">
            <div className="bg-gray-100 p-2">Col 1</div>
            <div className="bg-gray-200 p-2">Col 2</div>
          </div>
        );

      case "headers":
        return <header className="bg-blue-100 p-4 text-center font-bold">Header</header>;

      case "footer":
        return <footer className="bg-gray-300 p-4 text-center">Footer Content</footer>;

      case "sidepanel":
        return (
          <div className="bg-gray-100 p-2 w-full h-full">
            Side Panel Content
          </div>
        );

      case "card":
        return (
          <div className="bg-white shadow p-4 rounded h-full w-full">
            <h2 className="text-lg font-bold">Card Title</h2>
            <p>Card content goes here.</p>
          </div>
        );

      default:
        return <div>Unknown Component</div>;
    }
  };

  return (
    <Rnd
      default={{
        x: item.x,
        y: item.y,
        width: item.width || 200,
        height: item.height || 100,
      }}
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
    >
      <div
        className={`w-full h-full p-2 bg-white ${isSelected ? "border border-blue-500" : ""
          }`}
        data-item
      >
        {renderContent()}
      </div>
    </Rnd>
  );
};

export default CanvasItem;
