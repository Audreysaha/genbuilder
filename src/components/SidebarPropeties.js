import React from "react";

const SidebarProperties = ({ item, onUpdate }) => {
  if (!item)
    return (
      <div className="p-14 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-100">
       No element Selected
</div>

    );

  const updateProp = (key, value) => {
    onUpdate(item.id, { [key]: value });
  };

  return (
    <div className="p-4 space-y-4 w-[350px] border-l bg-gray-50 dark:bg-gray-900 dark:border-gray-700 h-full overflow-y-auto">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
        Properties
      </h2>

{/* for text  */}
{item.type === "Text" && (
  <>
    <div>
      <label className="block text-sm font-medium">Font Size (px)</label>
      <input
        type="number"
        className="w-full border rounded px-2 py-1"
        value={item.fontSize || 14}
        onChange={(e) => onUpdate(item.id, { fontSize: parseInt(e.target.value) })}
      />
    </div>

    <div className="flex space-x-4 items-center">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={item.fontWeight === "bold"}
          onChange={(e) =>
            onUpdate(item.id, { fontWeight: e.target.checked ? "bold" : "normal" })
          }
        />
        <span>Bold</span>
      </label>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={item.fontStyle === "underline"}
          onChange={(e) =>
            onUpdate(item.id, { fontStyle: e.target.checked ? "underline" : "normal" })
          }
        />
        <span>Underline</span>
      </label>
    </div>

    <div>
      <label className="block text-sm font-medium">Text Alignment</label>
      <select
        className="w-full border rounded px-2 py-1"
        value={item.textAlign || "left"}
        onChange={(e) => onUpdate(item.id, { textAlign: e.target.value })}
      >
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium">Font Family</label>
      <select
        className="w-full border rounded px-2 py-1"
        value={item.fontFamily || "Arial"}
        onChange={(e) => onUpdate(item.id, { fontFamily: e.target.value })}
      >
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Verdana">Verdana</option>
      </select>
    </div>
  </>
)}


      {/* Content Input */}
      {(item.type === "heading" ||
        item.type === "paragraph" ||
        item.type === "textfield" ||
        item.type === "button" ||
        item.type === "submit-button") && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Content
          </label>
          <input
            type="text"
            className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            value={item.content || ""}
            onChange={(e) => updateProp("content", e.target.value)}
          />
        </div>
      )}

      {/* Image URL Input */}
      {item.type === "image" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Image's URL
          </label>
          <input
            type="text"
            className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            value={item.src || ""}
            onChange={(e) => updateProp("src", e.target.value)}
          />
        </div>
      )}

      {/* Background Color Picker */}
      {item.type !== "image" && (
    <div>
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
    Background Color
  </label>
  <input
    type="color"
    className="w-full h-8 rounded border border-gray-300 dark:border-gray-600 cursor-pointer bg-transparent dark:bg-gray-900"
    value={item.backgroundColor || "#ffffff"}
    onChange={(e) => updateProp("backgroundColor", e.target.value)}
  />
</div>

      )}

      {/* Text Color Picker */}
      {item.type !== "image" && (
     <div>
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
    Text Color
  </label>
  <input
    type="color"
    className="w-full h-8 rounded border border-gray-300 dark:border-gray-700 cursor-pointer bg-transparent dark:bg-gray-900"
    value={item.textColor || "#000000"}
    onChange={(e) => updateProp("textColor", e.target.value)}
  />
</div>

      )}

      {/* Font Size */}
      {item.type !== "image" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Font Size(px)
          </label>
          <input
            type="number"
            className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            value={item.fontSize || 14}
            onChange={(e) => updateProp("fontSize", parseInt(e.target.value))}
          />
        </div>
      )}

      {/* Border Radius */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Border Radius
        </label>
        <input
          type="range"
          min="0"
          max="50"
          value={item.borderRadius || 0}
          onChange={(e) => updateProp("borderRadius", parseInt(e.target.value))}
          className="w-full cursor-pointer"
        />
      </div>

      {/* Width */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Width(px)
        </label>
        <input
          type="number"
          value={item.width || 100}
          onChange={(e) => updateProp("width", parseInt(e.target.value))}
          className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* Height */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Height (px)
        </label>
        <input
          type="number"
          value={item.height || 50}
          onChange={(e) => updateProp("height", parseInt(e.target.value))}
          className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* Position X */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Position X
        </label>
        <input
          type="number"
          value={item.x || 0}
          onChange={(e) => updateProp("x", parseInt(e.target.value))}
          className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* Position Y */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Position Y
        </label>
        <input
          type="number"
          value={item.y || 0}
          onChange={(e) => updateProp("y", parseInt(e.target.value))}
          className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
        />
      </div>
    </div>
  );
};

export default SidebarProperties;
