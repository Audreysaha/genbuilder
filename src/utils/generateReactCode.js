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
      // case "heading":
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

      case "text":
        cssWeb += "  font-size: 16px;\n  color: #4a4a4a;\n";
        styleNative.fontSize = 16;
        styleNative.color = "#4a4a4a";
        elementWeb = `<p className="${className}">${content || "Lorem ipsum..."}</p>`;
        elementNative = `<Text style={styles.${className}}>${content || "Lorem ipsum..."}</Text>`;
        break;

        case "textfield":
        cssWeb += "  border: 1px solid #ccc;\n  padding: 4px;\n";
        styleNative.borderWidth = 1;
        styleNative.borderColor = "#ccc";
        styleNative.padding = 4;
        elementWeb = `<input type="text field" defaultValue="${content}" className="${className}" />`;
        elementNative = `<TextInput style={styles.${className}} value="${content}" />`;
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

        case "image":
        cssWeb += "  width: 100px;\n  height: 100px;\n  object-fit: cover;\n";
        styleNative.width = 100;
        styleNative.height = 100;
        styleNative.resizeMode = "cover";
        elementWeb = `<img src="${props.src || "https://via.placeholder.com/150"}" alt="Canvas" className="${className}" />`;
        elementNative = `<Image source={{ uri: "${props.src || "https://via.placeholder.com/150"}" }} style={styles.${className}} />`;
        break;

        case "video":
        cssWeb += "  width: 320px;\n" +"  height: 180px;\n" + "  object-fit: cover;\n" + "  border-radius: 4px;\n";
        Object.assign(styleNative, {
        width: 320,
        height: 180,
        resizeMode: "cover", // Some RN video libs support this
        borderRadius: 4,
        });
        elementWeb = `<video controls className="${className}">
        <source src="${props.src || "https://www.w3schools.com/html/mov_bbb.mp4"}" type="video/mp4" />
        Your browser does not support the video tag.
        </video>`;
        elementNative = `<Video
        source={{ uri: "${props.src || "https://www.w3schools.com/html/mov_bbb.mp4"}" }}
        style={styles.${className}}
        useNativeControls
        resizeMode="cover"/>`;
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

        case "footer":
        cssWeb +="  display: flex;\n" + "  justify-content: center;\n" + "  align-items: center;\n" + "  background-color: #1f2937;\n" + "  color: white;\n" + "  padding: 12px;\n";
        Object.assign(styleNative, {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1f2937",
        padding: 12,
        });
        elementWeb = `<footer className="${className}">
        <span>© ${new Date().getFullYear()} MyCompany. All rights reserved.</span>
        </footer>`;
        elementNative = `<View style={styles.${className}}>
        <Text style={{ color: 'white' }}>© ${new Date().getFullYear()} MyCompany. All rights reserved.</Text>
        </View>`;
        break;

        case "sidebar":
        cssWeb +=
        "  display: flex;\n" +
        "  flex-direction: column;\n" +
        "  gap: 12px;\n" +
        "  background-color: #1f2937;\n" +
        "  color: white;\n" +
        "  padding: 16px;\n" +
        "  height: 100vh;\n" +
        "  width: 200px;\n";
        Object.assign(styleNative, {
        flexDirection: "column",
        gap: 12,
        backgroundColor: "#1f2937",
        padding: 16,
        height: "100%",
        width: 200,
        });
        elementWeb = `<aside className="${className}">
        <span>Dashboard</span>
        <span>Settings</span>
        <span>Profile</span>
        </aside>`;
        elementNative = `<View style={styles.${className}}>
        <Text style={{ color: 'white' }}>Dashboard</Text>
        <Text style={{ color: 'white' }}>Settings</Text>
        <Text style={{ color: 'white' }}>Profile</Text>
        </View>`;
        break;
        
        case "container":
        cssWeb +=
        "  display: flex;\n" +
        "  flex-direction: column;\n" +
        "  padding: 16px;\n" +
        "  background-color: #f9fafb;\n" +
        "  border: 1px solid #e5e7eb;\n" +
        "  border-radius: 8px;\n";
        Object.assign(styleNative, {
        flexDirection: "column",
        padding: 16,
        backgroundColor: "#f9fafb",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 8,
        });
        elementWeb = `<div className="${className}">
        ${content || "<p>Container content</p>"}
        </div>`;
        elementNative = `<View style={styles.${className}}>
        <Text>Container content</Text>
        </View>`;
        break;



      // ... (le reste de ton switch déjà bien implémenté)
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
    jsxNative: fullReactNativeCode,
    stylesNative: stylesNative,
  };
};
