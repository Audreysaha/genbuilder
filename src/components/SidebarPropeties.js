import * as FiIcons from "react-icons/fi";
import { useState } from "react";
import { HiChevronDown, HiItalic, HiBold, HiUnderline } from "react-icons/hi2";

const SidebarProperties = ({ item, onUpdate }) => {
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

      {item.type === "Piechart" && (
  <div className="space-y-4">
    <h3 className="font-semibold text-gray-800 dark:text-gray-100">Pie Chart Data</h3>
    {(item.props?.data || []).map((slice, idx) => (
      <div key={idx} className="flex items-center gap-2 mb-2">
        <input
          type="color"
          value={slice.color}
          onChange={e => {
            const newData = [...item.props.data];
            newData[idx].color = e.target.value;
            onUpdate(item.id, { props: { ...item.props, data: newData } });
          }}
          className="w-8 h-8 rounded border-none"
        />
        <input
          type="text"
          value={slice.label}
          onChange={e => {
            const newData = [...item.props.data];
            newData[idx].label = e.target.value;
            onUpdate(item.id, { props: { ...item.props, data: newData } });
          }}
          placeholder="Label"
          className="w-16 border rounded px-1 text-xs"
        />
        <input
          type="number"
          value={slice.value}
          min={0}
          onChange={e => {
            const newData = [...item.props.data];
            newData[idx].value = Number(e.target.value);
            onUpdate(item.id, { props: { ...item.props, data: newData } });
          }}
          className="w-14 border rounded px-1 text-xs"
        />
        <button
          type="button"
          onClick={() => {
            const newData = item.props.data.filter((_, i) => i !== idx);
            onUpdate(item.id, { props: { ...item.props, data: newData } });
          }}
          className="text-red-500 hover:text-red-700 text-lg px-1"
          title="Remove slice"
        >
          ×
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() => {
        const newData = [
          ...item.props.data,
          { label: "New", value: 10, color: "#8884d8" }
        ];
        onUpdate(item.id, { props: { ...item.props, data: newData } });
      }}
      className="px-3 py-1 bg-indigo-600 text-white rounded text-xs"
    >
      Add Slice
    </button>
    <div className="flex gap-4 mt-4">
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-100">Width</label>
        <input
          type="number"
          value={item.props?.width || 180}
          onChange={e => onUpdate(item.id, { props: { ...item.props, width: Number(e.target.value) } })}
          className="w-16 border rounded px-1 ml-2"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-100">Height</label>
        <input
          type="number"
          value={item.props?.height || 180}
          onChange={e => onUpdate(item.id, { props: { ...item.props, height: Number(e.target.value) } })}
          className="w-16 border rounded px-1 ml-2"
        />
      </div>
    </div>
  </div>
)}

{/*Other properties */}
{["icon", "grid", "text", "image"].indexOf(item.type) === -1 && (
<div className="space-y-4">
{item.type !== "radio-button" && item.type !== "radio-button2" && item.type !== "toggle-button" &&  (
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
<div>
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
