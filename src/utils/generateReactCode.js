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
      case "heading":
      case "H1":
        cssWeb += "  font-size: 32px;\n  font-weight: bold;\n";
        styleNative.fontSize = 32;
        styleNative.fontWeight = "bold";
        elementWeb = `<h1 className="${className}">${content || "Heading 1"}</h1>`;
        elementNative = `<Text style={styles.${className}}>${content || "Heading 1"}</Text>`;
        break;

      case "H2":
        cssWeb += "  font-size: 24px;\n  font-weight: bold;\n";
        styleNative.fontSize = 24;
        styleNative.fontWeight = "bold";
        elementWeb = `<h2 className="${className}">${content || "Heading 2"}</h2>`;
        elementNative = `<Text style={styles.${className}}>${content || "Heading 2"}</Text>`;
        break;

      case "H3":
        cssWeb += "  font-size: 20px;\n  font-weight: bold;\n";
        styleNative.fontSize = 20;
        styleNative.fontWeight = "bold";
        elementWeb = `<h3 className="${className}">${content || "Heading 3"}</h3>`;
        elementNative = `<Text style={styles.${className}}>${content || "Heading 3"}</Text>`;
        break;

      case "H4":
        cssWeb += "  font-size: 18px;\n  font-weight: bold;\n";
        styleNative.fontSize = 18;
        styleNative.fontWeight = "bold";
        elementWeb = `<h4 className="${className}">${content || "Heading 4"}</h4>`;
        elementNative = `<Text style={styles.${className}}>${content || "Heading 4"}</Text>`;
        break;

      case "H5":
        cssWeb += "  font-size: 16px;\n  font-weight: bold;\n";
        styleNative.fontSize = 16;
        styleNative.fontWeight = "bold";
        elementWeb = `<h5 className="${className}">${content || "Heading 5"}</h5>`;
        elementNative = `<Text style={styles.${className}}>${content || "Heading 5"}</Text>`;
        break;

      case "paragraph":
      case "text":
        cssWeb += "  font-size: 16px;\n  color: #4a4a4a;\n";
        styleNative.fontSize = 16;
        styleNative.color = "#4a4a4a";
        elementWeb = `<p className="${className}">${content || "Lorem ipsum..."}</p>`;
        elementNative = `<Text style={styles.${className}}>${content || "Lorem ipsum..."}</Text>`;
        break;

      case "Link":
        cssWeb += "  color: blue;\n  text-decoration: underline;\n";
        styleNative.color = "blue";
        elementWeb = `<a href="#" className="${className}">${content || "Link text"}</a>`;
        elementNative = `<Text style={styles.${className}}>${content || "Link text"}</Text>`;
        break;

      case "list":
        cssWeb += "  list-style-type: disc;\n  padding-left: 20px;\n";
        styleNative.marginLeft = 20;
        elementWeb = `<ul className="${className}">${(
          content || "Item 1,Item 2,Item 3"
        )
          .split(",")
          .map((item) => `<li>${item.trim()}</li>`)
          .join("")}</ul>`;
        elementNative = `<View style={styles.${className}}>${(
          content || "Item 1,Item 2,Item 3"
        )
          .split(",")
          .map((item) => `<Text>• ${item.trim()}</Text>`)
          .join("")}</View>`;
        break;

      case "icon":
        cssWeb += "  font-size: 24px;\n  color: #000;\n";
        styleNative.fontSize = 24;
        styleNative.color = "#000";
        elementWeb = `<i className="${className}">${content || "★"}</i>`;
        elementNative = `<Text style={styles.${className}}>${content || "★"}</Text>`;
        break;

      case "radio-button":
      case "radio-button2":
        cssWeb += "  display: flex;\n  gap: 8px;\n  align-items: center;\n";
        Object.assign(styleNative, {
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        });
        elementWeb = `<label className="${className}"><input type="radio" name="radioGroup" /><span>${content || "Radio option"}</span></label>`;
        elementNative = `<View style={styles.${className}}><Text>⚪</Text><Text>${content || "Radio option"}</Text></View>`;
        break;

      case "toggle-button":
        cssWeb +=
          "  display: inline-block;\n  background-color: #ccc;\n  width: 40px;\n  height: 20px;\n  border-radius: 10px;\n";
        Object.assign(styleNative, {
          width: 40,
          height: 20,
          borderRadius: 10,
          backgroundColor: "#ccc",
        });
        elementWeb = `<div className="${className}"></div>`;
        elementNative = `<View style={styles.${className}} />`;
        break;

      case "tabs":
        cssWeb +=
          "  display: flex;\n  gap: 12px;\n  border-bottom: 2px solid #ddd;\n";
        Object.assign(styleNative, {
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: "#ddd",
        });
        elementWeb = `<div className="${className}"><div>Tab 1</div><div>Tab 2</div></div>`;
        elementNative = `<View style={styles.${className}}><Text>Tab 1</Text><Text>Tab 2</Text></View>`;
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
