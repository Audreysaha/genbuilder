export const generateReactCode = (items) => {
  let jsx = "";
  let css = "";

  items.forEach((item, index) => {
    const { type, x = 0, y = 0, content = "", props = {} } = item;
    const className = `comp-${index}`;
    const style = `position: absolute; left: ${x}px; top: ${y}px;`;

    css += `.${className} {\n  ${style}\n`;

    let element = "";

    switch (type) {
      case "heading":
        css += "  font-size: 24px;\n  font-weight: bold;\n";
        element = `<h1 className="${className}">${content || "Heading"}</h1>`;
        break;

      case "paragraph":
        css += "  font-size: 16px;\n  color: #4a4a4a;\n";
        element = `<p className="${className}">${content || "Lorem ipsum dolor sit amet..."}</p>`;
        break;

      case "image":
        css += "  width: 100px;\n  height: 100px;\n  object-fit: cover;\n";
        element = `<img src="${props.src || "https://via.placeholder.com/150"}" alt="Canvas" className="${className}" />`;
        break;

      case "video":
        css += "  width: 200px;\n  height: 150px;\n";
        element = `<video controls className="${className}">\n  <source src="${props.src || "https://www.w3schools.com/html/mov_bbb.mp4"}" type="video/mp4" />\n</video>`;
        break;

      case "textfield":
        css += "  border: 1px solid #ccc;\n  padding: 4px;\n";
        element = `<input type="text" defaultValue="${content}" placeholder="Enter text..." className="${className}" />`;
        break;

      case "submit-button":
        css += "  background-color: #3b82f6;\n  color: white;\n  padding: 8px 16px;\n  border-radius: 4px;\n  border: none;\n";
        element = `<button className="${className}">${content || "Submit"}</button>`;
        break;

      case "checkbox":
        css += "  display: flex;\n  gap: 8px;\n  align-items: center;\n";
        element = `<label className="${className}">\n  <input type="checkbox" />\n  <span>${content || "Check me"}</span>\n</label>`;
        break;

      case "dropdown":
        css += "  padding: 4px;\n  border: 1px solid #ccc;\n";
        element = `<select className="${className}">\n  <option>${content || "Select an option"}</option>\n  <option>Option 1</option>\n  <option>Option 2</option>\n</select>`;
        break;

      case "search":
        css += "  padding: 4px;\n  border: 1px solid #ccc;\n";
        element = `<input type="search" placeholder="${content || "Search..."}" className="${className}" />`;
        break;

      case "navbar":
        css += "  display: flex;\n  gap: 16px;\n  background-color: #1f2937;\n  color: white;\n  padding: 8px;\n";
        element = `<nav className="${className}">\n  <span>Home</span>\n  <span>About</span>\n  <span>Contact</span>\n</nav>`;
        break;

      case "sidebar":
        css += "  background-color: #e5e7eb;\n  padding: 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n";
        element = `<aside className="${className}">\n  <div>Dashboard</div>\n  <div>Settings</div>\n  <div>Logout</div>\n</aside>`;
        break;

      case "tabs":
        css += "  display: flex;\n  border-bottom: 2px solid #ccc;\n";
        element = `<div className="${className}">\n  <button style={{ borderBottom: '2px solid blue' }}>Tab 1</button>\n  <button>Tab 2</button>\n</div>`;
        break;

      case "breadcrumbs":
        css += "  color: #6b7280;\n  font-size: 14px;\n";
        element = `<div className="${className}">Home &gt; Category &gt; Page</div>`;
        break;

      case "grid":
        css += "  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 8px;\n";
        element = `<div className="${className}">\n  <div style={{ backgroundColor: "#f3f4f6", padding: "8px" }}>Col 1</div>\n  <div style={{ backgroundColor: "#e5e7eb", padding: "8px" }}>Col 2</div>\n</div>`;
        break;

      case "headers":
        css += "  background-color: #bfdbfe;\n  text-align: center;\n  padding: 16px;\n  font-weight: bold;\n";
        element = `<header className="${className}">Header</header>`;
        break;

      case "footer":
        css += "  background-color: #d1d5db;\n  text-align: center;\n  padding: 16px;\n";
        element = `<footer className="${className}">Footer Content</footer>`;
        break;

      case "sidepanel":
        css += "  background-color: #f3f4f6;\n  padding: 8px;\n";
        element = `<div className="${className}">Side Panel Content</div>`;
        break;

      case "card":
        css += "  background-color: white;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  padding: 16px;\n  border-radius: 8px;\n";
        element = `<div className="${className}">\n  <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Card Title</h2>\n  <p>Card content goes here.</p>\n</div>`;
        break;

      default:
        element = `<div className="${className}">{/* Unknown component type: ${type} */}</div>`;
    }

    css += `}\n\n`;
    jsx += element + "\n";
  });

  const fullReactCode = `
import React from "react";
import "./styles.css";

export default function Canvas() {
  return (
    <div className="canvas">
${jsx.trim().split("\n").map(line => "    " + line).join("\n")}
    </div>
  );
}
`.trim();

  return {
    jsx: fullReactCode,
    css: css.trim(),
  };
};
