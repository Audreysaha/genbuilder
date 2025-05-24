import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiSettings, FiPlay, FiSearch, FiEye, FiBox, FiColumns, FiLayers, FiLayout, FiList, FiMaximize, FiDivide, FiMoreVertical, FiSidebar,FiCheckSquare, FiTable, FiGitBranch, FiPackage, FiType, FiStar, FiVideo, FiLink, FiHexagon, FiAlertCircle, FiPlus, FiMove, FiChevronRight, FiFileText, FiSmartphone, FiTablet, FiMonitor, FiGrid, FiAlignLeft, FiImage, FiAnchor } from 'react-icons/fi';
import { FaMobileAlt, FaTabletAlt, FaLaptop } from 'react-icons/fa';

const FlutterFlowClone = () => {
  const [canvasItems, setCanvasItems] = useState([])
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('widgets');
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [widgets, setWidgets] = useState([]);
  const [deviceSize, setDeviceSize] = useState('mobile');
  const [showCode, setShowCode] = useState(false);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const [topTab, setTopTab] = useState('widgets');

  const [expandedSections, setExpandedSections] = useState({
  visual: false,
  containers: false,
  inputForms: false,
  reusable: false,
});

const handleDragStart = (e, type) => {
  e.dataTransfer.setData('widgetType', type);
};

const handleDrop = (e) => {
    e.preventDefault();
    const widgetType = e.dataTransfer.getData('widgetType');
    setCanvasItems((prev) => [...prev, { id: Date.now(), type: widgetType }]);
  };

const RenderWidget = ({ type }) => {
  switch (type) {
    case 'text':
      return <div className="text-lg font-semibold">Sample Text</div>;
    case 'icon':
      return <FiStar size={24} className="text-yellow-500" />;
    case 'button':
      return <button className="px-4 py-2 bg-blue-500 text-white rounded">Button</button>;
    case 'video':
      return <div className="w-48 h-28 bg-black text-white flex items-center justify-center">Video</div>;
    case 'link':
      return <a href="#" className="text-blue-500 underline">Link</a>;
    case 'shape':
      return <div className="w-16 h-16 bg-indigo-300 rounded-full" />;
    case 'alert':
      return <div className="bg-red-100 text-red-800 p-2 rounded">Alert Box</div>;
    default:
      return null;
  }
};

const visualItems = [
  { type: 'text', label: 'Text', icon: FiType },
  { type: 'icon', label: 'Icon', icon: FiStar },
  { type: 'button', label: 'Button', icon: FiSmartphone },
  { type: 'video', label: 'Video', icon: FiVideo },
  { type: 'link', label: 'Link', icon: FiLink },
  { type: 'shape', label: 'Shape', icon: FiHexagon },
  { type: 'alert', label: 'Alert', icon: FiAlertCircle },
  { type: 'more', label: 'Install more', icon: FiPlus }
];

const [mode, setMode] = useState("Edit");


const toggleSection = (section) => {
  setExpandedSections((prev) => ({
    ...prev,
    [section]: !prev[section],
  }));
};

//for toolbar
const [language, setLanguage] = useState("EN");
  const [langOpen, setLangOpen] = useState(false);

  const toggleLangMenu = () => setLangOpen(!langOpen);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setLangOpen(false);
  };
  const bgColor = darkMode ? "bg-black" : "bg-white";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-200";
  const avatarBg = darkMode ? "bg-gray-800" : "bg-blue-600";
  const textColor = darkMode ? "text-white" : "text-black";
  

const addWidget = (type) => {
    const newWidget = {
      id: Date.now(),
      type,
      x: 100,
      y: 100,
      props: {
        text: type === 'button' ? 'Button' : type === 'text' ? 'Text' : '',
        color: '#4F46E5',
        size: 'md',
        width: type === 'container' ? 200 : 'auto'
      }
    };
    setWidgets([...widgets, newWidget]);
    setSelectedWidget(newWidget.id);
  };

const updateWidget = (id, updates) => {
    setWidgets(widgets.map(w => 
      w.id === id ? { ...w, ...updates } : w
    ));
  };

const renderWidget = (widget) => {
    const isSelected = selectedWidget === widget.id;
    
    const baseStyles = {
      position: 'absolute',
      left: `${widget.x}px`,
      top: `${widget.y}px`,
      border: isSelected ? '2px dashed #4F46E5' : 'none',
      padding: widget.type === 'container' ? '16px' : '0',
      borderRadius: widget.props.rounded ? '8px' : '0',
      backgroundColor: widget.type === 'container' ? (darkMode ? '#374151' : '#E5E7EB') : 'transparent',
      width: widget.props.width === 'auto' ? 'auto' : `${widget.props.width}px`,
      cursor: 'move',
      userSelect: 'none'
    };

    switch (widget.type) {
      case 'button':
        return (
          <motion.div
            style={{
              ...baseStyles,
              backgroundColor: widget.props.color,
              padding: '8px 16px',
              borderRadius: '6px',
              color: 'white',
              textAlign: 'center'
            }}
            drag
            dragMomentum={false}
            onDragEnd={(e, info) => updateWidget(widget.id, { x: widget.x + info.offset.x, y: widget.y + info.offset.y })}
            onClick={() => setSelectedWidget(widget.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {widget.props.text}
          </motion.div>
        );
      case 'text':
        return (
          <motion.div
            style={{
              ...baseStyles,
              color: darkMode ? 'white' : 'black',
              fontSize: widget.props.size === 'sm' ? '14px' : widget.props.size === 'md' ? '16px' : '18px'
            }}
            drag
            dragMomentum={false}
            onDragEnd={(e, info) => updateWidget(widget.id, { x: widget.x + info.offset.x, y: widget.y + info.offset.y })}
            onClick={() => setSelectedWidget(widget.id)}
          >
            {widget.props.text}
          </motion.div>
        );
      case 'container':
        return (
          <motion.div
            style={baseStyles}
            drag
            dragMomentum={false}
            onDragEnd={(e, info) => updateWidget(widget.id, { x: widget.x + info.offset.x, y: widget.y + info.offset.y })}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedWidget(widget.id);
            }}
          >
            <div style={{ minHeight: '60px' }}>
              {widgets.filter(w => w.parentId === widget.id).map(child => renderWidget(child))}
            </div>
          </motion.div>
        );
   
      default:
        return null;
    }
  };


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

const { width, height } = getDeviceDimensions();

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark bg-black text-gray-100' : 'bg-white text-gray-900'}`}>

<div className={`flex items-center p-2 ${bgColor} border-b ${borderColor}`}>
  {/* LEFT SECTION */}
  <div className="flex items-center space-x-3 text-sm">
    {/* Logo */}
    <div className={`w-8 h-8 rounded-full ${avatarBg} flex items-center justify-center text-white mr-2 text-xs`}>
      GB
    </div>

    {/* Search Bar */}
    <div className="relative w-32">
      <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
        {/* Home Icon */}
      </div>
      <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
        {/* Arrows Icon */}
      </div>
      <input
        type="search"
        placeholder="Deals"
        className={`w-full pl-6 pr-6 py-1 rounded border text-xs ${
          darkMode ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                   : "bg-gray-100 border-gray-300 text-black placeholder-gray-600"
        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
      />
    </div>

    {/* Language Selector */}
    <div className="relative">
      <button
        onClick={toggleLangMenu}
        className={`px-1 py-0.5 border rounded text-xs ${
          darkMode ? "bg-gray-800 border-gray-600 text-white"
                   : "bg-gray-100 border-gray-300 text-black"
        } flex items-center space-x-1`}
      >
        {/* Globe icon */}
        <svg className="w-3 h-3" /* globe svg */ />
        <span>{language}</span>
        <svg className={`w-3 h-3 ${langOpen ? "rotate-180" : ""}`} /* arrow svg */ />
      </button>
      {langOpen && (
        <ul className={`absolute mt-1 rounded shadow-lg w-full z-10 text-xs ${
          darkMode ? "bg-gray-900 text-white border-gray-700"
                   : "bg-white text-black border-gray-300"
        }`}>
          {["en", "span", "fr"].map((lang) => (
            <li
              key={lang}
              onClick={() => changeLanguage(lang)}
              className="px-3 py-1 hover:bg-indigo-500 hover:text-white cursor-pointer"
            >
              {lang}
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Add Button */}
    <button
      className={`rounded border text-xs font-medium px-2 py-0.5 flex items-center space-x-1 ${
        darkMode ? "bg-gray-800 border-gray-600 text-indigo-400 hover:bg-gray-700"
                 : "bg-indigo-200 border-indigo-700 text-indigo-700 hover:bg-indigo-300"
      }`}
    >
      <svg className="w-3 h-3" /* plus icon */ />
      <span>Add</span>
    </button>

    {/* Navigation Buttons */}
    <div className="flex space-x-1">
      {["Assets", "Plugins", "Auth", "Backend", "More"].map((item) => (
        <button
          key={item}
          className={`px-2 py-0.5 rounded border text-xs font-medium ${
            darkMode ? "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                     : "bg-gray-100 border-gray-300 text-black hover:bg-gray-200"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  </div>

  {/* SPACER */}
  <div className="flex-grow" />

  {/* RIGHT SECTION */}
  <div className="flex items-center space-x-4">
    {/* Device Size Buttons */}
    <div className="flex space-x-1">
      {[
        { icon: <FaMobileAlt size={14} />, type: "mobile" },
        { icon: <FaTabletAlt size={14} />, type: "tablet" },
        { icon: <FaLaptop size={14} />, type: "desktop" }
      ].map(({ icon, type }) => (
        <button
          key={type}
          onClick={() => setDeviceSize(type)}
          className={`p-1 rounded ${
            deviceSize === type
              ? darkMode ? "bg-black text-white" : "bg-blue-100 text-blue-800"
              : darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
          }`}
          title={type}
        >
          {icon}
        </button>
      ))}
    </div>

    {/* Zoom Controls */}
    <div className="flex items-center space-x-1 text-xs">
      <button
        onClick={() => setZoom(Math.max(50, zoom - 10))}
        className={`px-2 py-1 rounded ${
          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
        }`}
        title="Zoom Out"
      >
        -
      </button>
      <span>{zoom}%</span>
      <button
        onClick={() => setZoom(Math.min(150, zoom + 10))}
        className={`px-2 py-1 rounded ${
          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
        }`}
        title="Zoom In"
      >
        +
      </button>
    </div>

    {/* Dark Mode Toggle */}
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`p-1.5 rounded-full ${
        darkMode ? "bg-gray-700 text-yellow-300" : "bg-gray-200 text-gray-700"
      }`}
      title="Toggle Dark Mode"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>


    {/* Mode Toggle: AI / Edit */}
<div className="flex border rounded-full text-xs font-medium overflow-hidden">
  <button
    onClick={() => setMode("AI")}
    className={`px-3 py-1 transition ${
      mode === "AI"
        ? darkMode ? "bg-indigo-600 text-white" : "bg-indigo-200 text-indigo-800"
        : darkMode ? "bg-gray-700 text-gray-300" : "bg-white text-gray-600"
    }`}
  >
    AI
  </button>
  <button
    onClick={() => setMode("Edit")}
    className={`px-3 py-1 transition ${
      mode === "Edit"
        ? darkMode ? "bg-indigo-600 text-white" : "bg-indigo-200 text-indigo-800"
        : darkMode ? "bg-gray-700 text-gray-300" : "bg-white text-gray-600"
    }`}
  >
    Edit
  </button>
</div>


    {/* Preview Button */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center ${
        darkMode ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
      } text-white`}
    >
      <FiPlay className="mr-1" />
      Preview
    </motion.button>

    {/* Deploy Button */}
    <button
      className={`px-4 py-1.5 rounded-md text-xs font-semibold ${
        darkMode ? "bg-purple-600 hover:bg-purple-700 text-white"
                 : "bg-purple-500 hover:bg-purple-600 text-white"
      }`}
    >
      Deploy
    </button>
  </div>
</div>

      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - 1st left panel */}   
        <div className={`w-16 ${darkMode ? 'bg-gray-500' : 'bg-white'} border-r ${darkMode ? 'border-gray-500' : 'border-gray-200'} flex flex-col items-center py-4 space-y-4`}>
          <button 
            onClick={() => setActiveTab('widgets')}
            className={`p-3 rounded-lg ${activeTab === 'widgets' ? (darkMode ? 'bg-blue-600' : 'bg-blue-100 text-blue-800') : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200')}`}
          >
            <FiGrid size={20} />
          </button>
          <button 
            onClick={() => setActiveTab('layers')}
            className={`p-3 rounded-lg ${activeTab === 'layers' ? (darkMode ? 'bg-blue-600' : 'bg-blue-100 text-blue-800') : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200')}`}
          >
            <FiLayers size={20} />
          </button>
          <button 
            onClick={() => setShowCode(!showCode)}
            className={`p-3 rounded-lg ${showCode ? (darkMode ? 'bg-blue-600' : 'bg-blue-100 text-blue-800') : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200')}`}
          >
            <FiCode size={20} />
          </button>
        </div>
        
      {/* Second left siderbar */}
        {activeTab === 'widgets' && (
        <div className={`w-64 h-full flex flex-col ${darkMode ? 'bg-gray-600' : 'bg-white'} border-r ${darkMode ? 'border-gray-500' : 'border-gray-200'} overflow-hidden`}>
    
       {/* Row 1: UI Builder, Responsive*/}
<div className="border-b border-gray-300 flex">
  {['UI Builder', 'Responsive'].map(tab => (
    <div
      key={tab}
      onClick={() => setTopTab(tab)}
      className={`
        px-2 py-1 cursor-pointer text-[15px] capitalize transition-all
        ${topTab === tab 
          ? 'text-blue-500 border-b-2 border-blue-500' 
          : darkMode 
            ? 'text-white border-b-2 border-transparent' 
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
        className={`w-full bg-transparent outline-none text-sm ${darkMode ? 'text-white placeholder-gray-400' : 'text-black placeholder-gray-400'}`}
      />
    </div>

    {/* Row 3: Elements Tree */}
    <div className="p-2 border-b border-gray-100 flex items-center justify-between text-sm font-bold">
  <span>Elements Tree</span>
  <div className="flex items-center space-x-2 text-gray-600">
    <FiEye className="cursor-pointer hover:text-gray-400" size={16} />
    <FiMove className="cursor-pointer hover:text-gray-400" size={16} />
  </div>
</div>

    {/* Row 4: Index */}
<div className={`p-2 border-b border-indigo-100 flex items-center space-x-1 text-sm font-medium ${darkMode ? 'bg-indigo-00 text-white' : 'bg-indigo-100 text-blue-800'}`}>
  <FiFileText size={16} />
  <span>index</span>
</div>

    {/* Row 5: Search Assets */}
    <div className="p-2 border-b border-gray-300 text-sm font-medium flex items-center space-x-2">
       <FiSearch size={18} />
       <input 
        type="text" 
        placeholder="Search assets" 
        className={`w-full bg-transparent outline-none text-m ${darkMode ? 'text-white placeholder-gray-400' : 'text-black placeholder-gray-400'}`}
      />
    </div>


<div className="h-full flex flex-col">
<div className="flex-1 overflow-y-auto custom-scrollbar">
  
    {/* Visual Elements */}
<div className="border-b border-gray-300">
  <div
    className="p-3 flex items-center cursor-pointer hover:bg-indigo-500 hover:text-black"
    onClick={() => toggleSection('visual')}
  >
    <FiChevronRight
      className={`mr-2 transition-transform duration-200 ${
        expandedSections.visual ? 'rotate-90' : 'rotate-0'
      }`}
      size={14}
    />
    <span className="text-sm font-bold">Visual Elements</span>
  </div>
  {expandedSections.visual && (
    <div className="px-4 pb-3 space-y-2 text-sm text-gray-800 dark:text-gray-300">
      {visualItems.map(({ type, label, icon: Icon }) => (
        <div
          key={type}
          draggable
          onDragStart={(e) => handleDragStart(e, type)}
          className="flex items-center cursor-grab p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Icon className="mr-2 text-indigo-700" size={16} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  )}
</div>


{/* Layout */}
<div className="border-b border-gray-300">
  <div
    className="p-3 flex items-center cursor-pointer hover:bg-indigo-500"
    onClick={() => toggleSection('containers')}
  >
    <FiChevronRight
      className={`mr-2 transition-transform duration-200 ${
        expandedSections.containers ? 'rotate-90' : 'rotate-0'
      }`}
      size={14}
    />
    <span className="text-sm font-bold">Layout Elements</span>
  </div>

  {expandedSections.containers && (
    <div className="px-4 pb-3 space-y-2 text-sm text-gray">
      {[
        { type: 'container', label: 'Container', icon: <FiBox /> },
        { type: 'row', label: 'Row', icon: <FiColumns /> },
        { type: 'column', label: 'Column', icon: <FiSidebar /> },
        { type: 'stack', label: 'Stack', icon: <FiLayers /> },
        { type: 'card', label: 'Card', icon: <FiLayout /> },
        { type: 'listview', label: 'Listview', icon: <FiList /> },
        { type: 'cardview', label: 'CardView', icon: <FiGrid /> },
        { type: 'spacer', label: 'Spacer', icon: <FiMaximize /> },
        { type: 'divider', label: 'Divider', icon: <FiDivide /> },
        { type: 'verticaldivider', label: 'Vertical Divider', icon: <FiMoreVertical /> },
        { type: 'tabbar', label: 'TabBar', icon: <FiSidebar /> },
        { type: 'pageview', label: 'PageView', icon: <FiLayout /> },
        { type: 'formvalidation', label: 'Form Validation', icon: <FiCheckSquare /> },
        { type: 'datatable', label: 'Data Table', icon: <FiTable /> },
        { type: 'wrap', label: 'Wrap', icon: <FiGitBranch /> },
        { type: 'staggeredview', label: 'StaggeredView', icon: <FiPackage /> }
      ].map(({ type, label, icon }) => (
        <div
          key={type}
          draggable
          onDragStart={(e) => e.dataTransfer.setData('widgetType', type)}
          className="flex items-center gap-2 p-2 hover:bg-gray-250 rounded cursor-grab"
        >
          <div className="text-indigo-700">{icon}</div>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )}
</div>


{/* Input Forms */}
<div className="border-b border-gray-300">
  <div
    className="p-3 flex items-center  cursor-pointer hover:bg-indigo-500"
    onClick={() => toggleSection('inputForms')}
  >
  <FiChevronRight
      className={`mr-2 transition-transform duration-200 ${
        expandedSections.visual ? 'rotate-90' : 'rotate-0'
      }`}
      size={14}
    />
    <span className="text-sm font-bold">Input Forms</span>
  </div>
  {expandedSections.inputForms && (
    <div className="px-4 pb-3 space-y-2 text-sm text-gray-400">
      <div>Text Field</div>
      <div>Checkbox</div>
      <div>Radio</div>
      <div>Dropdown</div>
    </div>
  )}
</div>

{/* Reusable Elements */}
<div className="border-b border-gray-300">
  <div
    className="p-3 flex items-center cursor-pointer hover:bg-indigo-500"
    onClick={() => toggleSection('reusable')}
  >
    <FiChevronRight
      className={`mr-2 transition-transform duration-200 ${
        expandedSections.reusable ? 'rotate-90' : 'rotate-0'
      }`}
      size={14}
    />
    <span className="text-sm font-bold">Reusable Elements</span>
  </div>

  {expandedSections.reusable && (
    <div className="px-6 pb-3 space-y-2 text-sm text-gray-400">
      <div>Header</div>
      <div>Footer</div>
      <div>Navbar</div>
    </div>
  )}
</div>
</div>
</div>




    {/* Row 6: Builder Tools (flex-grow) */}
      <h3 className="text-sm font-medium mb-2">Layout</h3>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => addWidget('container')}
        className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} cursor-pointer flex items-center mb-2`}
      >
        <div className={`w-8 h-8 rounded ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} flex items-center justify-center mr-3`}>
          <FiGrid size={16} />
        </div>
        <span>Container</span>
      </motion.div>

      <h3 className="text-sm font-medium mt-4 mb-2">Basic</h3>

      {/* Button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => addWidget('button')}
        className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} cursor-pointer flex items-center mb-2`}
      >
        <div className={`w-8 h-8 rounded ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} flex items-center justify-center text-white mr-3`}>
          <FiAnchor size={16} />
        </div>
        <span>Button</span>
      </motion.div>

      {/* Text */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => addWidget('text')}
        className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} cursor-pointer flex items-center mb-2`}
      >
        <div className={`w-8 h-8 rounded ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} flex items-center justify-center mr-3`}>
          <FiAlignLeft size={16} />
        </div>
        <span>Text</span>
      </motion.div>

      {/* Image */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => addWidget('image')}
        className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} cursor-pointer flex items-center`}
      >
        <div className={`w-8 h-8 rounded ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} flex items-center justify-center mr-3`}>
          <FiImage size={16} />
        </div>
        <span>Image</span>
      </motion.div>
    </div>
)}

        
        {activeTab === 'layers' && (
          <div className={`w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4 overflow-y-auto`}>
            <h2 className="font-bold mb-4">Layers</h2>
            <div className="space-y-1">
              {widgets.length === 0 ? (
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No widgets added yet</p>
              ) : (
                widgets.map(widget => (
                  <motion.div
                    key={widget.id}
                    whileHover={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
                    onClick={() => setSelectedWidget(widget.id)}
                    className={`p-2 rounded cursor-pointer flex items-center ${selectedWidget === widget.id ? (darkMode ? 'bg-blue-600' : 'bg-blue-100 text-blue-800') : ''}`}
                  >
                    {widget.type === 'button' && <FiAnchor className="mr-2" />}
                    {widget.type === 'text' && <FiAlignLeft className="mr-2" />}
                    {widget.type === 'container' && <FiGrid className="mr-2" />}
                    {widget.type === 'image' && <FiImage className="mr-2" />}
                    <span className="text-sm capitalize">{widget.type}</span>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}
        
        {/* Main Canvas Area */}
        <div 
          className="flex-1 overflow-auto p-8 flex items-center justify-center" 
          onClick={() => setSelectedWidget(null)}
          style={{ backgroundColor: darkMode ? '#111827' : '#F3F4F6' }}
        >
          <div 
            className={`relative ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
            style={{ 
              width: `${width * zoom / 100}px`, 
              height: `${height * zoom / 100}px`,
              transformOrigin: 'center center'
            }}
          >
            <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="flex-1 min-h-[400px] bg-white border border-dashed border-gray-400 p-6"
             >
          {canvasItems.map((item) => (
     <RenderWidget key={item.id} type={item.type} />
  ))}
</div>
            {widgets.map(widget => renderWidget(widget))}
          </div>
        </div>
        
        {/* Right Sidebar - Properties Panel */}
        <div className={`w-80 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-l ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4 overflow-y-auto`}>
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