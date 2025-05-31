import React from "react";
import { Rnd } from "react-rnd";

const CanvasItem = ({ item, onUpdate, isSelected, onSelect }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
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
    const commonTextStyles = {
      margin: 0,
      padding: 0,
      lineHeight: 1.2,
      boxSizing: "border-box",
      width: "100%",
      height: "100%",
      resize: "none",
    };

    switch (item.type) {
      case "heading":
        return (
          <input
            className="text-2xl font-bold w-full"
            style={{ ...commonTextStyles }}
            value={item.content || ""}
            onChange={(e) =>
              onUpdate(item.id, { content: e.target.value })
            }
          />
        );

      case "paragraph":
        return (
          <textarea
            style={{ ...commonTextStyles, overflow: "auto" }}
            value={item.content || ""}
            onChange={(e) =>
              onUpdate(item.id, { content: e.target.value })
            }
          />
        );

      case "image":
        return (
          <div
            className="w-full h-full cursor-pointer"
            onDoubleClick={triggerFileInput}
            style={{ padding: 0, margin: 0 }}
          >
            <img
              src={item.src || "https://via.placeholder.com/150"}
              alt="Canvas"
              className="w-full h-full object-cover"
              style={{ display: "block", margin: 0, padding: 0 }}
            />
          </div>
        );

      case "video":
        return (
          <div
            className="w-full h-full cursor-pointer"
            onDoubleClick={triggerFileInput}
            style={{ padding: 0, margin: 0 }}
          >
            <video className="w-full h-full" controls style={{ display: "block" }}>
              <source
                src={item.src || "https://www.w3schools.com/html/mov_bbb.mp4"}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        );

      case "textfield":
        return (
          <input
            className="w-full border"
            style={{ ...commonTextStyles, padding: "0.25rem" }}
            value={item.content || ""}
            onChange={(e) =>
              onUpdate(item.id, { content: e.target.value })
            }
          />
        );

      case "submit-button":
        return (
          <button className="bg-blue-500 text-white rounded w-full h-full" style={{ padding: "0.5rem" }}>
            {item.content || "Submit"}
          </button>
        );

      case "checkbox":
        return (
          <label className="flex items-center space-x-2" style={{ margin: 0, padding: 0 }}>
            <input type="checkbox" />
            <span>{item.content || "Check me"}</span>
          </label>
        );

      case "dropdown":
        return (
          <select className="border w-full" style={{ padding: "0.25rem", margin: 0 }}>
            <option>{item.content || "Select an option"}</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        );

      case "search":
        return (
          <input
            type="search"
            className="border w-full"
            style={{ padding: "0.25rem", margin: 0 }}
            value={item.content || ""}
            onChange={(e) =>
              onUpdate(item.id, { content: e.target.value })
            }
          />
        );

      case "navbar":
        return (
          <nav className="bg-gray-800 text-white px-2 py-1 flex space-x-2" style={{ margin: 0 }}>
            <span>Home</span>
            <span>About</span>
            <span>Contact</span>
          </nav>
        );

      case "sidebar":
        return (
          <aside className="bg-gray-200 h-full p-1 space-y-1" style={{ margin: 0 }}>
            <div>Dashboard</div>
            <div>Settings</div>
            <div>Logout</div>
          </aside>
        );

      case "tabs":
        return (
          <div className="flex border-b" style={{ margin: 0 }}>
            <button className="px-2 py-1 border-b-2 border-blue-500">Tab 1</button>
            <button className="px-2 py-1">Tab 2</button>
          </div>
        );

      case "breadcrumbs":
        return (
          <div className="text-sm text-gray-600" style={{ margin: 0 }}>
            Home &gt; Category &gt; Page
          </div>
        );

      case "grid":
        return (
          <div className="grid grid-cols-2 gap-1 w-full h-full" style={{ margin: 0 }}>
            <div className="bg-gray-100 p-1">Col 1</div>
            <div className="bg-gray-200 p-1">Col 2</div>
          </div>
        );

      case "headers":
        return (
          <header className="bg-blue-100 p-2 text-center font-bold" style={{ margin: 0 }}>
            Header
          </header>
        );

      case "footer":
        return (
          <footer className="bg-gray-300 p-2 text-center" style={{ margin: 0 }}>
            Footer Content
          </footer>
        );

      case "sidepanel":
        return (
          <div className="bg-gray-100 p-1 w-full h-full" style={{ margin: 0 }}>
            Side Panel Content
          </div>
        );

      case "card":
        return (
          <div className="bg-white shadow rounded w-full h-full p-2" style={{ margin: 0 }}>
            <h2 className="text-lg font-bold" style={{ margin: 0, padding: 0 }}>
              Card Title
            </h2>
            <p style={{ margin: 0, padding: 0 }}>Card content goes here.</p>
          </div>
        );

      default:
        return <div style={{ margin: 0, padding: 0 }}>Unknown Component</div>;
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
        className={`w-full h-full bg-white ${isSelected ? "border border-blue-500" : ""}`}
        data-item
        style={{ padding: 0, margin: 0, boxSizing: "border-box" }}
      >
        {renderContent()}
      </div>
    </Rnd>
  );
};

export default CanvasItem;
