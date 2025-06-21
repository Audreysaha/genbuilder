import React from "react";
import * as FiIcons from "react-icons/fi";

const availableIcons = Object.keys(FiIcons);

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
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Properties</h2>

      {/* Only show icon picker for icon items */}
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

      {/* All other properties */}
      {item.type !== "icon" && (
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
              className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              value={item.fontSize || 14}
              onChange={(e) => updateProp("fontSize", parseInt(e.target.value))}
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
        </>
      )}
    </div>
  );
};

export default SidebarProperties;
