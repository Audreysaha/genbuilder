import * as FiIcons from "react-icons/fi";
import { useState } from "react";
import { HiChevronDown, HiItalic, HiBold, HiUnderline } from "react-icons/hi2";

const SidebarProperties = ({ item, onUpdate,}) => {
  const handleAddItem = (newItem) => {
  setCanvasItems((prev) => [...prev, newItem]);
};
const [canvasItems, setCanvasItems] = useState([]);
const [iconSearch, setIconSearch] = useState(""); //icon searchbar
  if (!item)
    return (
      <div className="p-20 bg-white border-gray-600 dark:bg-gray-900 text-gray-500 dark:text-white">No element selected</div>);


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
    <div className="p-4 space-y-3 w-[350px] border-l bg-gray-50 dark:bg-gray-900 dark:border-gray-700 h-full overflow-y-auto">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Properties</h2>

      {/* ICON */}
    {item.type === "icon" && (
   <div >
  <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">Choose Icon</h3>

  {/* Search bar */}
  <input
    type="text"
    placeholder="Search icon..."
    value={iconSearch}
    onChange={(e) => setIconSearch(e.target.value.toLowerCase())}
    className="w-full mb-3 px-3 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
  />

 {/* Icon Color */}
      <div className="mb-3">
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
          Icon Color
        </label>
        <input
          type="color"
          value={item.props?.textColor || "#000000"}
          onChange={(e) =>
            onUpdate(item.id, {
              props: {
                ...item.props,
                textColor: e.target.value,
              },
            })
          }
          className="w-full h-10 rounded cursor-pointer"
        />
      </div>

      {/* Icon Size */}
      <div className="mb-3">
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
          Icon Size (px)
        </label>
        <input
          type="number"
          min={8}
          max={128}
          value={parseInt(item.props?.fontSize) || 24}
          onChange={(e) =>
            onUpdate(item.id, {
              props: {
                ...item.props,
                fontSize: `${e.target.value}`,
              },
            })
          }
          className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
        />
      </div>
  
  {/* Grid that fills the rest */}
  <div className="grid grid-cols-5 gap-2 overflow-y-auto flex-1 pr-1">
    {availableIcons
      .filter((iconName) => iconName.toLowerCase().includes(iconSearch))
      .map((iconName) => {
        const Icon = FiIcons[iconName];
        return (
          <div
            key={iconName}
            onClick={() =>
              onUpdate(item.id, {
                props: {
                  ...item.props,
                  iconName,
                },
              })
            }
            className={`p-2 rounded cursor-pointer flex justify-center items-center transition ${
              item.props?.iconName === iconName
                ? "bg-indigo-500 text-white"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-indigo-900 dark:text-indigo-300"
            }`}
            title={iconName}
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
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Grid Layout</h2>
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
                    gridTemplateColumns: `repeat(${columns}, 2fr)`,
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

        {/* Flex Direction */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-1">Flex Direction</label>
          <select
            value={item.props?.flexDirection || "row"}
            onChange={e => updateProp("props", { ...item.props, flexDirection: e.target.value })}
            className="w-full border rounded px-2 py-1 bg-white dark:bg-gray-800 dark:text-white"
          >
            <option value="row">Row (flex-row)</option>
            <option value="column">Column (flex-col)</option>
            <option value="row-reverse">Row Reverse</option>
            <option value="column-reverse">Column Reverse</option>
          </select>
        </div>

        {/* Display Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-1">Display</label>
          <select
            value={item.props?.display || "grid"}
            onChange={e => updateProp("props", { ...item.props, display: e.target.value })}
            className="w-full border rounded px-2 py-1 bg-white dark:bg-gray-800 dark:text-white"
          >
            <option value="grid">Grid</option>
            <option value="flex">Flex</option>
            <option value="block">Block</option>
            <option value="inline-block">Inline Block</option>
          </select>
        </div>

        {/* Responsive Columns */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-1">Responsive Columns</label>
          <div className="flex space-x-2">
            <input
              type="number"
              min={1}
              max={12}
              value={item.props?.cols_sm || ""}
              onChange={e => updateProp("props", { ...item.props, cols_sm: parseInt(e.target.value) || 1 })}
              placeholder="sm"
              className="w-1/4 border rounded px-2 py-1"
            />
            <input
              type="number"
              min={1}
              max={12}
              value={item.props?.cols_md || ""}
              onChange={e => updateProp("props", { ...item.props, cols_md: parseInt(e.target.value) || 1 })}
              placeholder="md"
              className="w-1/4 border rounded px-2 py-1"
            />
            <input
              type="number"
              min={1}
              max={12}
              value={item.props?.cols_lg || ""}
              onChange={e => updateProp("props", { ...item.props, cols_lg: parseInt(e.target.value) || 1 })}
              placeholder="lg"
              className="w-1/4 border rounded px-2 py-1"
            />
            <input
              type="number"
              min={1}
              max={12}
              value={item.props?.cols_xl || ""}
              onChange={e => updateProp("props", { ...item.props, cols_xl: parseInt(e.target.value) || 1 })}
              placeholder="xl"
              className="w-1/4 border rounded px-2 py-1"
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">Set columns for sm, md, lg, xl breakpoints</div>
        </div>

        {/* Height & Width */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Height (px)</label>
          <input
            type="number"
            min={50}
            value={item.props?.height || ""}
            onChange={(e) => {
              const value = e.target.value ? parseInt(e.target.value) : undefined;
              updateProp("props", { ...item.props, height: value });
            }}
            className="w-full border rounded px-2 py-1"
          />

          <label className="block text-sm font-medium text-gray-700">Width (px)</label>
          <input
            type="number"
            min={50}
            value={item.props?.width || ""}
            onChange={(e) => {
              const value = e.target.value ? parseInt(e.target.value) : undefined;
              updateProp("props", { ...item.props, width: value });
            }}
            className="w-full border rounded px-2 py-1"
          />
        </div>
      </div>
    )}
{item.type === "text" && (
        <div className="space-y-4">

          {/* Font Family */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-100">Font Family</label>
            <select
            value={item.props?.fontFamily || "Arial, sans-serif"}
            onChange={(e) =>  onUpdate(item.id, { props: { ...item.props, fontFamily: e.target.value }, })
            }
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
            type="number"
            min={2}
            max={100}
            value={parseInt(item.props?.fontSize) || 16}
            onChange={(e) =>
            onUpdate(item.id, {
            props: { ...item.props, fontSize: `${e.target.value}px` },
            })
            }
            className="w-full p-2 border dark:text-white rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          />
          </div>

          {/* Text Content */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-100">Text Content</label>
            <textarea
            value={item.props?.content || ""}
            onChange={(e) =>
            onUpdate(item.id, {
            props: { ...item.props, content: e.target.value },
            })
            } 
            className="w-full p-2 border rounded dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            />
          </div>

         {/* Text Color */}
        <div>
        <label className="text-sm font-medium text-gray-700 dark:text-white">Text Color</label>
        <input
        type="color"
        value={item.props?.textColor || "#000000"}
        onChange={(e) =>
        onUpdate(item.id, {
        props: {
          ...item.props,
          textColor: e.target.value,
        },
      })
      }
      className="w-full h-10 rounded cursor-pointer"
      />
    </div>

    {/* Bold, Italic, Underline Buttons */}
    <div className="flex items-center space-x-2 p-4">
    <button
    type="button"
    onClick={() =>
      onUpdate(item.id, {
        props: {
          ...item.props,
          bold: !item.props?.bold,
        },
      })
    }
    className={`p-2 rounded border ${
      item.props?.bold ? "bg-indigo-600 text-white" : "text-gray-800 dark:text-white"
    }`}
  >
    <HiBold size={24} />
  </button>

  <button
    type="button"
    onClick={() =>
      onUpdate(item.id, {
        props: {
          ...item.props,
          italic: !item.props?.italic,
        },
      })
    }
    className={`p-2 rounded border ${
      item.props?.italic ? "bg-indigo-600 text-white" : "text-gray-800 dark:text-white"
    }`}
  >
    <HiItalic size={24} />
  </button>

  <button
    type="button"
    onClick={() =>
      onUpdate(item.id, {
        props: {
          ...item.props,
          underline: !item.props?.underline,
        },
      })
    }
    className={`p-2 rounded border ${
      item.props?.underline ? "bg-indigo-600 text-white" : "text-gray-800 dark:text-white"
    }`}
  >
    <HiUnderline size={24} />
  </button>
</div>
</div>
)}

  {/* radio-button */}
{item.type === "radio-button" || item.type === "radio-button2" ? (
  <div className="space-y-4">
   
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-100">Content</label>
      <input
        type="text"
        value={item.props?.label || ""}
        onChange={e => onUpdate(item.id, { props: { ...item.props, label: e.target.value } })}
        placeholder=""
        className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
      />
    </div>

  </div>
) : null}

{item.type === "toggle-button" && (
  <div className="space-y-4">
    {/* Toggle Label */}
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-100">Label</label>
      <input
        type="text"
        value={item.props?.label || ""}
        onChange={e => onUpdate(item.id, { props: { ...item.props, label: e.target.value } })}
        placeholder="Enter label"
        className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
      />
    </div>
    {/* Toggle State */}
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-100">Checked</label>
      <input
        type="checkbox"
        checked={item.props?.checked || false}
        onChange={e => onUpdate(item.id, { props: { ...item.props, checked: e.target.checked } })}
        className="ml-2"
      />
    </div>
  </div>
)}

{/* IMAGE */}
{item.type === "image" && (
  <div className="space-y-4">
    {/* Upload multiple images */}
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload Images</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          const files = Array.from(e.target.files);
          const readers = files.map(file => {
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve({
                  src: reader.result,
                  width: 300,
                  height: 200,
                  alt: ''
                });
              };
              reader.readAsDataURL(file);
            });
          });

          Promise.all(readers).then((images) => {
            const newImages = [...(item.images || []), ...images];
            updateProp("images", newImages);

            if (typeof item.selectedImageIndex !== "number") {
              updateProp("selectedImageIndex", 0); // Default to first image
            }
          });
        }}
        className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
      />
    </div>

    {/* Image previews */}
  {item.type === "image" && (
  <div className="space-y-4">
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload Images</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          const files = Array.from(e.target.files);
          const readers = files.map(file => {
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve({
                  src: reader.result,
                  width: 300,
                  height: 200,
                  alt: ''
                });
              };
              reader.readAsDataURL(file);
            });
          });

          Promise.all(readers).then((images) => {
            const newImages = [...(item.images || []), ...images];
            updateProp("images", newImages);
          });
        }}
        className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
      />
    </div>

    {/* Loop through uploaded images */}
    {(item.images || []).map((img, index) => (
      <div
        key={index}
        className="space-y-2 border p-2 rounded-md bg-gray-50 dark:bg-gray-900"
      >
        <img
          src={img.src}
          alt={img.alt || "Preview"}
          className="rounded max-h-40 object-contain border border-gray-300 dark:border-gray-600"
        />

        <div className="flex flex-col space-y-2">
          <button
          onClick={() => {
     handleAddItem({
      id: `image-${Date.now()}`,
      type: "image",
      src: img.src,
      width: img.width,
      height: img.height,
      alt: img.alt || "Image",
      x: 100,
      y: 100,
    });
  }}
  className="text-sm px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
>
  Add to Canvas
</button>


          <button
            onClick={() => {
              const filtered = item.images.filter((_, i) => i !== index);
              updateProp("images", filtered);
            }}
            className="text-red-600 text-sm hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    ))}
  </div>
)}
</div>
)}

{/*exclude text property properties */}
{["icon", "grid", "text", "image"].indexOf(item.type) === -1 && (
<div className="space-y-4">
{item.type !== "radio-button" && item.type !== "radio-button2" && item.type !== "toggle-button" && item.type !== "H1" &&item.type !== "H2" &&item.type !== "H3" &&item.type !== "H4" &&item.type !== "H5" &&
  item.type !== "sidebar" && item.type !== "navbar" && item.type !== "tabs" && item.type !== "container" && item.type !== "dropdown" && item.type !== "search" && item.type !== "list" &&(
  <div>
    <label className="text-sm font-medium text-gray-700 dark:text-white">Content</label>
    <textarea
      value={item.props?.content || ""}
      onChange={(e) =>
        onUpdate(item.id, {
          props: {
            ...item.props,
            content: e.target.value,
          },
        })
      }
      rows={2}
      className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
      placeholder="Enter text here"
    />
  </div>
)}

{/* Background Color Picker */}
<div className="space-y-4">
{ item.type !== "H1" && item.type !== "H2" && item.type !== "H3" && item.type !== "H4" && item.type !== "H5" && item.type !== "toggle-button" && (
<div className="mt-4">
  <label className="text-sm font-medium text-gray-700 dark:text-white">
    Background Color
  </label>
  <input
    type="color"
    value={item.props?.backgroundColor || "#ffffff"}
    onChange={(e) =>
      onUpdate(item.id, {
        props: {
          ...item.props,
          backgroundColor: e.target.value,
        },
      })
    }
    className="w-full h-10 rounded cursor-pointer"
  />
</div>
)}

{/* Text Color Picker */}
<div>
  <label className="text-sm font-medium text-gray-700 dark:text-white">
    Text Color
  </label>
  <input
    type="color"
    value={item.props?.textColor || "#000000"}
    onChange={(e) =>
      onUpdate(item.id, {
        props: {
          ...item.props,
          textColor: e.target.value,
        },
      })
    }
    className="w-full h-10 rounded cursor-pointer"
  />
</div>

{/* Font Size Input */}
<div className="space-y-4">
{ item.type !== "container" && item.type !== "H1" && item.type !== "H2" && item.type !== "H3" && item.type !== "H4" && item.type !== "H5" && (
<div className="mt-4">
  <label className="text-sm font-medium text-gray-700 dark:text-white">
    Font Size (px)
  </label>
  <input
    type="number"
    min={1}
    value={item.props?.fontSize || 14}
    onChange={(e) =>
      onUpdate(item.id, {
        props: {
          ...item.props,
          fontSize: parseInt(e.target.value) || 14,
        },
      })
    }
    className="w-full mt-1 px-2 py-1 border rounded text-sm bg-white dark:bg-gray-800 dark:text-white"
  />
</div>
)}
</div>


{/*Border Radius*/}
<div className="space-y-4">
{ item.type !== "tabs" && item.type !== "navbar" && item.type !== "H1" && item.type !== "H2" && item.type !== "H3" && item.type !== "H4"
&& item.type !== "H5" && item.type !== "toggle-button" && item.type !== "textfield" && item.type !== "checkbox" && item.type !== "dropdown" &&
item.type !== "list" &&  item.type !== "radio-button" && item.type !== "radio-button2" &&(
<div className="mt-4">
  <label className="text-sm font-medium text-gray-700 dark:text-white">
    Border Radius (px)
  </label>
  <input
    type="number"
    min={0}
    value={item.props?.borderRadius || 0}
    onChange={(e) =>
      onUpdate(item.id, {
        props: {
          ...item.props,
          borderRadius: parseInt(e.target.value) || 0,
        },
      })
    }
    className="w-full mt-1 px-2 py-1 border rounded text-sm bg-white dark:bg-gray-800 dark:text-white"
  />
</div>
)}


  {[
  ["Width (px)", "width", 100],
  ["Height (px)", "height", 50],
  ["Position X", "x", 0],
  ["Position Y", "y", 0],
]
  // 🔽 Filter out unwanted props for headers
  .filter(([label, key]) => {
    const isHeading = ["H1", "H2", "H3", "H4", "H5"].includes(item.type);
    const excludedKeys = ["fontSize", "borderRadius", "width", "height"];
    return !(isHeading && excludedKeys.includes(key));
  })
  .map(([label, key, def]) => (
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
    </div>
    </div>
      )}
    </div>
  );
};

export default SidebarProperties;
