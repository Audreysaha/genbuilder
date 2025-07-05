export const generateReactCode = (items, canvasWidth = 1655, canvasHeight = 620) => {
  let jsxWeb = "";
  let cssWeb = "";

  // Génère le CSS principal du wrapper canvas
  cssWeb += `
.canvas-root {
  position: relative;
  width: ${canvasWidth}px;
  height: ${canvasHeight}px;
  background: #fff;
  overflow: hidden;
  margin: 0 auto;
  box-sizing: border-box;
}
`;

  items.forEach((item, index) => {
    const { type, x = 0, y = 0, width, height, content = "", props = {} } = item;

    const className = `comp-${index}`;
    // Ajoute width/height si dispo, sinon auto
    const styleWeb = `
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    ${width ? `width: ${width}px;` : ""}
    ${height ? `height: ${height}px;` : ""}
    box-sizing: border-box;
    z-index: ${props.zIndex || 1};
    `;

    cssWeb += `.${className} {${styleWeb}\n`;

    // Ajoute styles spécifiques selon le type
    switch (type) {
      case "H1":
        cssWeb += `  font-size: ${props.fontSize || '3.5rem'};
  font-weight: bold;
  color: ${props.textColor || 'inherit'};
  background-color: ${props.backgroundColor || 'transparent'};
  margin: 0;
  padding: 0;
`;
        break;
      case "H2":
        cssWeb += `  font-size: ${props.fontSize || '3.0rem'};
  font-weight: bold;
  color: ${props.textColor || 'inherit'};
  background-color: ${props.backgroundColor || 'transparent'};
  margin: 0;
  padding: 0;
`;
        break;
      case "H3":
        cssWeb += `  font-size: ${props.fontSize || '2.5rem'};
  font-weight: bold;
  color: ${props.textColor || 'inherit'};
  background-color: ${props.backgroundColor || 'transparent'};
  margin: 0;
  padding: 0;
`;
        break;
      case "H4":
        cssWeb += `  font-size: ${props.fontSize || '2.0rem'};
  font-weight: bold;
  color: ${props.textColor || 'inherit'};
  background-color: ${props.backgroundColor || 'transparent'};
  margin: 0;
  padding: 0;
`;
        break;
      case "H5":
        cssWeb += `  font-size: ${props.fontSize || '1.5rem'};
  font-weight: bold;
  color: ${props.textColor || 'inherit'};
  background-color: ${props.backgroundColor || 'transparent'};
  margin: 0;
  padding: 0;
`;
        break;
      case "text":
        cssWeb += `  font-size: ${props.fontSize || '16px'};
  color: ${props.textColor || '#4a4a4a'};
  background-color: ${props.backgroundColor || 'white'};
  font-weight: ${props.bold ? 'bold' : 'normal'};
  font-style: ${props.italic ? 'italic' : 'normal'};
  text-decoration: ${props.underline ? 'underline' : 'none'};
  text-align: ${props.textAlign || 'left'};
  padding: ${props.padding || '8px'};
  font-family: ${props.fontFamily || 'Arial, sans-serif'};
  border: none;
  resize: none;
  outline: none;
`;
        break;
      case "textfield":
        cssWeb += `  border: 1px solid #6b7280;
  padding: ${props.padding || '8px'};
  background-color: ${props.backgroundColor || 'white'};
  color: ${props.textColor || 'black'};
  font-size: ${props.fontSize || '16px'};
  text-align: ${props.textAlign || 'left'};
  border-radius: ${props.borderRadius || '10px'};
  outline: none;
`;
        break;
      case "submit-button":
        cssWeb += `  background-color: ${props.backgroundColor || '#4f46e5'};
  color: ${props.textColor || '#ffffff'};
  padding: 8px 16px;
  border-radius: ${props.borderRadius || '0'}px;
  border: none;
  font-size: ${props.fontSize || '16px'};
  cursor: pointer;
`;
        break;
      case "checkbox":
        cssWeb += `  display: flex;
  gap: 8px;
  align-items: center;
  background-color: ${props.backgroundColor || 'transparent'};
  color: ${props.textColor || 'black'};
  font-size: ${props.fontSize || '16px'};
  padding: 4px;
`;
        break;
      case "radio-button":
      case "radio-button2":
        cssWeb += `  display: flex;
  gap: 8px;
  align-items: center;
  background-color: ${props.backgroundColor || 'transparent'};
  color: ${props.textColor || '#000000'};
  font-size: ${props.fontSize || '14px'};
  font-weight: ${props.bold ? 'bold' : 'normal'};
  font-style: ${props.italic ? 'italic' : 'normal'};
  text-decoration: ${props.underline ? 'underline' : 'none'};
`;
        break;
      case "toggle-button":
        cssWeb += `  display: flex;
  align-items: center;
  gap: 12px;
  color: ${props.textColor || '#000000'};
  font-size: ${props.fontSize || '16px'};
  font-weight: ${props.bold ? 'bold' : 'normal'};
  font-style: ${props.italic ? 'italic' : 'normal'};
  text-decoration: ${props.underline ? 'underline' : 'none'};
`;
        break;
      case "dropdown":
        cssWeb += `  background-color: ${props.backgroundColor || '#e5e7eb'};
  color: ${props.textColor || 'black'};
  font-size: ${props.fontSize || '16px'};
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: ${props.borderRadius || '10px'};
  outline: none;
`;
        break;
      case "search":
        cssWeb += `  position: relative;
  background-color: ${props.backgroundColor || '#e5e7eb'};
  color: ${props.textColor || '#000000'};
  font-size: ${props.fontSize || '14px'};
  border-radius: ${props.borderRadius || '10px'};
  border: 1px solid #6b7280;
  padding-left: 24px;
  outline: none;
`;
        break;
      case "list":
        cssWeb += `  list-style-type: disc;
  padding: 8px;
  background-color: ${props.backgroundColor || 'transparent'};
  color: ${props.textColor || '#000000'};
  font-size: ${props.fontSize || '16px'};
  font-weight: ${props.bold ? 'bold' : 'normal'};
  font-style: ${props.italic ? 'italic' : 'normal'};
  text-decoration: ${props.underline ? 'underline' : 'none'};
  font-family: ${props.fontFamily || 'inherit'};
`;
        break;
      case "icon":
        cssWeb += `  font-size: ${props.fontSize || '24px'};
  color: ${props.textColor || '#000'};
`;
        break;
      case "container":
        cssWeb += `  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: ${props.backgroundColor || 'transparent'};
  color: ${props.textColor || '#000000'};
  border: 1px dashed #9ca3af;
  border-radius: ${props.borderRadius || '0'}px;
`;
        break;
      case "grid":
        const gridType = props.gridType || "2-cols";
        const columnsMap = { "2-cols": 2, "3-cols": 3, "4-cols": 4, "5-cols": 5, "6-cols": 6 };
        const cols = props.cols_lg || props.cols_md || props.cols_sm || props.cols_xl || columnsMap[gridType] || 2;
        cssWeb += `  display: grid;
  grid-template-columns: repeat(${cols}, minmax(0, 1fr));
  gap: 16px;
  padding: 16px;
  background-color: ${props.backgroundColor || 'transparent'};
`;
        break;
      case "navbar":
        cssWeb += `  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: ${props.justifyContent || 'space-between'};
  align-items: center;
  background-color: ${props.backgroundColor || '#f9fafb'};
  color: ${props.textColor || '#111827'};
  padding: 8px 12px;
  font-size: ${props.fontSize || '16px'};
  border-radius: ${props.borderRadius || '0'}px;
`;
        break;
      case "sidebar":
        cssWeb += `  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: ${props.backgroundColor || '#f9fafb'};
  color: ${props.textColor || '#111827'};
  padding: 16px;
  border-right: 2px solid #ccc;
  font-size: ${props.fontSize || 'auto'};
`;
        break;
      case "footer":
        cssWeb += `  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props.backgroundColor || '#f3f4f6'};
  color: ${props.textColor || '#111827'};
  font-size: ${props.fontSize || '16px'};
  padding: 12px;
  border-radius: ${props.borderRadius || '0'}px;
`;
        break;
      case "tabs":
        cssWeb += `  display: flex;
  flex-direction: column;
  background-color: ${props.backgroundColor || '#ffffff'};
  color: ${props.textColor || '#111827'};
  font-size: ${props.fontSize || 'auto'};
  padding: 10px;
`;
        break;
      case "divider":
        cssWeb += `  border: none;
  border-top: ${props.thickness || 4}px solid ${props.color || '#4f46e5'};
  border-radius: ${(props.thickness || 4) / 2}px;
  width: ${props.width || '100%'};
  margin: ${props.margin || 32}px 0;
`;
        break;
      case "image":
        cssWeb += `  width: ${props.width || '100px'};
  height: ${props.height || '100px'};
  object-fit: ${props.objectFit || 'contain'};
  border-radius: ${props.borderRadius || '0'}px;
  background-color: ${props.backgroundColor || 'transparent'};
  overflow: hidden;
`;
        break;
      case "video":
        cssWeb += `  width: ${props.width || '320px'};
  height: ${props.height || '180px'};
  object-fit: cover;
  border-radius: ${props.borderRadius || '0'}px;
  background-color: ${props.backgroundColor || 'transparent'};
  overflow: hidden;
`;
        break;
      default:
        cssWeb += "  /* Element not recognized */\n";
        break;
    }
    cssWeb += `}\n\n`;

    // Génère le JSX pour chaque type
    let elementWeb = "";
    switch (type) {
      case "H1":
        elementWeb = `<h1 className="${className}">${content || "Header 1"}</h1>`;
        break;
      case "H2":
        elementWeb = `<h2 className="${className}">${content || "Header 2"}</h2>`;
        break;
      case "H3":
        elementWeb = `<h3 className="${className}">${content || "Header 3"}</h3>`;
        break;
      case "H4":
        elementWeb = `<h4 className="${className}">${content || "Header 4"}</h4>`;
        break;
      case "H5":
        elementWeb = `<h5 className="${className}">${content || "Header 5"}</h5>`;
        break;
      case "text":
        elementWeb = `<textarea className="${className}" placeholder="Enter text..." readOnly>${props.content || ""}</textarea>`;
        break;
      case "textfield":
        elementWeb = `<input type="text" className="${className}" placeholder="${props.placeholder || 'Enter text...'}" value="${props.content || ""}" readOnly />`;
        break;
      case "submit-button":
        elementWeb = `<button className="${className}" type="button">${props.content || "Submit"}</button>`;
        break;
      case "checkbox":
        elementWeb = `<label className="${className}"><input type="checkbox" ${props.checked ? 'checked' : ''} disabled /><span>${props.content || "Check me"}</span></label>`;
        break;
      case "radio-button":
      case "radio-button2":
        elementWeb = `<label className="${className}"><input type="radio" name="${props.name || 'radioGroup'}" ${props.checked ? 'checked' : ''} disabled /><span>${props.label || "Radio Option"}</span></label>`;
        break;
      case "toggle-button":
        const toggleBg = props.checked ? '#4f46e5' : '#d1d5db';
        elementWeb = `<label className="${className}"><span>${content || props.label || ""}</span><div style="width: 48px; height: 24px; background-color: ${toggleBg}; border-radius: 12px; position: relative; display: inline-block;"><div style="position: absolute; width: 24px; height: 24px; background-color: white; border-radius: 50%; transform: translateX(${props.checked ? '24px' : '0px'}); transition: transform 0.2s;"></div></div></label>`;
        break;
      case "dropdown":
        const options = props.options || ["Option 1", "Option 2"];
        elementWeb = `<select className="${className}" disabled>${options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}</select>`;
        break;
      case "search":
        elementWeb = `<div className="${className}"><input type="search" placeholder="${props.placeholder || 'Search...'}" value="${props.content || ""}" readOnly style="width: 100%; background: transparent; border: none; outline: none;" /></div>`;
        break;
      case "list":
        const listItems = (content || "Item 1,Item 2,Item 3").split(",");
        elementWeb = `<ul className="${className}">${listItems.map(item => `<li>${item.trim()}</li>`).join("")}</ul>`;
        break;
      case "icon":
        elementWeb = `<span className="${className}">${content || "★"}</span>`;
        break;
      case "container":
        elementWeb = `<div className="${className}">Container content</div>`;
        break;
      case "grid":
        elementWeb = `<div className="${className}">Grid container</div>`;
        break;
      case "navbar":
        const navItems = props.menuItems || [{ label: "Home" }, { label: "About" }, { label: "Contact" }];
        elementWeb = `<nav className="${className}">${navItems.map(item => `<span>${item.label}</span>`).join('')}</nav>`;
        break;
      case "sidebar":
        const sidebarItems = props.menuItems || [{ label: "Dashboard" }, { label: "Settings" }, { label: "Logout" }];
        elementWeb = `<aside className="${className}">${sidebarItems.map(item => `<div>${item.label}</div>`).join('')}</aside>`;
        break;
      case "footer":
        elementWeb = `<footer className="${className}">${props.content || "Footer content here"}</footer>`;
        break;
      case "tabs":
        const tabItems = props.tabItems || [{ label: "Tab 1" }, { label: "Tab 2" }, { label: "Tab 3" }];
        elementWeb = `<div className="${className}"><div style="display: flex; gap: 16px; border-bottom: 1px solid #d1d5db; margin-bottom: 8px;">${tabItems.map(tab => `<div style="padding: 4px 10px; cursor: pointer;">${tab.label}</div>`).join('')}</div></div>`;
        break;
      case "divider":
        elementWeb = `<hr className="${className}" />`;
        break;
      case "image":
        const imgSrc = (item.images && item.images[item.selectedImageIndex]?.src) || item.images?.[0]?.src || props.src || "https://via.placeholder.com/150";
        elementWeb = `<img src="${imgSrc}" alt="Canvas" className="${className}" />`;
        break;
      case "video":
        const videoSrc = item.src || "https://www.w3schools.com/html/mov_bbb.mp4";
        elementWeb = `<video controls className="${className}"><source src="${videoSrc}" type="video/mp4" />Your browser does not support the video tag.</video>`;
        break;
      default:
        elementWeb = `<!-- Unknown element: ${type} -->`;
        break;
    }

    jsxWeb += elementWeb + "\n";
  });

  // Génère le code React complet
  const fullReactWebCode = `
import React from "react";
import "./styles.css";

export default function Canvas() {
  return (
    <div className="canvas-root">
${jsxWeb
  .trim()
  .split("\n")
  .map((line) => "      " + line)
  .join("\n")}
    </div>
  );
}
`.trim();

  // Génère le HTML complet
  const fullHtmlCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Generated Page</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      position: relative;
      min-height: 100vh;
      font-family: Arial, sans-serif;
      background: #f3f4f6;
    }
${cssWeb.trim()}
  </style>
</head>
<body>
  <div class="canvas-root">
${jsxWeb.trim()}
  </div>
</body>
</html>
`.trim();

  return {
    jsxWeb: fullReactWebCode,
    cssWeb: cssWeb.trim(),
    html: fullHtmlCode,
  };
};