import React from 'react';
import {
  FiGrid,
  FiLayers,
  FiCode,
  FiSearch,
  FiChevronRight,
} from 'react-icons/fi';

export default function SidebarBuilder({
  activeTab,
  setActiveTab,
  topTab,
  handleTabClick,
  darkMode,
  expandedSections,
  toggleSection,
  visualItems,
  navigationalItems,
  layoutElements,
  topographyElements
}) {
  return (
    <>
      {/* 1st left panel */}
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-4">
        <button
          onClick={() => setActiveTab('widgets')}
          className={`p-3 rounded-lg ${activeTab === 'widgets' ? 'bg-blue-100 text-indigo-800' : 'hover:bg-indigo-200'}`}
        >
          <FiGrid size={20} />
        </button>
        <button
          onClick={() => setActiveTab('layers')}
          className={`p-3 rounded-lg ${activeTab === 'layers' ? 'bg-white text-indigo-800' : 'hover:bg-indigo-200'}`}
        >
          <FiLayers size={20} />
        </button>
      </div>

      {/* 2nd Sidebar */}
      {activeTab === 'widgets' && (
  <div className="w-64 h-screen flex flex-col bg-white border-r border-gray-200 overflow-hidden">
    {/* Tabs */}
    <div className="px-2 py-4 font-semibold text-left text-gray-800 text-xl font-sans mb-4">
      User-Interface Builder
    </div>

          {/* Search */}
        <div className="flex items-center border border-gray-300 rounded-lg px-6 py-1.5 bg-white focus-within:ring-2 focus-within:ring-indigo-500">
      <input
        type="text"
        placeholder="Search elements"
        className="flex-grow bg-transparent outline-none text-sm text-black placeholder-gray-400"
      />
      <FiSearch size={18} className="text-gray-400" />
    </div>

          {/* Scrollable Content */}
          <div className="h-full flex flex-col">
            <div className="flex-4 overflow-y-auto custom-scrollbar p-4 space-y-4">

              {/* Section rendering */}
              {[
                {
                  id: 'inputControls',
                  label: 'Input Controls',
                  items: visualItems
                },
                {
                  id: 'navigationalItems',
                  label: 'Navigational Components',
                  items: navigationalItems
                },
                {
                  id: 'layoutElements',
                  label: 'Containers & Layouts',
                  items: layoutElements
                },
                {
                  id: 'topographyElements',
                  label: 'Topography & Media',
                  items: topographyElements
                }
              ].map(section => (
                <div key={section.id} className="border-b border-gray-300">
                  <div
                    className="p-3 flex items-center cursor-pointer hover:bg-indigo-300 hover:text-black select-none"
                    onClick={() => toggleSection(section.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        toggleSection(section.id);
                      }
                    }}
                  >
                    <FiChevronRight
                      className={`mr-2 transition-transform duration-200 ${expandedSections[section.id] ? 'rotate-90' : 'rotate-0'}`}
                      size={14}
                    />
                    <span className="text-[15px]">{section.label}</span>
                  </div>

                  {expandedSections[section.id] && (
                    <div className="px-4 pb-3 space-y-2 text-sm text-gray-800">
                      {section.items.map(({ type, label, icon: Icon }) => (
                        <div
                          key={type}
                          draggable
                          onDragStart={(e) => e.dataTransfer.setData('componentType', type)}
                          className="flex items-center gap-2 p-2 rounded cursor-grab hover:bg-gray-200"
                        >
                          <div className="text-indigo-700">{Icon ? <Icon size={16} /> : null}</div>
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
