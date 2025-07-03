export const generateReactCode = (items) => {
  let jsxWeb = "";
  let cssWeb = "";

  let jsxNative = "";
  let stylesNative = {};

  items.forEach((item, index) => {
    const { type, x = 0, y = 0, content = "", props = {} } = item;

    const className = `comp-${index}`;
    const styleWeb = `position: absolute; left: ${x}px; top: ${y}px;`;
    cssWeb += `.${className} {\n  ${styleWeb}\n`;

    const styleNative = {
      position: "absolute",
      left: x,
      top: y,
    };

    let elementWeb = "";
    let elementNative = "";

    switch (type) {
      // Typography Elements
      case "H1":
        cssWeb += `  font-size: ${props.fontSize || '3.5rem'};\n  font-weight: bold;\n  color: ${props.textColor || 'inherit'};\n  background-color: ${props.backgroundColor || 'transparent'};\n`;
        Object.assign(styleNative, {
          fontSize: parseInt(props.fontSize) || 56,
          fontWeight: "bold",
          color: props.textColor || "#000",
          backgroundColor: props.backgroundColor || "transparent",
        });
        elementWeb = `<h1 className="${className}">${content || "Header 1"}</h1>`;
        elementNative = `<Text style={styles.${className}}>${content || "Header 1"}</Text>`;
        break;

      case "H2":
        cssWeb += `  font-size: ${props.fontSize || '3.0rem'};\n  font-weight: bold;\n  color: ${props.textColor || 'inherit'};\n  background-color: ${props.backgroundColor || 'transparent'};\n`;
        Object.assign(styleNative, {
          fontSize: parseInt(props.fontSize) || 48,
          fontWeight: "bold",
          color: props.textColor || "#000",
          backgroundColor: props.backgroundColor || "transparent",
        });
        elementWeb = `<h2 className="${className}">${content || "Header 2"}</h2>`;
        elementNative = `<Text style={styles.${className}}>${content || "Header 2"}</Text>`;
        break;

      case "H3":
        cssWeb += `  font-size: ${props.fontSize || '2.5rem'};\n  font-weight: bold;\n  color: ${props.textColor || 'inherit'};\n  background-color: ${props.backgroundColor || 'transparent'};\n`;
        Object.assign(styleNative, {
          fontSize: parseInt(props.fontSize) || 40,
          fontWeight: "bold",
          color: props.textColor || "#000",
          backgroundColor: props.backgroundColor || "transparent",
        });
        elementWeb = `<h3 className="${className}">${content || "Header 3"}</h3>`;
        elementNative = `<Text style={styles.${className}}>${content || "Header 3"}</Text>`;
        break;

      case "H4":
        cssWeb += `  font-size: ${props.fontSize || '2.0rem'};\n  font-weight: bold;\n  color: ${props.textColor || 'inherit'};\n  background-color: ${props.backgroundColor || 'transparent'};\n`;
        Object.assign(styleNative, {
          fontSize: parseInt(props.fontSize) || 32,
          fontWeight: "bold",
          color: props.textColor || "#000",
          backgroundColor: props.backgroundColor || "transparent",
        });
        elementWeb = `<h4 className="${className}">${content || "Header 4"}</h4>`;
        elementNative = `<Text style={styles.${className}}>${content || "Header 4"}</Text>`;
        break;

      case "H5":
        cssWeb += `  font-size: ${props.fontSize || '1.5rem'};\n  font-weight: bold;\n  color: ${props.textColor || 'inherit'};\n  background-color: ${props.backgroundColor || 'transparent'};\n`;
        Object.assign(styleNative, {
          fontSize: parseInt(props.fontSize) || 24,
          fontWeight: "bold",
          color: props.textColor || "#000",
          backgroundColor: props.backgroundColor || "transparent",
        });
        elementWeb = `<h5 className="${className}">${content || "Header 5"}</h5>`;
        elementNative = `<Text style={styles.${className}}>${content || "Header 5"}</Text>`;
        break;

      // Form Elements
      case "text":
        cssWeb += `  font-size: ${props.fontSize || '16px'};\n  color: ${props.textColor || '#4a4a4a'};\n  background-color: ${props.backgroundColor || 'white'};\n  font-weight: ${props.bold ? 'bold' : 'normal'};\n  font-style: ${props.italic ? 'italic' : 'normal'};\n  text-decoration: ${props.underline ? 'underline' : 'none'};\n  text-align: ${props.textAlign || 'left'};\n  padding: ${props.padding || '8px'};\n  font-family: ${props.fontFamily || 'Arial, sans-serif'};\n`;
        Object.assign(styleNative, {
          fontSize: parseInt(props.fontSize) || 16,
          color: props.textColor || "#4a4a4a",
          backgroundColor: props.backgroundColor || "white",
          fontWeight: props.bold ? "bold" : "normal",
          fontStyle: props.italic ? "italic" : "normal",
          textAlign: props.textAlign || "left",
          padding: parseInt(props.padding) || 8,
          fontFamily: props.fontFamily || "Arial",
        });
        elementWeb = `<textarea className="${className}" placeholder="Enter text...">${props.content || ""}</textarea>`;
        elementNative = `<TextInput style={styles.${className}} multiline placeholder="Enter text..." value="${props.content || ""}" />`;
        break;

      case "textfield":
        cssWeb += `  border: 1px solid #6b7280;\n  padding: ${props.padding || '8px'};\n  background-color: ${props.backgroundColor || 'white'};\n  color: ${props.textColor || 'black'};\n  font-size: ${props.fontSize || '16px'};\n  text-align: ${props.textAlign || 'left'};\n  border-radius: ${props.borderRadius || '10px'};\n`;
        Object.assign(styleNative, {
          borderWidth: 1,
          borderColor: "#6b7280",
          padding: parseInt(props.padding) || 8,
          backgroundColor: props.backgroundColor || "white",
          color: props.textColor || "black",
          fontSize: parseInt(props.fontSize) || 16,
          textAlign: props.textAlign || "left",
          borderRadius: parseInt(props.borderRadius) || 10,
        });
        elementWeb = `<input type="text" className="${className}" placeholder="${props.placeholder || 'Enter text...'}" value="${props.content || ""}" />`;
        elementNative = `<TextInput style={styles.${className}} placeholder="${props.placeholder || 'Enter text...'}" value="${props.content || ""}" />`;
        break;

      case "submit-button":
        cssWeb += `  background-color: ${props.backgroundColor || '#4f46e5'};\n  color: ${props.textColor || '#ffffff'};\n  padding: 8px 16px;\n  border-radius: ${props.borderRadius || '0'}px;\n  border: none;\n  font-size: ${props.fontSize || '16px'};\n  cursor: pointer;\n`;
        Object.assign(styleNative, {
          backgroundColor: props.backgroundColor || "#4f46e5",
          padding: 8,
          borderRadius: parseInt(props.borderRadius) || 0,
        });
        elementWeb = `<button className="${className}">${props.content || "Submit"}</button>`;
        elementNative = `<TouchableOpacity style={styles.${className}}><Text style={{ color: '${props.textColor || '#ffffff'}', fontSize: ${parseInt(props.fontSize) || 16} }}>${props.content || "Submit"}</Text></TouchableOpacity>`;
        break;

      case "checkbox":
        cssWeb += `  display: flex;\n  gap: 8px;\n  align-items: center;\n  background-color: ${props.backgroundColor || 'transparent'};\n  color: ${props.textColor || 'black'};\n  font-size: ${props.fontSize || '16px'};\n  padding: 4px;\n`;
        Object.assign(styleNative, {
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          backgroundColor: props.backgroundColor || "transparent",
          padding: 4,
        });
        elementWeb = `<label className="${className}"><input type="checkbox" ${props.checked ? 'checked' : ''} /><span>${props.content || "Check me"}</span></label>`;
        elementNative = `<View style={styles.${className}}><Text>${props.checked ? '☑️' : '⬜'}</Text><Text style={{ color: '${props.textColor || 'black'}', fontSize: ${parseInt(props.fontSize) || 16} }}>${props.content || "Check me"}</Text></View>`;
        break;

      case "radio-button":
      case "radio-button2":
        cssWeb += `  display: flex;\n  gap: 8px;\n  align-items: center;\n  background-color: ${props.backgroundColor || 'transparent'};\n  color: ${props.textColor || '#000000'};\n  font-size: ${props.fontSize || '14px'};\n  font-weight: ${props.bold ? 'bold' : 'normal'};\n  font-style: ${props.italic ? 'italic' : 'normal'};\n  text-decoration: ${props.underline ? 'underline' : 'none'};\n`;
        Object.assign(styleNative, {
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          backgroundColor: props.backgroundColor || "transparent",
        });
        elementWeb = `<label className="${className}"><input type="radio" name="${props.name || 'radioGroup'}" ${props.checked ? 'checked' : ''} /><span>${props.label || "Radio Option"}</span></label>`;
        elementNative = `<View style={styles.${className}}><Text>${props.checked ? '🔘' : '⚪'}</Text><Text style={{ color: '${props.textColor || '#000000'}', fontSize: ${parseInt(props.fontSize) || 14} }}>${props.label || "Radio Option"}</Text></View>`;
        break;

      case "toggle-button":
        cssWeb += `  display: flex;\n  align-items: center;\n  gap: 12px;\n  color: ${props.textColor || '#000000'};\n  font-size: ${props.fontSize || '16px'};\n  font-weight: ${props.bold ? 'bold' : 'normal'};\n  font-style: ${props.italic ? 'italic' : 'normal'};\n  text-decoration: ${props.underline ? 'underline' : 'none'};\n`;
        Object.assign(styleNative, {
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        });
        const toggleBg = props.checked ? '#4f46e5' : '#d1d5db';
        elementWeb = `<label className="${className}"><span>${content || props.label || ""}</span><div style="width: 48px; height: 24px; background-color: ${toggleBg}; border-radius: 12px; position: relative;"><div style="position: absolute; width: 24px; height: 24px; background-color: white; border-radius: 50%; transform: translateX(${props.checked ? '24px' : '0px'}); transition: transform 0.2s;"></div></div></label>`;
        elementNative = `<View style={styles.${className}}><Text style={{ color: '${props.textColor || '#000000'}', fontSize: ${parseInt(props.fontSize) || 16} }}>${content || props.label || ""}</Text><View style={{ width: 48, height: 24, backgroundColor: '${toggleBg}', borderRadius: 12 }}></View></View>`;
        break;

      case "dropdown":
        cssWeb += `  background-color: ${props.backgroundColor || '#e5e7eb'};\n  color: ${props.textColor || 'black'};\n  font-size: ${props.fontSize || '16px'};\n  border: 1px solid #ccc;\n  padding: 8px;\n`;
        Object.assign(styleNative, {
          backgroundColor: props.backgroundColor || "#e5e7eb",
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 8,
        });
        const options = props.options || ["Option 1", "Option 2"];
        elementWeb = `<select className="${className}">${options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}</select>`;
        elementNative = `<View style={styles.${className}}><Text style={{ color: '${props.textColor || 'black'}', fontSize: ${parseInt(props.fontSize) || 16} }}>Dropdown</Text></View>`;
        break;

      case "search":
        cssWeb += `  position: relative;\n  background-color: ${props.backgroundColor || '#e5e7eb'};\n  color: ${props.textColor || '#000000'};\n  font-size: ${props.fontSize || '14px'};\n  border-radius: ${props.borderRadius || '10px'};\n  border: 1px solid #6b7280;\n  padding-left: 24px;\n`;
        Object.assign(styleNative, {
          backgroundColor: props.backgroundColor || "#e5e7eb",
          borderWidth: 1,
          borderColor: "#6b7280",
          borderRadius: parseInt(props.borderRadius) || 10,
          paddingLeft: 24,
        });
        elementWeb = `<div className="${className}"><input type="search" placeholder="${props.placeholder || 'Search...'}" style="width: 100%; background: transparent; border: none; outline: none;" /></div>`;
        elementNative = `<TextInput style={styles.${className}} placeholder="${props.placeholder || 'Search...'}" />`;
        break;

      case "list":
        cssWeb += `  list-style-type: disc;\n  padding: 8px;\n  background-color: ${props.backgroundColor || 'transparent'};\n  color: ${props.textColor || '#000000'};\n  font-size: ${props.fontSize || '16px'};\n  font-weight: ${props.bold ? 'bold' : 'normal'};\n  font-style: ${props.italic ? 'italic' : 'normal'};\n  text-decoration: ${props.underline ? 'underline' : 'none'};\n  font-family: ${props.fontFamily || 'inherit'};\n`;
        Object.assign(styleNative, {
          padding: 8,
          backgroundColor: props.backgroundColor || "transparent",
        });
        const listItems = (content || "Item 1,Item 2,Item 3").split(",");
        elementWeb = `<ul className="${className}">${listItems.map(item => `<li>${item.trim()}</li>`).join("")}</ul>`;
        elementNative = `<View style={styles.${className}}>${listItems.map(item => `<Text style={{ color: '${props.textColor || '#000000'}', fontSize: ${parseInt(props.fontSize) || 16} }}>• ${item.trim()}</Text>`).join("")}</View>`;
        break;

      case "icon":
        cssWeb += `  font-size: ${props.fontSize || '24px'};\n  color: ${props.textColor || '#000'};\n`;
        Object.assign(styleNative, {
          fontSize: parseInt(props.fontSize) || 24,
          color: props.textColor || "#000",
        });
        elementWeb = `<i className="${className}">${content || "★"}</i>`;
        elementNative = `<Text style={styles.${className}}>${content || "★"}</Text>`;
        break;

      // Layout Elements
      case "container":
        cssWeb += `  display: flex;\n  flex-direction: column;\n  padding: 16px;\n  background-color: ${props.backgroundColor || 'transparent'};\n  color: ${props.textColor || '#000000'};\n  border: 1px dashed #9ca3af;\n  border-radius: ${props.borderRadius || '0'}px;\n`;
        Object.assign(styleNative, {
          flexDirection: "column",
          padding: 16,
          backgroundColor: props.backgroundColor || "transparent",
          borderWidth: 1,
          borderColor: "#9ca3af",
          borderRadius: parseInt(props.borderRadius) || 0,
        });
        elementWeb = `<div className="${className}">Container content</div>`;
        elementNative = `<View style={styles.${className}}><Text style={{ color: '${props.textColor || '#000000'}' }}>Container content</Text></View>`;
        break;

      case "grid":
        const gridType = props.gridType || "2-cols";
        const columnsMap = { "2-cols": 2, "3-cols": 3, "4-cols": 4, "5-cols": 5, "6-cols": 6 };
        const cols = props.cols_lg || props.cols_md || props.cols_sm || props.cols_xl || columnsMap[gridType] || 2;
        cssWeb += `  display: grid;\n  grid-template-columns: repeat(${cols}, minmax(0, 1fr));\n  gap: 16px;\n  padding: 16px;\n  background-color: ${props.backgroundColor || 'transparent'};\n`;
        Object.assign(styleNative, {
          flexDirection: "row",
          flexWrap: "wrap",
          padding: 16,
          backgroundColor: props.backgroundColor || "transparent",
        });
        elementWeb = `<div className="${className}">Grid container</div>`;
        elementNative = `<View style={styles.${className}}><Text>Grid container</Text></View>`;
        break;

      case "navbar":
        cssWeb += `  display: flex;\n  flex-direction: row;\n  gap: 12px;\n  justify-content: ${props.justifyContent || 'space-between'};\n  align-items: center;\n  background-color: ${props.backgroundColor || '#f9fafb'};\n  color: ${props.textColor || '#111827'};\n  padding: 8px 12px;\n  font-size: ${props.fontSize || '16px'};\n  border-radius: ${props.borderRadius || '0'}px;\n`;
        Object.assign(styleNative, {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: props.backgroundColor || "#f9fafb",
          padding: 8,
        });
        const navItems = props.menuItems || [{ label: "Home" }, { label: "About" }, { label: "Contact" }];
        elementWeb = `<nav className="${className}">${navItems.map(item => `<span>${item.label}</span>`).join('')}</nav>`;
        elementNative = `<View style={styles.${className}}>${navItems.map(item => `<Text style={{ color: '${props.textColor || '#111827'}', fontSize: ${parseInt(props.fontSize) || 16} }}>${item.label}</Text>`).join('')}</View>`;
        break;

      case "sidebar":
        cssWeb += `  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  background-color: ${props.backgroundColor || '#f9fafb'};\n  color: ${props.textColor || '#111827'};\n  padding: 16px;\n  border-right: 2px solid #ccc;\n  font-size: ${props.fontSize || 'auto'};\n`;
        Object.assign(styleNative, {
          flexDirection: "column",
          gap: 12,
          backgroundColor: props.backgroundColor || "#f9fafb",
          padding: 16,
          borderRightWidth: 2,
          borderRightColor: "#ccc",
        });
        const sidebarItems = props.menuItems || [{ label: "Dashboard" }, { label: "Settings" }, { label: "Logout" }];
        elementWeb = `<aside className="${className}">${sidebarItems.map(item => `<div>${item.label}</div>`).join('')}</aside>`;
        elementNative = `<View style={styles.${className}}>${sidebarItems.map(item => `<Text style={{ color: '${props.textColor || '#111827'}' }}>${item.label}</Text>`).join('')}</View>`;
        break;

      case "footer":
        cssWeb += `  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: ${props.backgroundColor || '#f3f4f6'};\n  color: ${props.textColor || '#111827'};\n  font-size: ${props.fontSize || '16px'};\n  padding: 12px;\n  border-radius: ${props.borderRadius || '0'}px;\n`;
        Object.assign(styleNative, {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: props.backgroundColor || "#f3f4f6",
          padding: 12,
        });
        elementWeb = `<footer className="${className}">${props.content || "Footer content here"}</footer>`;
        elementNative = `<View style={styles.${className}}><Text style={{ color: '${props.textColor || '#111827'}', fontSize: ${parseInt(props.fontSize) || 16} }}>${props.content || "Footer content here"}</Text></View>`;
        break;

      case "tabs":
        cssWeb += `  display: flex;\n  flex-direction: column;\n  background-color: ${props.backgroundColor || '#ffffff'};\n  color: ${props.textColor || '#111827'};\n  font-size: ${props.fontSize || 'auto'};\n  padding: 10px;\n`;
        Object.assign(styleNative, {
          flexDirection: "column",
          backgroundColor: props.backgroundColor || "#ffffff",
          padding: 10,
        });
        const tabItems = props.tabItems || [{ label: "Tab 1" }, { label: "Tab 2" }, { label: "Tab 3" }];
        elementWeb = `<div className="${className}"><div style="display: flex; gap: 16px; border-bottom: 1px solid #d1d5db; margin-bottom: 8px;">${tabItems.map(tab => `<div style="padding: 4px 10px; cursor: pointer;">${tab.label}</div>`).join('')}</div></div>`;
        elementNative = `<View style={styles.${className}}><View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#d1d5db' }}>${tabItems.map(tab => `<Text style={{ color: '${props.textColor || '#111827'}', padding: 4 }}>${tab.label}</Text>`).join('')}</View></View>`;
        break;

      case "divider":
        cssWeb += `  border: none;\n  border-top: ${props.thickness || 4}px solid ${props.color || '#4f46e5'};\n  border-radius: ${(props.thickness || 4) / 2}px;\n  width: ${props.width || '100%'};\n  margin: ${props.margin || 32}px 0;\n`;
        Object.assign(styleNative, {
          height: parseInt(props.thickness) || 4,
          backgroundColor: props.color || "#4f46e5",
          borderRadius: (parseInt(props.thickness) || 4) / 2,
          marginVertical: parseInt(props.margin) || 32,
        });
        elementWeb = `<hr className="${className}" />`;
        elementNative = `<View style={styles.${className}} />`;
        break;

      // Media Elements
      case "image":
        cssWeb += `  width: ${props.width || '100px'};\n  height: ${props.height || '100px'};\n  object-fit: ${props.objectFit || 'contain'};\n  border-radius: ${props.borderRadius || '0'}px;\n  background-color: ${props.backgroundColor || 'transparent'};\n`;
        Object.assign(styleNative, {
          width: parseInt(props.width) || 100,
          height: parseInt(props.height) || 100,
          resizeMode: props.objectFit || "contain",
          borderRadius: parseInt(props.borderRadius) || 0,
          backgroundColor: props.backgroundColor || "transparent",
        });
        const imgSrc = (item.images && item.images[item.selectedImageIndex]?.src) || item.images?.[0]?.src || "https://via.placeholder.com/150";
        elementWeb = `<img src="${imgSrc}" alt="Canvas" className="${className}" />`;
        elementNative = `<Image source={{ uri: "${imgSrc}" }} style={styles.${className}} />`;
        break;

      case "video":
        cssWeb += `  width: ${props.width || '320px'};\n  height: ${props.height || '180px'};\n  object-fit: cover;\n  border-radius: ${props.borderRadius || '0'}px;\n  background-color: ${props.backgroundColor || 'transparent'};\n`;
        Object.assign(styleNative, {
          width: parseInt(props.width) || 320,
          height: parseInt(props.height) || 180,
          resizeMode: "cover",
          borderRadius: parseInt(props.borderRadius) || 0,
          backgroundColor: props.backgroundColor || "transparent",
        });
        const videoSrc = item.src || "https://www.w3schools.com/html/mov_bbb.mp4";
        elementWeb = `<video controls className="${className}"><source src="${videoSrc}" type="video/mp4" />Your browser does not support the video tag.</video>`;
        elementNative = `<Video source={{ uri: "${videoSrc}" }} style={styles.${className}} useNativeControls resizeMode="cover"/>`;
        break;

      default:
        // Élément non reconnu
        cssWeb += "  /* Element not recognized */\n";
        elementWeb = `<!-- Unknown element: ${type} -->`;
        elementNative = `{/* Unknown element: ${type} */}`;
        break;
    }

    cssWeb += `}\n\n`;
    jsxWeb += elementWeb + "\n";
    stylesNative[className] = styleNative;
    jsxNative += elementNative + "\n";
  });

  const fullReactWebCode = `
import React from "react";
import "./styles.css";

export default function Canvas() {
  return (
    <div className="canvas">
${jsxWeb
  .trim()
  .split("\n")
  .map((line) => "    " + line)
  .join("\n")}
    </div>
  );
}
`.trim();

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
    }

${cssWeb.trim()}
  </style>
</head>
<body>
${jsxWeb.trim()}
</body>
</html>
`.trim();

  const fullReactNativeCode = `
import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function Canvas() {
  return (
    <View style={{ flex: 1 }}>
${jsxNative
  .trim()
  .split("\n")
  .map((line) => "    " + line)
  .join("\n")}
    </View>
  );
}

const styles = StyleSheet.create(${JSON.stringify(stylesNative, null, 2)});
`.trim();

  return {
    jsxWeb: fullReactWebCode,
    cssWeb: cssWeb.trim(),
    html: fullHtmlCode,
    jsxNative: fullReactNativeCode,
    stylesNative,
  };
};