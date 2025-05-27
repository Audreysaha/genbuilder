import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiColumns, FiCheckSquare, FiType, FiSearch, FiSend, FiEdit2, FiChevronDown, FiNavigation, FiCornerDownRight, FiLayout, FiHash, FiSidebar, FiCreditCard, FiVideo, FiGrid, FiAlignLeft, FiImage, } from 'react-icons/fi';
import Canvas from '../components/Canvas';
import SidebarBuilder from '../components/SidebarBuilder';
import SidebarProperties from '../components/SidebarPropeties';
import Navbar from '../components/Navbar';

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

// layoutElements
const layoutElements = [
  { type: 'grid', label: 'Grids / Columns', icon: FiColumns },
  { type: 'headers', label: 'Headers', icon: FiType },
  { type: 'footer', label: 'Footer', icon: FiLayout },
  { type: 'sidepanel', label: 'Side Panels', icon: FiSidebar },
  { type: 'card', label: 'Cards', icon: FiCreditCard },
];

// topographyElements
const topographyElements = [
  { type: 'heading', label: 'Headings', icon: FiHash },
  { type: 'paragraph', label: 'Paragraph', icon: FiAlignLeft },
  { type: 'image', label: 'Images', icon: FiImage },
  { type: 'video', label: 'Videos', icon: FiVideo },
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
  const addComponentToCanvas = (componentType) => {
    const newItem = {
      id: Date.now(),
      type: componentType,
      x: 50,
      y: 50,
      width: 200,
      height: 100,
      content:
        componentType === "heading"
          ? "Titre"
          : componentType === "paragraph"
          ? "Paragraphe"
          : "",
    };
    setCanvasItems((prev) => [...prev, newItem]);
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
      <Navbar
        zoom={zoom}
        setZoom={setZoom}
        deviceSize={deviceSize}
        setDeviceSize={setDeviceSize}
      />


      {/* LEFT SIDE BAR*/}
      <div className="flex flex-1 overflow-hidden">
      <SidebarBuilder
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showCode={showCode}
        setShowCode={setShowCode}
        topTab={topTab}
        handleTabClick={handleTabClick}
        darkMode={darkMode}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        visualItems={visualItems}
        navigationalItems={navigationalItems}
        layoutElements={layoutElements}
        topographyElements={topographyElements}
      />



        {/* Main Canvas Area */}
        <Canvas
          width={width}
          height={height}
          zoom={zoom}
          canvasItems={canvasItems}
          setCanvasItems={setCanvasItems}
          addComponentToCanvas={addComponentToCanvas}
        />


        {/* Right Sidebar - Properties Panel */}
        <SidebarProperties
        selectedWidget={selectedWidget}
        widgets={widgets}
        setWidgets={setWidgets}
        updateWidget={updateWidget}
        darkMode={darkMode}
        />
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
                                        switch (widget.type) {
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