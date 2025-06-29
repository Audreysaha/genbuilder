export const generateReactCode = (items) => {
  let jsxWeb = "";
  let cssWeb = "";

  let jsxNative = "";
  let stylesNative = {};

  items.forEach((item, index) => {
    const {
      type,
      x = 0,
      y = 0,
      content = "",
      props = {}
    } = item;

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
      case "heading":
        cssWeb += "  font-size: 24px;\n  font-weight: bold;\n";
        styleNative.fontSize = 24;
        styleNative.fontWeight = "bold";
        elementWeb = `<h1 className="${className}">${content || "Heading"}</h1>`;
        elementNative = `<Text style={styles.${className}}>${content || "Heading"}</Text>`;
        break;

      case "paragraph":
        cssWeb += "  font-size: 16px;\n  color: #4a4a4a;\n";
        styleNative.fontSize = 16;
        styleNative.color = "#4a4a4a";
        elementWeb = `<p className="${className}">${content || "Lorem ipsum dolor sit amet..."}</p>`;
        elementNative = `<Text style={styles.${className}}>${content || "Lorem ipsum dolor sit amet..."}</Text>`;
        break;

      case "image":
        cssWeb += "  width: 100px;\n  height: 100px;\n  object-fit: cover;\n";
        styleNative.width = 100;
        styleNative.height = 100;
        styleNative.resizeMode = "cover";
        elementWeb = `<img src="${props.src || "https://via.placeholder.com/150"}" alt="Canvas" className="${className}" />`;
        elementNative = `<Image source={{ uri: "${props.src || "https://via.placeholder.com/150"}" }} style={styles.${className}} />`;
        break;

      case "textfield":
        cssWeb += "  border: 1px solid #ccc;\n  padding: 4px;\n";
        styleNative.borderWidth = 1;
        styleNative.borderColor = "#ccc";
        styleNative.padding = 4;
        elementWeb = `<input type="text" defaultValue="${content}" className="${className}" />`;
        elementNative = `<TextInput style={styles.${className}} value="${content}" />`;
        break;

      case "submit-button":
        cssWeb += "  background-color: #3b82f6;\n  color: white;\n  padding: 8px 16px;\n  border-radius: 4px;\n  border: none;\n";
        Object.assign(styleNative, {
          backgroundColor: "#3b82f6",
          padding: 8,
          borderRadius: 4,
        });
        elementWeb = `<button className="${className}">${content || "Submit"}</button>`;
        elementNative = `<TouchableOpacity style={styles.${className}}><Text style={{ color: 'white' }}>${content || "Submit"}</Text></TouchableOpacity>`;
        break;

      case "checkbox":
        cssWeb += "  display: flex;\n  gap: 8px;\n  align-items: center;\n";
        Object.assign(styleNative, {
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        });
        elementWeb = `<label className="${className}"><input type="checkbox" /><span>${content || "Check me"}</span></label>`;
        elementNative = `<View style={styles.${className}}><Text>⬜</Text><Text>${content || "Check me"}</Text></View>`;
        break;

      case "dropdown":
        cssWeb += "  padding: 4px;\n  border: 1px solid #ccc;\n";
        styleNative.padding = 4;
        styleNative.borderWidth = 1;
        styleNative.borderColor = "#ccc";
        elementWeb = `<select className="${className}"><option>${content || "Select an option"}</option><option>Option 1</option><option>Option 2</option></select>`;
        elementNative = `<Text style={styles.${className}}>${content || "Select an option"} ▼</Text>`;
        break;

      case "search":
        cssWeb += "  padding: 4px;\n  border: 1px solid #ccc;\n";
        styleNative.padding = 4;
        styleNative.borderWidth = 1;
        styleNative.borderColor = "#ccc";
        elementWeb = `<input type="search" placeholder="${content || "Search..."}" className="${className}" />`;
        elementNative = `<TextInput placeholder="${content || "Search..."}" style={styles.${className}} />`;
        break;

      case "navbar":
        cssWeb += "  display: flex;\n  gap: 16px;\n  background-color: #1f2937;\n  color: white;\n  padding: 8px;\n";
        Object.assign(styleNative, {
          flexDirection: "row",
          backgroundColor: "#1f2937",
          padding: 8,
        });
        elementWeb = `<nav className="${className}"><span>Home</span><span>About</span><span>Contact</span></nav>`;
        elementNative = `<View style={styles.${className}}><Text style={{ color: 'white' }}>Home</Text><Text style={{ color: 'white' }}>About</Text><Text style={{ color: 'white' }}>Contact</Text></View>`;
        break;

      case "card":
        cssWeb += "  background-color: white;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  padding: 16px;\n  border-radius: 8px;\n";
        Object.assign(styleNative, {
          backgroundColor: "white",
          padding: 16,
          borderRadius: 8,
        });
        elementWeb = `<div className="${className}"><h2>Card Title</h2><p>Card content goes here.</p></div>`;
        elementNative = `<View style={styles.${className}}><Text style={{ fontWeight: "bold", fontSize: 18 }}>Card Title</Text><Text>Card content goes here.</Text></View>`;
        break;

      default:
        elementWeb = `<div className="${className}">{/* Unknown component type: ${type} */}</div>`;
        elementNative = `<View style={styles.${className}}><Text>Unknown: ${type}</Text></View>`;
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
${jsxWeb.trim().split("\n").map(line => "    " + line).join("\n")}
    </div>
  );
}
`.trim();

  const fullReactNativeCode = `
import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function Canvas() {
  return (
    <View style={{ flex: 1 }}>
${jsxNative.trim().split("\n").map(line => "    " + line).join("\n")}
    </View>
  );
}

const styles = StyleSheet.create(${JSON.stringify(stylesNative, null, 2)});
`.trim();

  return {
    jsxWeb: fullReactWebCode,
    cssWeb: cssWeb.trim(),
    jsxNative: fullReactNativeCode,
    stylesNative: stylesNative
  };
};
