import * as FiIcons from "react-icons/fi";
import { HiChevronDown, HiItalic, HiBold, HiUnderline } from "react-icons/hi2";

const SidebarProperties = ({ item, onUpdate }) => {
  if (!item)
    return (
      <div className="p-20 bg-white border-gray-600 dark:bg-gray-900 text-gray-500 dark:text-white">
        No element selected
      </div>
    );

  const updateProp = (key, value) => {
    onUpdate(item.id, { [key]: value });
  };

  const availableIcons = Object.keys(FiIcons);

  const gridOptions = [
    { id: "2-cols", label: "2 Columns", columns: 2 },
    { id: "3-cols", label: "3 Columns", columns: 3 },
    { id: "4-cols", label: "4 Columns", columns: 4 },
    { id: "5-cols", label: "5 Columns", columns: 5 },
    { id: "6-cols", label: "6 Columns", columns: 6 },
  ];

  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const gridRows = chunkArray(gridOptions, 2);

  return (
    <div className="p-4 space-y-6 w-[350px] border-l bg-gray-50 dark:bg-gray-900 dark:border-gray-700 h-full overflow-y-auto">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Properties</h2>

      {/* ICON */}
      {item.type === "icon" && (
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Choose Icon</h3>
          <div className="grid grid-cols-5 gap-2">
            {availableIcons.map((iconName) => {
              const Icon = FiIcons[iconName];
              return (
                <div
                  key={iconName}
                  onClick={() => updateProp("iconName", iconName)}
                  className={`p-2 rounded cursor-pointer flex justify-center items-center transition ${
                    item.iconName === iconName
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-indigo-900 dark:text-indigo-300"
                  }`}
                >
                  <Icon size={22} strokeWidth={1} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* GRID */}
      {item.type === "grid" && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">Select Grid Layout</h3>
          {gridRows.map((row, i) => (
            <div key={i} className="flex space-x-4">
              {row.map(({ id, label, columns }) => (
                <button
                  key={id}
                  onClick={() => updateProp("gridType", id)}
                  className={`flex-1 flex flex-col items-center p-4 rounded border cursor-pointer ${
                    item.gridType === id
                      ? "bg-indigo-200 dark:bg-indigo-600 text-indigo-900 dark:text-white"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300"
                  }`}
                >
                  <div
                    className="grid gap-1 w-full"
                    style={{
                      gridTemplateColumns: `repeat(${columns}, 1fr)`,
                      height: 40,
                    }}
                  >
                    {[...Array(columns)].map((_, i) => (
                      <div key={i} className="bg-indigo-400 rounded h-full" />
                    ))}
                  </div>
                  <span className="text-xs mt-1">{label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* TEXT */}
      {item.type === "text" && (
        <div className="space-y-4">
          {/* Font Family */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-100">Font Family</label>
            <select
              value={item.fontFamily || "sans-serif"}
              onChange={(e) => updateProp("fontFamily", e.target.value)}
              className="w-full p-2 border dark:text-white rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            >
              {[
                "Arial",
                "Verdana",
                "Tahoma",
                "Trebuchet MS",
                "Gill Sans",
                "Segoe UI",
                "Georgia",
                "Garamond",
                "Courier New",
                "Lucida Console",
                "Comic Sans MS",
                "Pacifico",
                "Impact",
                "Lobster",
                "monospace",
                "serif",
                "sans-serif",
              ].map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-100">Font Size</label>
            <input
              type="text"
              value={item.fontSize || ""}
              onChange={(e) => updateProp("fontSize", e.target.value)}
              placeholder="e.g. 16px or 1.2rem"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Text Content */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-100">Text Content</label>
            <textarea
              value={item.content || ""}
              onChange={(e) => updateProp("content", e.target.value)}
              rows={2}
              className="w-full p-2 border rounded dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Text Color */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-white">Text Color</label>
            <input
              type="color"
              value={item.color || "#000000"}
              onChange={(e) => updateProp("color", e.target.value)}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>

      <div className="flex items-center space-x-2 p-4">
      <button
        type="button"
        title="Bold"
        aria-pressed={item.bold ? "true" : "false"}
        onClick={() => updateProp("bold", !item.bold)}
        className={`p-2 rounded border ${
          item.bold ? "bg-indigo-600 text-white" : "text-gray-800 dark:text-white"
        }`}
      >
        <HiBold size={24} />
      </button>
      <button
        type="button"
        title="Italic"
        aria-pressed={item.italic ? "true" : "false"}
        onClick={() => updateProp("italic", !item.italic)}
        className={`p-2 rounded border ${
          item.italic ? "bg-indigo-600 text-white" : "text-gray-800 dark:text-white"
        }`}
      >
        <HiItalic size={24} />
      </button>
      <button
        type="button"
        title="Underline"
        aria-pressed={item.underline ? "true" : "false"}
        onClick={() => updateProp("underline", !item.underline)}
        className={`p-2 rounded border ${
          item.underline ? "bg-indigo-600 text-white" : "text-gray-800 dark:text-white"
        }`}
      >
        <HiUnderline size={24} />
      </button>
      </div>
         </div>
      )}

      {/* IMAGE */}
      {item.type === "image" && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    updateProp("src", reader.result);
                    updateProp("width", 300);
                    updateProp("height", 200);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            />
          </div>

          {item.src && (
            <img
              src={item.src}
              alt={item.alt || "Preview"}
              className="rounded max-h-40 object-contain border border-gray-300 dark:border-gray-600"
            />
          )}

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Width (px)</label>
            <input
              type="number"
              value={item.width || 300}
              onChange={(e) => updateProp("width", parseInt(e.target.value))}
              className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Height (px)</label>
            <input
              type="number"
              value={item.height || 200}
              onChange={(e) => updateProp("height", parseInt(e.target.value))}
              className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            />
          </div>
        </div>
      )}

      {/* DEFAULT PROPERTIES (ALL OTHER TYPES) */}
      {["icon", "grid", "text", "image"].indexOf(item.type) === -1 && (
        <div className="space-y-4">
          {[
            ["Background Color", "backgroundColor", "#ffffff"],
            ["Text Color", "textColor", "#000000"],
          ].map(([label, key, def]) => (
            <div key={key}>
              <label className="text-sm font-medium text-gray-700 dark:text-white">{label}</label>
              <input
                type="color"
                value={item[key] || def}
                onChange={(e) => updateProp(key, e.target.value)}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
          ))}

          {[
            ["Font Size (px)", "fontSize", 14],
            ["Border Radius", "borderRadius", 0],
            ["Width (px)", "width", 100],
            ["Height (px)", "height", 50],
            ["Position X", "x", 0],
            ["Position Y", "y", 0],
          ].map(([label, key, def]) => (
            <div key={key}>
              <label className="text-sm font-medium text-gray-700 dark:text-white">{label}</label>
              <input
                type="number"
                value={item[key] || def}
                onChange={(e) => updateProp(key, parseInt(e.target.value))}
                className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarProperties;
