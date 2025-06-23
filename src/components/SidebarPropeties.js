// import React from "react";
import * as FiIcons from "react-icons/fi";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";
import { VscBold } from "react-icons/vsc";
import { HiChevronDown } from "react-icons/hi";
import { HiItalic,HiBold,HiUnderline } from "react-icons/hi2";

const SidebarProperties = ({ item, onUpdate }) => {
  if (!item)
    return (
      <div className="p-14 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-100">No element Selected</div>
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
const gridRows = chunkArray(gridOptions, 2);
function chunkArray(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }

return (
    <div className="p-4 space-y-4 w-[350px] border-l bg-gray-50 dark:bg-gray-900 dark:border-gray-700 h-full overflow-y-auto">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Properties</h2>

      {/* Icon picker for icon items */}
      {item.type === "icon" && (
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Choose Icon</h3>
          <div className="grid grid-cols-5 gap-2 overflow-y-hidden">
            {availableIcons.map((iconName) => {
              const Icon = FiIcons[iconName];
              return (
                <div
                  key={iconName}
                  onClick={() => updateProp("iconName", iconName)}
                  className={`p-2 rounded cursor-pointer flex justify-center items-center transition
                    ${
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

      {/* Grid type selector only for grid items */}
      {item.type === "grid" && (
        <div className="flex flex-col flex-grow space-y-6">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Select Grid Layout</h3>
          {gridRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex space-x-6">
              {row.map(({ id, label, columns }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => updateProp("gridType", id)}
                  className={`flex flex-col items-center p-5 rounded cursor-pointer border flex-1
                    ${
                      item.gridType === id
                        ? "border-gray-700 bg-indigo-100 dark:bg-indigo-700 text-indigo-900 dark:text-indigo-100"
                        : "border-gray-300 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  title={label}
                >
                  {/* Mini grid preview fills width */}
                  <div
                    className="grid gap-2 w-full"
                    style={{
                      gridTemplateColumns: `repeat(${columns}, 1fr)`,
                      height: 50,
                    }}
                  >
                    {[...Array(columns)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-indigo-400 dark:bg-indigo-400 rounded"
                        style={{ height: "100%" }}
                      />
                    ))}
                  </div>
                  <span className="mt-2 text-sm font-medium">{label}</span>
                </button>
              ))}
              {row.length === 1 && <div className="flex-1" />}
            </div>
          ))}
        </div>
      )}

{item.type === "text" && (
  <div className="space-y-4 mb-4">
  {/* Font Type */}
  <div>
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
    Font Type
  </label>
  <select
    value={item.fontFamily || "sans-serif"}
    onChange={(e) => updateProp("fontFamily", e.target.value)}
    className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
  >
    {[
      "Arial, sans-serif", "Verdana, sans-serif","Helvetica, sans-serif","Tahoma, sans-serif", "Trebuchet MS, sans-serif", "Gill Sans, sans-serif","Noto Sans, sans-serif",
      "Segoe UI, sans-serif","Calibri, sans-serif","Geneva, sans-serif","Times New Roman, serif","Georgia, serif","Garamond, serif","Palatino, serif",
      "Bookman, serif", "Courier New, monospace", "Lucida Console, monospace","Monaco, monospace","Brush Script MT, cursive","Comic Sans MS, cursive",
      "Pacifico, cursive","Impact, fantasy","Lobster, cursive","Cursive","Fantasy","monospace","serif","sans-serif",
    ].map((font) => (
      <option key={font} value={font}>
        {font}
      </option>
    ))}
  </select>
</div>

   {/* Font Size */}
   <div className="relative">
  <label
    htmlFor={`font-size-${item.id}`}
    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Font Size </label>
  <input
    list={`font-size-options-${item.id}`}
    id={`font-size-${item.id}`}
    value={item.fontSize || ""}
    onChange={(e) => updateProp("fontSize", e.target.value)}
    placeholder="e.g. 16px or 1.5rem"
    className="w-full p-2 pr-8 border rounded appearance-none bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
  <div className="absolute right-2 top-9 pointer-events-none text-gray-500 dark:text-gray-400">
    <HiChevronDown size={18} />
  </div>
</div>

  {/* Text Content */}
  <div>
    <label
      htmlFor={`text-content-${item.id}`}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Text Content</label>
      <textarea
        id={`text-content-${item.id}`}
        value={item.content || ""}
        onChange={(e) => updateProp("content", e.target.value)}
        className="w-full p-2 border rounded resize-none bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        rows={1}/>
    </div>

      {/* Text Color Picker */}
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Text Color
      </label>
      <input
        type="color"
        value={item.color || "#000000"}
        onChange={(e) => updateProp("color", e.target.value)}
        className="w-80 h-20 p-0 border-2 border-gray-300 dark:border-gray-600 rounded cursor-pointer bg-white dark:bg-gray-800" />
    </div>

    {/* Style Icons */}
    <div className="flex items-center space-x-1">
     <button
  title="Bold"
  onClick={() => updateProp("bold", !item.bold)}
  className={`p-1 rounded transition ${
    item.bold
      ? "bg-indigo-600 text-white"
      : "text-gray-700 dark:text-gray-300"
  } hover:bg-indigo-200 dark:hover:bg-indigo-700`}
>
  <HiBold size={28} />
</button>
      <button
        title="Italic"
        onClick={() => updateProp("italic", !item.italic)}
        className={`p-1 rounded transition ${
          item.italic
            ? "bg-indigo-600 text-white"
            : "text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
        } hover:bg-indigo-200 dark:hover:bg-indigo-700 transition`}
      >
        <HiItalic size={28} />
      </button>
      <button
        title="Underline"
        onClick={() => updateProp("underline", !item.underline)}
        className={`p-1 rounded transition ${
          item.underline
            ? "bg-indigo-600 text-white"
            : "text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
        } hover:bg-indigo-200 dark:hover:bg-indigo-700 transition`}
      >
        <HiUnderline size={28}/>
      </button>
    </div>
  </div>
)}
     
{/* Image URL Input */}
{item.type === "image" && (
  <div className="space-y-4">
    {/* Image Upload */}
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Upload Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              // Update src and maybe other props on image upload
              updateProp("src", reader.result);

              // Optional: set default width and height if you want
              updateProp("width", 300);
              updateProp("height", 200);
            };
            reader.readAsDataURL(file);
          }
        }}
        className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
      />
    </div>

    {/* Image Preview */}
    {item.src && (
      <img
        src={item.src}
        alt={item.alt || "Preview"}
        className="mt-2 rounded max-h-40 object-contain border border-gray-300 dark:border-gray-600"
      />
    )}

    {/* Width */}
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Width (px)
      </label>
      <input
        type="number"
        min={1}
        value={item.width || ""}
        onChange={(e) =>
          updateProp("width", e.target.value ? parseInt(e.target.value) : "")
        }
        placeholder="e.g. 300"
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
        min={1}
        value={item.height || ""}
        onChange={(e) =>
          updateProp("height", e.target.value ? parseInt(e.target.value) : "")
        }
        placeholder="e.g. 200"
        className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
      />
    </div>
  </div>
)}


 {/* Other properties excluding icon, grid, text, and image */}
{item.type !== "icon" && item.type !== "grid" && item.type !== "text" && item.type !== "image" && (
  <>
    {/* Background Color */}
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

    {/* Text Color */}
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

    {/* Font Size */}
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Font Size (px)
      </label>
      <input
        type="number"
        min={1}
        className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
        value={item.fontSize || 14}
        onChange={(e) => updateProp("fontSize", parseInt(e.target.value) || 14)}
      />
    </div>

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
        Width (px)
      </label>
      <input
        type="number"
        min={1}
        value={item.width || 100}
        onChange={(e) => updateProp("width", parseInt(e.target.value) || 100)}
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
        min={1}
        value={item.height || 50}
        onChange={(e) => updateProp("height", parseInt(e.target.value) || 50)}
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
        onChange={(e) => updateProp("x", parseInt(e.target.value) || 0)}
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
        onChange={(e) => updateProp("y", parseInt(e.target.value) || 0)}
        className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
      />
    </div>
  </>
)}
</div>
  );
};

export default SidebarProperties;
