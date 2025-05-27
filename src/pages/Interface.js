import React, { useState, useEffect } from 'react';
import {RotateCcw, RotateCw } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import lowcode from '../assets/images/lowcode.jpeg';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiSettings, FiPlay,FiColumns, FiLayers, FiCheckSquare, FiType, FiSearch,  FiSend, FiEdit2, FiChevronDown, FiNavigation,FiCornerDownRight, FiLayout, FiHash,  FiSidebar,FiCreditCard, FiVideo,FiChevronRight, FiGrid, FiAlignLeft, FiImage,  } from 'react-icons/fi';
import { FaMobileAlt, FaTabletAlt, FaLaptop } from 'react-icons/fa';

const FlutterFlowClone = () => {
  const [open, setOpen] = useState(false);
  const [canvasItems, setCanvasItems] = useState([]);
  const [darkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('widgets');
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [widgets, setWidgets] = useState([]);
  const [deviceSize, setDeviceSize] = useState('mobile');
  const [showCode, setShowCode] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [value, setValue] = useState("inital");
  const [active, setActive] = useState(null);

//undo and do button
  const handleUndoClick = () => {
  setActive("undo");
    if (onUndo) onUndo();
  };
  const handleRedoClick = () => {
  setActive("redo");
    if (onRedo) onRedo();
  };

    const onUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setFuture((prev) => [value, ...prev]);
    setValue(previous);
  };

  const onRedo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture((prev) => prev.slice(1));
    setHistory((prev) => [...prev, value]);
    setValue(next);
  };
 
  //language selector
  const [language, setLanguage] = useState("en");
  const [langOpen, setLangOpen] = useState(false);

  const toggleLangMenu = () => setLangOpen(!langOpen);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setLangOpen(false);
  };
  const bgColor = "bg-white";
  const borderColor = "border-gray-200";
  
  //devices
  const getDeviceDimensions = () => {
    switch (deviceSize) {
      case 'mobile':
        return { width: 375, height: 580 };
      case 'tablet':
        return { width: 768, height: 597 };
      case 'desktop':
        return { width: 1050, height: 468 };
      default:
        return { width: 375, height: 667 };
    }
  };

  // AI/Edit
const [mode, setMode] = useState("Edit");

  // Input Contols
const visualItems = [
  { type: 'submit-button', label: 'Submit Button', icon: FiSend },
  { type: 'textfield', label: 'Text Field', icon: FiEdit2 },
  { type: 'checkbox', label: 'Checkbox', icon: FiCheckSquare },
  { type: 'dropdown', label: 'Dropdown List', icon: FiChevronDown },
  { type: 'search', label: 'Search Field', icon: FiSearch },
];

//Navigational Components
const navigationalItems = [
  { type: 'navbar', label: 'Navigation Bar', icon: FiNavigation },
  { type: 'sidebar', label: 'Sidebar', icon: FiSidebar },
  { type: 'tabs', label: 'Tabs', icon: FiGrid },
  { type: 'breadcrumbs', label: 'Breadcrumbs', icon: FiCornerDownRight },
]

//Layout element
const layoutElements = [
  { type: 'grid', label: 'Grids / Columns', icon: <FiColumns /> },
  { type: 'headers', label: 'Headers', icon: <FiType /> },
  { type: 'footer', label: 'Footer', icon: <FiLayout /> },
  { type: 'sidepanel', label: 'Side Panels', icon: <FiSidebar /> },
  { type: 'card', label: 'Cards', icon: <FiCreditCard /> },
];

//topography&media 
const topographyElements = [
      { type: 'heading', label: 'Headings', icon: <FiHash /> },
      { type: 'paragraph', label: 'Paragraph', icon: <FiAlignLeft /> },
      { type: 'image' , label: 'Images', icon: <FiImage /> },
      {  type: 'video', label: 'Videos', icon: <FiVideo /> },
    ];
 
//expanded section
const [expandedSections, setExpandedSections] = useState({
    topographyElements: true,
  });

  //toggle section
  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }
  
//handling drops
 const handleDrop = (e) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData("componentType");

    if (componentType) {
      setCanvasItems((prev) => [...prev, { id: Date.now(), type: componentType }]);
    }
  }

  //Canvas section
  const addComponentToCanvas = (type) => {
  setCanvasItems((prev) => [...prev, { type }]);
};

// Responsiveness
  const [setShowResponsivePanel] = useState(false);

  // Handler for tabs
  const [topTab, setTopTab] = useState('widgets');

  const handleTabClick = (tab) => {
    setTopTab(tab);
    if (tab === 'Responsive') {
      setShowResponsivePanel(true);
    } else {
      setShowResponsivePanel(false);
    }
  };

 
  const { width, height } = getDeviceDimensions();





// Widget renderer (for img, video, paragraph, heading)
const updateWidget = (id, updates) => {
    setWidgets(widgets.map(w => 
      w.id === id ? { ...w, ...updates } : w
    ));
  };

const RenderWidget = ({ type }) => {
  switch (type) {
    case "heading":
      return <h1 className="text-2xl font-bold">Heading Text</h1>;
    case "paragraph":
      return <p className="text-gray-700">This is a sample paragraph.</p>;
    case "image":
      return (
        <img
          src="https://via.placeholder.com/150"
          alt="Placeholder"
          className="w-[150px] h-auto"
        />
      );
    case "video":
      return (
        <video controls className="w-[500px]">
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    default:
      return null;
  }
};


  return (
  <div className="flex flex-col h-screen bg-white text-gray-900">

    {/*NAVigation BAR */}
    <div className={`flex items-center p-2 ${bgColor} border-b ${borderColor}`}>

     {/* Left section of Navbar (4) */}
      <div className="flex items-center space-x-3 text-sm">
        {/*1-hamburger button*/}
       <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded hover:bg-indigo-200"
        aria-expanded={open}
        aria-haspopup="true"
        title="Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-md z-10">
          <button
            className="flex items-center w-full px-4 py-2 hover:bg-indigo-100 text-gray-700"
            onClick={() => alert("New Workspace clicked")}
          >
          {/*Items of Hamburgeur */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h4l3 3h8a2 2 0 012 2v5a2 2 0 01-2 2H3V7z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7V5a2 2 0 012-2h4l3 3h8a2 2 0 012 2v5a2 2 0 01-2 2H3V7z" />
            </svg>
            New Workspace
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-indigo-100 text-gray-700"
            onClick={() => alert("Save clicked")}
          >
            Save
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-indigo-100 text-gray-700"
            onClick={() => alert("Save As clicked")}
          >
            Save As
          </button>
        </div>
      )}
    </div>

        {/* 2-Search Bar */}
        <div className="relative w-35">
          {/*House icon */}
          <div className="absolute inset-y-0 left-1 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 9.75L12 4.5l9 5.25v9a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3H9v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 013 18.75v-9z"
              />
            </svg>
          </div>
          {/*Arrow icon */}
         <div className="absolute inset-y-0 right-2 flex flex-col items-center justify-center pointer-events-none">
         <svg
         xmlns="http://www.w3.org/2000/svg"
         className="h-4 w-4 text-gray-500"
         fill="none"
         viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        >
        {/* Up arrow */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 9l5-5 5 5" />
        {/* Down arrow */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 15l5 5 5-5" />
        </svg>
        </div>
        <input
            type="search"
            placeholder="Home"
            className="w-full pl-6 pr-6 py-1.5 rounded border text-s bg-gray-100 border-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* 3-Language Selector */}
        <div className="relative">
          <button
            onClick={toggleLangMenu}
            className="h-8 px-2 border rounded text-s flex items-center space-x-1 bg-gray-100 border-gray-300 text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 0c2.5 1.5 4 4.5 4 9s-1.5 7.5-4 9m0-18C9.5 4.5 8 7.5 8 12s1.5 7.5 4 9"
              />
            </svg>
            <span>{language}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {langOpen && (
            <ul className="absolute mt-1 rounded shadow-lg w-full z-10 text-xs border bg-white text-black border-gray-300">
              {["en", "de", "fr"].map((lang) => (
                <li
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className="px-3 py-1.5 hover:bg-indigo-300 hover:text-white cursor-pointer"
                >
                  {lang}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 4-Zoom control */}
        <div className="bg-gray-100 p-1 rounded border border-gray-300 inline-flex items-center space-x-2 text-s text-gray-800">
       <span className="cursor-pointer" onClick={() => setZoom(Math.max(50, zoom - 10))} title="Zoom Out">-</span>
       <span>{zoom}%</span>
      <span className="cursor-pointer" onClick={() => setZoom(Math.min(150, zoom + 10))} title="Zoom In">+</span>
      </div>
      </div>


  <div className="flex items-center w-full px-4 py-2 bg-white border-b">
  <div className="w-40" />

  {/* 1. Centered Device Buttons */}
  <div className="flex-1 flex justify-center">
    <div className="flex space-x-1">
      {[
        { icon: <FaMobileAlt size={18} />, type: "mobile" },
        { icon: <FaTabletAlt size={18} />, type: "tablet" },
        { icon: <FaLaptop size={20} />, type: "desktop" },
      ].map(({ icon, type }) => (
        <button
          key={type}
          onClick={() => setDeviceSize(type)}
          className={`p-1 rounded ${
            deviceSize === type ? "bg-blue-100 text-blue-800" : "hover:bg-gray-200"
          }`}
          title={type}
        >
          {icon}
        </button>
      ))}
    </div>
  </div>

  {/* 2. Spacer */}
  <div className="flex-grow" />

  {/* 3. Right Section Controls */}
  <div className="flex items-center space-x-2.5">
    
    {/* Undo/Redo */}
    <div className="bg-white rounded flex">
      <div
        onClick={handleUndoClick}
        className={`w-8 h-8 flex items-center justify-center cursor-pointer rounded ${
          active === "undo" ? "text-indigo-600 bg-indigo-100" : "text-gray-600 hover:bg-gray-200"
        }`}
        title="Undo"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleUndoClick()}
      >
        <RotateCcw className="w-5 h-5" />
      </div>

      <div
        onClick={handleRedoClick}
        className={`w-8 h-8 flex items-center justify-center cursor-pointer rounded ${
          active === "redo" ? "text-indigo-600 bg-indigo-100" : "text-gray-600 hover:bg-gray-200"
        }`}
        title="Redo"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleRedoClick()}
      >
        <RotateCw className="w-5 h-5" />
      </div>
    </div>

    {/* Mode Toggle */}
    <div className="flex border rounded-full text-sm font-medium overflow-hidden">
      <button
        onClick={() => setMode("AI")}
        className={`px-4 py-1 transition ${
          mode === "AI" ? "bg-indigo-200 text-indigo-800" : "bg-white text-gray-800"
        }`}
      >
        AI
      </button>
      <button
        onClick={() => setMode("Edit")}
        className={`px-4 py-1 transition ${
          mode === "Edit" ? "bg-indigo-200 text-indigo-800" : "bg-white text-gray-800"
        }`}
      >
        Edit
      </button>
    </div>

    {/* Preview Button */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-3 py-1.5 rounded-md text-sm font-medium flex items-center bg-green-500 hover:bg-green-600 text-white"
    >
      <FiPlay className="mr-1" />
      Preview
    </motion.button>

    {/* Publish Button */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-1.5 rounded-md text-sm bg-purple-500 hover:bg-purple-600 text-white"
    >
      Publish
    </motion.button>
  </div>
</div>
</div>

    
{/* LEFT SIDE BAR*/}
<div className="flex flex-1 overflow-hidden">

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
  <button 
    onClick={() => setShowCode(!showCode)}
    className={`p-3 rounded-lg ${showCode ? 'bg-blue-100 text-white' : 'hover:bg-indigo-200'}`}
  >
    <FiCode size={20} />
  </button>
</div>

        
{/* Second left siderbar */}
  {activeTab === 'widgets' && (
        <div className="w-64 h-full flex flex-col bg-white border-r border-gray-200 overflow-hidden">
          
          {/* Row 1: UI Builder, Responsive */}
          <div className="border-b border-gray-300 flex">
            {['UI Builder', 'Responsive'].map(tab => (
              <div
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`
                  px-5 py-3 cursor-pointer text-[18px] capitalize transition-all
                  ${topTab === tab 
                    ? 'text-blue-500 border-b-2 border-blue-500' 
                    : darkMode 
                      ? 'text-black border-b-2 border-transparent' 
                      : 'text-gray-400 border-b-2 border-transparent'}
                `}
              >
                {tab}
              </div>
            ))}
          </div>

     {/* Row 2: Search element*/}
    <div className="p-2 border-b border-gray-300 flex items-center space-x-2">
      <FiSearch size={18} />
      <input 
        type="text" 
        placeholder="Search elements" 
        className={`w-full bg-transparent outline-none text-sm ${'text-black placeholder-gray-400'}`}
      />
    </div>

 

<div className="h-full flex flex-col">
  {/* Single scrollable container wrapping all sections */}
  <div className="flex-4 overflow-y-auto custom-scrollbar p-4 space-y-4"> 

    {/* Input Controls */}
   <div className="border-b border-gray-300">
  <div
    className="p-3 flex items-center cursor-pointer hover:bg-indigo-300 hover:text-black"
    onClick={() => toggleSection('inputControls')}
  >
    <FiChevronRight
      className={`mr-2 transition-transform duration-200 ${
        expandedSections.inputControls ? 'rotate-90' : 'rotate-0'
      }`}
      size={14}
    />
    <span className="text-[15px]">Input Controls</span>
  </div>

  {expandedSections.inputControls && (
    <div className="px-4 pb-3 space-y-2 text-sm text-gray-800">
      {visualItems.map(({ type, label, icon: Icon }) => (
        <div
          key={type}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('componentType', type); // Crucial for drop handling
          }}
          className="flex items-center cursor-grab p-2 rounded hover:bg-gray-200"
        >
          <Icon className="mr-2 text-indigo-700" size={16} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  )}
</div>

  {/* Navigational Components */}
<div className="border-b border-gray-300">
  <div
    className="p-3 flex items-center cursor-pointer hover:bg-indigo-300 hover:text-black"
    onClick={() => toggleSection('navigationalItems')}
  >
    <FiChevronRight
      className={`mr-2 transition-transform duration-200 ${
        expandedSections.navigationalItems ? 'rotate-90' : 'rotate-0'
      }`}
      size={14}
    />
    <span className="text-[15px]">Navigational Components</span>
  </div>

  {expandedSections.navigationalItems && (
    <div className="px-4 pb-3 space-y-2 text-[15px] text-gray-800">
      {navigationalItems.map(({ type, label, icon: Icon }) => (
        <div
          key={type}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('componentType', type);
          }}
          className="flex items-center gap-2 p-2 rounded cursor-grab hover:bg-gray-200"
        >
          <Icon className="text-indigo-700" size={16} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  )}
</div>

    {/* Containers and Layouts*/}
    <div className="border-b border-gray-300">
          <div
            className="p-3 flex items-center cursor-pointer hover:bg-indigo-300 hover:text-black select-none"
            onClick={() => toggleSection('layoutElements')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleSection('layoutElements');
              }
            }}
          >
            <FiChevronRight
              className={`mr-2 transition-transform duration-200 ${
                expandedSections.layoutElements ? 'rotate-90' : 'rotate-0'
              }`}
              size={14}
            />
            <span className="text-[15px]">Containers & Layouts</span>
          </div>
          {expandedSections.layoutElements && (
            <div className="px-4 pb-3 space-y-2 text-[15px] text-gray-800">
              {layoutElements.map(({ type, label, icon }) => (
                <div
                  key={type}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('componentType', type)}
                  className="flex items-center gap-2 p-2 rounded cursor-grab hover:bg-gray-200"
                >
                  <div className="text-indigo-700">{icon}</div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
  )}
</div>

    {/* Topography and Media */}
<div className="border-b border-gray-300">
   <div
            className="p-3 flex items-center cursor-pointer hover:bg-indigo-300 hover:text-black select-none"
            onClick={() => toggleSection('topographyElements')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleSection('topographyElements');
              }
            }}
          >
        <FiChevronRight
          className={`mr-2 transition-transform duration-200 ${
                expandedSections.topographyElements ? 'rotate-90' : 'rotate-0'
              }`}
              size={14}
            />
          <span className="text-[15px]">Topography & Media</span>
          </div>
      {expandedSections.topographyElements && (
        <div className="px-4 pb-3 space-y-2 text-[15px] text-gray-800">
          {topographyElements.map(({ type, label, icon }) => (
            <div
              key={type}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("componentType", type)}
              className="flex items-center gap-2 p-2 rounded cursor-grab hover:bg-gray-200"
            >
              <div className="text-indigo-700">{icon}</div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
</div>


    </div>
    </div>


    )}


        
        {/* Main Canvas Area */}
     <div 
  className="flex-1 overflow-auto p-10 flex items-center justify-center" 
  style={{ backgroundColor: '#F3F4F6' }} // light gray background
   onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >

  <div 
    className="relative bg-white shadow-xl"
    style={{ 
      width: `${width * zoom / 100}px`, 
      height: `${height * zoom / 100}px`,
      transform: `scale(${zoom / 100})`,
      transformOrigin: 'center center',
    }}
  >
    {/* Canvas Drop Zone */}
   <div
  className="canvas-area"
  onDragOver={(e) => e.preventDefault()}
  onDrop={(e) => {
    const componentType = e.dataTransfer.getData("componentType");
    addComponentToCanvas(componentType);
  }}
>
  {canvasItems.map((item) => (
     <div key={item} className="mb-4 p-4 bg-white border rounded shadow-sm">
      {/* Topography & Media */}
      {item.type === "heading" && <h1 className="text-2xl font-bold">Heading</h1>}
      {item.type === "paragraph" && <p className="text-base">This is a paragraph.</p>}
        {item.type === "image" && (
              <img
                src={lowcode}
                alt="Placeholder"
                className="w-[250px] h-auto"
              />
            )}
       {item.type === "video" && (
              <video controls width="300">
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

   {/* Input Control */}
    {item.type === "textfield" && (
      <input
        type="text"
        placeholder="Enter some text"
        className="p-2 border rounded w-full"
      />
    )}

    {item.type === "submit-button" && (
      <button
        onClick={() => alert("Form submitted")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    )}
    
    {item.type === "checkbox" && (
      <label className="inline-flex items-center space-x-2">
        <input type="checkbox" className="form-checkbox" />
        <span>Check me</span>
      </label>
    )}

    {item.type === "dropdown" && (
      <select className="p-2 border border-gray-300 rounded w-full">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
    )}

    {item.type === "search" && (
      <input
        type="search"
        placeholder="Search..."
        className="p-2 border border-gray-300 rounded w-full"
      />
    )}

    {/*Navigational Components */}
    {item.type === "navbar" && (
      <nav className="bg-gray-800 p-3 text-white rounded">
        <ul className="flex space-x-4">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    )}

    {item.type === "sidebar" && (
      <aside className="w-48 bg-gray-200 p-3 rounded">
        <ul className="space-y-2">
          <li>Dashboard</li>
          <li>Settings</li>
          <li>Profile</li>
        </ul>
      </aside>
    )}

    {item.type === "tabs" && (
      <div className="rounded border p-2">
        <div className="flex space-x-2 border-b pb-2 mb-2">
          <button className="px-2 py-1 bg-blue-100 rounded">Tab 1</button>
          <button className="px-2 py-1 hover:bg-gray-100 rounded">Tab 2</button>
        </div>
        <div>Tab content here...</div>
      </div>
    )}

    {item.type === "breadcrumbs" && (
      <nav className="text-sm text-gray-600">
     <span>Home</span> &gt; <span>Library</span> &gt; <span>Data</span>
      </nav>
    )}

{/* Layout Element */}
 {item.type === 'grid' && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-200 p-4 text-center">Column 1</div>
          <div className="bg-gray-200 p-4 text-center">Column 2</div>
          <div className="bg-gray-200 p-4 text-center">Column 3</div>
        </div>
      )}

      {item.type === 'headers' && (
        <header className="text-xl font-bold text-indigo-700">Header Section</header>
      )}

      {item.type === 'footer' && (
        <footer className="text-sm text-center text-gray-600 border-t pt-2 mt-4">
          © 2025 Your Company. All rights reserved.
        </footer>
      )}

      {item.type === 'sidepanel' && (
        <aside className="w-1/4 p-4 bg-gray-100 border">
          Side Panel Content
        </aside>
      )}

      {item.type === 'card' && (
        <div className="border rounded shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Card Title</h2>
          <p className="text-sm text-gray-700">This is a simple card description.</p>
        </div>
      )}

  </div>
))}
</div>


  </div>
</div>


        {/* Right Sidebar - Properties Panel */}
        <div className={`w-80 ${darkMode ? 'bg-black' : 'bg-white'} border-l ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4 overflow-y-auto`}>
          {selectedWidget ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold capitalize">
                  {widgets.find(w => w.id === selectedWidget)?.type} Properties
                </h2>
                <button 
                  onClick={() => setWidgets(widgets.filter(w => w.id !== selectedWidget))}
                  className={`text-sm ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'}`}
                >
                  Delete
                </button>
              </div>
              
              <div className="space-y-4">
                {widgets.find(w => w.id === selectedWidget)?.type === 'button' && (
                  <>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Text</label>
                      <input
                        type="text"
                        value={widgets.find(w => w.id === selectedWidget)?.props.text || ''}
                        onChange={(e) => updateWidget(selectedWidget, { props: { ...widgets.find(w => w.id === selectedWidget)?.props, text: e.target.value } })}
                        className={`w-full px-3 py-2 rounded text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border`}
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Color</label>
                      <div className="flex space-x-2">
                        {['#4F46E5', '#10B981', '#EF4444', '#F59E0B', '#6B7280'].map(color => (
                          <motion.div
                            key={color}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateWidget(selectedWidget, { props: { ...widgets.find(w => w.id === selectedWidget)?.props, color } })}
                            className={`w-6 h-6 rounded-full cursor-pointer ${widgets.find(w => w.id === selectedWidget)?.props.color === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Size</label>
                      <div className="flex space-x-2">
                        {['sm', 'md', 'lg'].map(size => (
                          <motion.button
                            key={size}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateWidget(selectedWidget, { props: { ...widgets.find(w => w.id === selectedWidget)?.props, size } })}
                            className={`px-3 py-1 rounded text-xs ${widgets.find(w => w.id === selectedWidget)?.props.size === size ? 
                              (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800') : 
                              (darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300')}`}
                          >
                            {size.toUpperCase()}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {widgets.find(w => w.id === selectedWidget)?.type === 'text' && (
                  <>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Text</label>
                      <input
                        type="text"
                        value={widgets.find(w => w.id === selectedWidget)?.props.text || ''}
                        onChange={(e) => updateWidget(selectedWidget, { props: { ...widgets.find(w => w.id === selectedWidget)?.props, text: e.target.value } })}
                        className={`w-full px-3 py-2 rounded text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border`}
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Size</label>
                      <div className="flex space-x-2">
                        {['sm', 'md', 'lg'].map(size => (
                          <motion.button
                            key={size}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateWidget(selectedWidget, { props: { ...widgets.find(w => w.id === selectedWidget)?.props, size } })}
                            className={`px-3 py-1 rounded text-xs ${widgets.find(w => w.id === selectedWidget)?.props.size === size ? 
                              (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800') : 
                              (darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300')}`}
                          >
                            {size.toUpperCase()}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {widgets.find(w => w.id === selectedWidget)?.type === 'container' && (
                  <>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Width</label>
                      <input
                        type="range"
                        min="100"
                        max="500"
                        value={widgets.find(w => w.id === selectedWidget)?.props.width || 200}
                        onChange={(e) => updateWidget(selectedWidget, { props: { ...widgets.find(w => w.id === selectedWidget)?.props, width: parseInt(e.target.value) } })}
                        className="w-full"
                      />
                      <div className="text-right text-xs text-gray-500">
                        {widgets.find(w => w.id === selectedWidget)?.props.width}px
                      </div>
                    </div>
                    
                    <div>
                      <label className={`flex items-center space-x-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <input
                          type="checkbox"
                          checked={widgets.find(w => w.id === selectedWidget)?.props.rounded || false}
                          onChange={(e) => updateWidget(selectedWidget, { props: { ...widgets.find(w => w.id === selectedWidget)?.props, rounded: e.target.checked } })}
                          className="rounded"
                        />
                        <span>Rounded Corners</span>
                      </label>
                    </div>
                  </>
                )}
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Position</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className={`block text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>X</label>
                      <input
                        type="number"
                        value={widgets.find(w => w.id === selectedWidget)?.x || 0}
                        onChange={(e) => updateWidget(selectedWidget, { x: parseInt(e.target.value) || 0 })}
                        className={`w-full px-3 py-2 rounded text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Y</label>
                      <input
                        type="number"
                        value={widgets.find(w => w.id === selectedWidget)?.y || 0}
                        onChange={(e) => updateWidget(selectedWidget, { y: parseInt(e.target.value) || 0 })}
                        className={`w-full px-3 py-2 rounded text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} text-center`}>
              <FiSettings size={24} className="mx-auto mb-2" />
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {widgets.length === 0 ? 'Add a widget to get started' : 'Select a widget to edit its properties'}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Code Preview Modal */}
      <AnimatePresence>
        {showCode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowCode(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className={`w-full max-w-4xl h-3/4 rounded-lg overflow-hidden flex flex-col ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className="font-bold">Generated Code</h3>
                <button 
                  onClick={() => setShowCode(false)}
                  className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                >
                  ✕
                </button>
              </div>
              
              <div className="flex-1 overflow-auto p-4">
                <pre className={`text-sm rounded-lg p-4 overflow-auto ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                  <code>
                    {`import 'package:flutter/material.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FlutterFlow Clone',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          ${widgets.map(widget => {
            switch(widget.type) {
              case 'button':
                return `Positioned(
                  left: ${widget.x}.0,
                  top: ${widget.y}.0,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      primary: Color(0xFF${widget.props.color.slice(1)}),
                      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    ),
                    onPressed: () {},
                    child: Text('${widget.props.text}'),
                  ),
                )`;
              case 'text':
                return `Positioned(
                  left: ${widget.x}.0,
                  top: ${widget.y}.0,
                  child: Text(
                    '${widget.props.text}',
                    style: TextStyle(
                      fontSize: ${widget.props.size === 'sm' ? 14 : widget.props.size === 'md' ? 16 : 18}.0,
                    ),
                  ),
                )`;
              case 'container':
                return `Positioned(
                  left: ${widget.x}.0,
                  top: ${widget.y}.0,
                  child: Container(
                    width: ${widget.props.width}.0,
                    padding: EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: ${darkMode ? 'Colors.grey[800]' : 'Colors.grey[200]'},
                      borderRadius: BorderRadius.circular(${widget.props.rounded ? 8 : 0}.0),
                    ),
                    child: Column(
                      children: [],
                    ),
                  ),
                )`;
              case 'image':
                return `Positioned(
                  left: ${widget.x}.0,
                  top: ${widget.y}.0,
                  child: Container(
                    width: 100.0,
                    height: 100.0,
                    color: ${darkMode ? 'Colors.grey[600]' : 'Colors.grey[300]'},
                    child: Icon(Icons.image, color: ${darkMode ? 'Colors.grey[400]' : 'Colors.grey[600]'}),
                  ),
                )`;
              default:
                return '';
            }
          }).join(',\n          ')}
        ],
      ),
    );
  }
}`}
                  </code>
                </pre>
              </div>
              
              <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-end`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium`}
                >
                  Copy Code
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlutterFlowClone;