import React from 'react';
import { FaBuromobelexperte, FaDiceD6 } from 'react-icons/fa';
import {
  FiGrid,
  FiLayers,
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
  mediaElements,
  layoutElements,
  topographyElements,
}) {
  return (
    <div className="flex">
      {/* 1st left panel */}
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-4">
        <button
          onClick={() => setActiveTab('widgets')}
          className={`p-3 rounded-lg ${
            activeTab === 'widgets'
              ? 'bg-blue-100 text-indigo-800'
              : 'hover:bg-indigo-200'
          }`}
        >
          <FiGrid size={20} />
        </button>
        <button
          onClick={() => setActiveTab('layers')}
          className={`p-3 rounded-lg ${
            activeTab === 'layers'
              ? 'bg-blue-100 text-indigo-800'
              : 'hover:bg-indigo-200'
          }`}
        >
          <FiLayers size={20} />
        </button>
      </div>

 {/* 2nd Sidebar */}
{activeTab === 'widgets' && (
  <div className="w-80 h-screen flex flex-col bg-white border-r border-gray-200 overflow-hidden">
    {/* Header */}
    <div className="px-3 py-3 font-Tahoma text-left text-gray-800 text-[20px] font-sans">
      User-Interface Builder
    </div>

    {/* Search */}
<div className="mx-2 w-[290px]"> {/* Adds space on both ends */}
  <div className="border border-gray-300 bg-gray-100 rounded-md">
    <div className="flex items-center px-2 py-1.5 focus-within:ring-2 focus-within:ring-indigo-500">
      <input
        type="text"
        placeholder="Search "
        className="flex-grow bg-transparent outline-none text-sm text-black placeholder-gray-600"
      />
      <FiSearch size={18} className="text-gray-600 mr-2" />
    </div>
  </div>
</div>

 {/* Scrollable Content */}
<div className="flex-1 overflow-y-auto custom-scrollbar pb-3">
{/* Form Elements */}
<div className='mt-3'>
<div
  className="p-2 mt-2 flex items-center justify-between cursor-pointer hover:bg-gray-100 hover:text-black select-none"
  onClick={() => toggleSection('inputControls')}
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleSection('inputControls');
    }
  }}
>
  <span className="text-[16px] font-semibold text-black ml-">Form Elements</span>
  <FiChevronRight
    className={`transition-transform duration-200 ${
      expandedSections['inputControls'] ? 'rotate-90' : 'rotate-0'
    }`}
    size={23}
  />
</div>
  {expandedSections['inputControls'] && (
    <div className="w-full px-1 pb-1 grid grid-cols-3 gap-4 pt-1">
      {visualItems.map(({ type, label, icon: Icon }) => (
        <div
          key={type}
          draggable
          onDragStart={(e) => e.dataTransfer.setData('componentType', type)}
          className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded hover:bg-gray-100 cursor-grab"
        >
          {Icon && <Icon className="text-indigo-700 mb-1" size={28} />}
          <span className="text-xs text-gray-700">{label}</span>
        </div>
      ))}
    </div>
  )}
</div>

{/* Layout Elements */}
<div>
  <div
    className="p-2 flex items-center justify-between cursor-pointer hover:bg-gray-100 hover:text-black select-none"
    onClick={() => toggleSection('layoutElements')}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        toggleSection('layoutElements');
      }
    }}
  >
    <span className="text-[16px] font-bold text-black">Layout Elements</span>
    <FiChevronRight
      className={`transition-transform duration-200 ${
        expandedSections['layoutElements'] ? 'rotate-90' : 'rotate-0'
      }`}
      size={23}
    />
  </div>
  {/* Grid of Layout Items */}
  {expandedSections['layoutElements'] && (
    <div className="w-full px-1 pb-3 grid grid-cols-3 gap-4 pt-1">
      {layoutElements.map(({ type, label, icon: Icon }) => (
        <div
          key={type}
          draggable
          onDragStart={(e) => e.dataTransfer.setData('componentType', type)}
          className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded hover:bg-gray-100 cursor-grab"
        >
          {Icon && <Icon className="text-indigo-700 mb-1" size={28} />}
          <span className="text-xs text-gray-700">{label}</span>
        </div>
      ))}
    </div>
  )}
</div>

{/* Media Elements */}
<div>
  <div
    className="p-2 flex items-center justify-between cursor-pointer hover:bg-gray-100 hover:text-black select-none"
    onClick={() => toggleSection('mediaElements')}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        toggleSection('mediaElements');
      }
    }}
  >
    <span className="text-[16px] font-bold text-black">Media Elements</span>
    <FiChevronRight
      className={`transition-transform duration-200 ${
        expandedSections['mediaElements'] ? 'rotate-90' : 'rotate-0'
      }`}
      size={23}
    />
  </div>
  {/* Grid of Media Items */}
  {expandedSections['mediaElements'] && (
    <div className="w-full px-1 pb-3 grid grid-cols-3 gap-4 pt-1">
      {mediaElements.map(({ type, label, icon: Icon }) => (
        <div
          key={type}
          draggable
          onDragStart={(e) => e.dataTransfer.setData('componentType', type)}
          className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded hover:bg-gray-100 cursor-grab"
        >
          {Icon && <Icon className="text-indigo-700 mb-1" size={28} />}
          <span className="text-xs text-gray-700">{label}</span>
        </div>
      ))}
    </div>
  )}
</div>

{/* Topography Elements */}
<div>
  <div
    className="p-2 flex items-center justify-between cursor-pointer hover:bg-gray-100 hover:text-black select-none"
    onClick={() => toggleSection('topographyElements')}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        toggleSection('topographyElements');
      }
    }}
  >
    <span className="text-[16px] font-bold text-black">Topography Elements</span>
    <FiChevronRight
      className={`transition-transform duration-200 ${
        expandedSections['topographyElements'] ? 'rotate-90' : 'rotate-0'
      }`}
      size={23}
    />
  </div>
  {/* Grid of Typography Items */}
  {expandedSections['topographyElements'] && (
    <div className="w-full px-1 pb-3 grid grid-cols-3 gap-4 pt-1">
      {topographyElements.map(({ type, label, icon: Icon }) => (
        <div
          key={type}
          draggable
          onDragStart={(e) => e.dataTransfer.setData('componentType', type)}
          className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded hover:bg-gray-100 cursor-grab"
        >
          {Icon && <Icon className="text-indigo-700 mb-1" size={28} />}
          <span className="text-xs text-gray-700">{label}</span>
        </div>
      ))}
    </div>
  )}
</div>
            {[
            ].map((section) => (
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
                    className={`mr-2 transition-transform duration-200 ${
                      expandedSections[section.id] ? 'rotate-90' : 'rotate-0'
                    }`}
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
                        onDragStart={(e) =>
                          e.dataTransfer.setData('componentType', type)
                        }
                        className="flex items-center gap-2 p-2 rounded cursor-grab hover:bg-gray-200"
                      >
                        <div className="text-indigo-700">
                          {Icon ? <Icon size={16} /> : null}
                        </div>
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
