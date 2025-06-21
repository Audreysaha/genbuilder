import React from "react";
import { FiGrid, FiLayers, FiSearch, FiChevronRight } from "react-icons/fi";

export default function SidebarBuilder({
  activeTab,
  setActiveTab,
  expandedSections,
  toggleSection,
  visualItems,
  mediaElements,
  layoutElements,
  topographyElements,
}) {
  return (
    <>
      {/* Scrollbar styles for light & dark mode */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #a5b4fc;
          border-radius: 10px;
          border: 2px solid #f3f4f6;
        }
        html.dark .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
        }
        html.dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #6366f1;
          border: 2px solid #1f2937;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #a5b4fc #f3f4f6;
        }
        html.dark .custom-scrollbar {
          scrollbar-color: #6366f1 #1f2937;
        }
        /* Reduce icon stroke width */
        .icon-wrapper svg {
          stroke-width: 1 !important;
        }
      `}</style>

      <div className="flex">
        {/* Left tab panel */}
        <div className="w-16 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-4 space-y-4">
          <button
            onClick={() => setActiveTab("widgets")}
            className={`p-3 rounded-lg transition-colors ${
              activeTab === "widgets"
                ? "bg-blue-100 text-indigo-800 dark:bg-blue-700 dark:text-white"
                : "hover:bg-indigo-200 dark:hover:bg-indigo-800 dark:text-gray-300"
            }`}
            aria-label="Widgets tab"
          >
            <FiGrid size={20} />
          </button>
          <button
            onClick={() => setActiveTab("layers")}
            className={`p-3 rounded-lg transition-colors ${
              activeTab === "layers"
                ? "bg-blue-100 text-indigo-800 dark:bg-blue-700 dark:text-white"
                : "hover:bg-indigo-200 dark:hover:bg-indigo-800 dark:text-gray-300"
            }`}
            aria-label="Layers tab"
          >
            <FiLayers size={20} />
          </button>
        </div>

        {/* Main sidebar content */}
        {activeTab === "widgets" && (
          <div className="w-80 h-screen flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="px-3 py-3 font-Tahoma text-left text-gray-800 dark:text-gray-200 text-[20px] font-sans">
              User-Interface Builder
            </div>

            {/* Search */}
            <div className="mx-2 w-[290px]">
              <div className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 rounded-md">
                <div className="flex items-center px-2 py-1.5 focus-within:ring-2 focus-within:ring-indigo-500">
                  <input
                    type="text"
                    placeholder="Search"
                    className="flex-grow bg-transparent outline-none text-sm text-black dark:text-gray-200 placeholder-gray-600 dark:placeholder-gray-400"
                  />
                  <FiSearch
                    size={18}
                    className="text-gray-600 dark:text-gray-400 mr-2"
                  />
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pb-3">
              {/* Form Elements */}
              <Section
                label="Form Elements"
                expanded={expandedSections["inputControls"]}
                onToggle={() => toggleSection("inputControls")}
                items={visualItems}
              />

              {/* Layout Elements */}
              <Section
                label="Layout Elements"
                expanded={expandedSections["layoutElements"]}
                onToggle={() => toggleSection("layoutElements")}
                items={layoutElements}
              />

              {/* Media Elements */}
              <Section
                label="Media Elements"
                expanded={expandedSections["mediaElements"]}
                onToggle={() => toggleSection("mediaElements")}
                items={mediaElements}
              />

              {/* Topography Elements */}
              <Section
                label="Topography Elements"
                expanded={expandedSections["topographyElements"]}
                onToggle={() => toggleSection("topographyElements")}
                items={topographyElements}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Section component with dark mode & reduced icon stroke
function Section({ label, expanded, onToggle, items }) {
  return (
    <div className="mt-3">
      <div
        className="p-2 flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white select-none"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onToggle();
          }
        }}
      >
        <span className="text-[16px] font-semibold text-black dark:text-white">
          {label}
        </span>
        <FiChevronRight
          className={`transition-transform duration-200 text-black dark:text-white ${
            expanded ? "rotate-90" : "rotate-0"
          }`}
          size={23}
        />
      </div>

      {expanded && (
        <div className="w-full px-1 pb-3 grid grid-cols-3 gap-4 pt-1">
          {items.map(({ type, label, icon: Icon }) => (
            <div
              key={type}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("componentType", type)}
              className="flex flex-col items-center justify-center p-3 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-grab"
            >
              <div className="icon-wrapper">
                {Icon && (
                  <Icon
                    className="text-indigo-700 dark:text-indigo-400 mb-1"
                    size={28}
                  />
                )}
              </div>
              <span className="text-xs text-gray-700 dark:text-gray-300">
                {label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
