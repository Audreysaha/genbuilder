import React, { useEffect, useRef, useState } from "react";
import { HiH1,HiH2,HiH3,HiWindow } from "react-icons/hi2";
import { IoIosRadioButtonOff } from "react-icons/io";
import { PiToggleLeftFill} from "react-icons/pi";
import { TbLayoutNavbarExpand } from "react-icons/tb";
import { RiRadioButtonLine,RiH4,RiH5 } from "react-icons/ri";
import { TiTabsOutline } from "react-icons/ti";
import { FiCheckSquare, FiType, FiSearch, FiSend, FiEdit,FiChevronDown,FiSidebar,FiVideo,FiGrid,FiImage,FiList,FiSquare,FiStar} from "react-icons/fi";
import Canvas from "../components/Canvas";
import SidebarBuilder from "../components/SidebarBuilder";
import SidebarProperties from "../components/SidebarPropeties";
import Navbar from "../components/Navbar";
import HTMLPreviewModal from "../components/HTMLPreviewModal";
import Chat from "./Chat";
import { useParams } from "react-router-dom";
import API from "../utils/API";

const Interface = () => {
  const [canvasItems, setCanvasItems] = useState([]);
  const [darkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("widgets");
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [deviceSize, setDeviceSize] = useState("desktop");
  const [showCode, setShowCode] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [mode, setMode] = useState("Edit");
  const [device, setDevice] = useState("web");
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activePageId, setActivePageId] = useState("");
  const [projectPages, setProjectPages] = useState([]);

  const api = new API();
  const { projectId } = useParams();

  const canvasRef = useRef();

  const handleUndoClick = () => {
    canvasRef.current?.undo();
  };
  const handleRedoClick = () => {
    canvasRef.current?.redo();
  };

  const handleSelectWidget = (widgetId) => {
    const widget = canvasItems.find((w) => w.id === widgetId);
    setSelectedWidget(widget || null);
  };

  const getDeviceDimensions = () => {
    switch (deviceSize) {
      case "mobile":
        return { width: 375, height: 540 };
      case "tablet":
        return { width: 675, height: 570 };
      case "desktop":
        return { width: 1655, height: 620 };
      default:
        return { width: 555, height: 767 };
    }
  };
const handleRefreshCanvas = () => setCanvasItems([]);

  const visualItems = [
    { type: "submit-button", label: "Submit", icon: FiSend },
    { type: "textfield", label: "TextField", icon: FiEdit },
    { type: "text", label: "Text", icon: FiType },
    { type: "checkbox", label: "Checkbox", icon: FiCheckSquare },
    { type: "icon", label: "Icon", icon: FiStar },
    { type: "dropdown", label: "Dropdown", icon: FiChevronDown },
    { type: "search", label: "Search", icon: FiSearch },
    { type: "list", label: "List", icon: FiList },
    { type: "radio-button", label: "Radio-btn", icon: () => <RiRadioButtonLine size={32} stroke={1} className="text-indigo-600 dark:text-indigo-400"/> },
    { type: "radio-button2", label: "Radio-btn2", icon: IoIosRadioButtonOff },
    { type: "toggle-button", label: "Toggle-btn", icon: PiToggleLeftFill },
  ];

  const layoutElements = [
    { type: "container", label: "Container", icon: FiSquare },
    { type: "grid", label: "Grid", icon: FiGrid },
    { type: "sidebar", label: "SideBar", icon: FiSidebar },
    { type: "footer", label: "Footer", icon:TbLayoutNavbarExpand}, 
    { type: "navbar", label: "NavBar", icon:HiWindow },
    { type: "tabs", label: "Tabs", icon: () => <TiTabsOutline  size={32} stroke={1} className="text-indigo-600 dark:text-indigo-400"/>},
  ];

  const topographyElements = [
    { type: "H1", label: "H1", icon: HiH1 },
    { type: "H2", label: "H2", icon: HiH2 },
    { type: "H3", label: "H3", icon: HiH3 },
    { type: "H4", label: "H4", icon: RiH4},
    { type: "H5", label: "H5", icon: RiH5 },

  ];

  const mediaElements = [
    { type: "image", label: "Images", icon: FiImage },
    { type: "video", label: "Videos", icon: FiVideo },
  ];

  // Sections extensibles
  const [expandedSections, setExpandedSections] = useState({
    topographyElements: true,
    inputControls: true,
    layoutElements: true,
    mediaElements: true,
  });

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const addComponentToCanvas = (componentType) => {
    const baseItem = {
      id: Date.now(),
      type: componentType,
      x: 50,
      y: 50,
      width: 200,
      height: 100,
      props: {},
    };

    let newItem = { ...baseItem };

    switch (componentType) {
      // Media
      case "image":
        newItem.props = {
          src: componentType.props?.src || "https://via.placeholder.com/150",
          alt: componentType.props?.alt || "Image",
        };
        break;
      case "video":
        newItem.props = {  src: componentType.props?.src || "https://www.youtube.com/embed/dQw4w9WgXcQ" };
        break;

      // Form Elements
      case "textfield":
        newItem.props = { placeholder: "Enter text...", value: "" };
        break;
      case "submit-button":
        newItem.props = { label: "Send" };
        break;
      case "checkbox":
        newItem.props = { label: "Accept terms", checked: false };
        break;
      case "dropdown":
        newItem.props = {
          options: ["Option 1", "Option 2", "Option 3"],
          selected: "Option 1",
        };
        break;

      case "search":
        newItem.props = { placeholder: "Search...", value: "" };
        break;

      case "radio-button":
      newItem.props = {label: "Radio Option",checked: false,name: `radio-group-${Date.now()}`};
      break;

      case "radio-button2": newItem.props = { label: "Radio Option", checked: false, name: `radio-group-${Date.now()}` };
      break;

      // Layout
      case "grid":
        newItem.props = { columns: 2 };
        break;
      case "navbar":
        newItem.props = { items: ["Accueil", "À propos", "Contact"] };
        break;
      case "sidepanel":
        newItem.props = { content: "Panneau latéral" };
        break;
      case "toggle-button":
      newItem.props = { label: "Toggle", checked: false };
      break;
      case "footer": newItem.props = { content: "Footer content here",backgroundColor: "#f3f4f6", textColor: "#111827", height: 60};
      break;
      case "Piechart":
      newItem.props = {
        data: [
      { label: "A", value: 40, color: "#6366f1" },
      { label: "B", value: 30, color: "#f59e42" },
      { label: "C", value: 20, color: "#10b981" },
      { label: "D", value: 10, color: "#ef4444" }
    ],
    width: 180,
    height: 180
  };
  break;

      default:
        newItem.props = { content: "Composant" };
    }

    setCanvasItems((prev) => [...prev, newItem]);
  };

  const [showResponsivePanel, setShowResponsivePanel] = useState(false);

  const [topTab, setTopTab] = useState("widgets");

  const { width, height } = getDeviceDimensions();

  const updateItem = (id, updatedAttributes) => {
    setCanvasItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...updatedAttributes } : item
      )
    );

    if (selectedWidget?.id === id) {
      setSelectedWidget((prev) => ({ ...prev, ...updatedAttributes }));
    }
  };

  useEffect(() => {
    if (selectedWidget) {
      const updated = canvasItems.find((item) => item.id === selectedWidget.id);
      if (updated && updated !== selectedWidget) {
        setSelectedWidget(updated);
      }
    }
  }, [canvasItems]);

  useEffect(() => {
    if (!projectId) {
      setError("No ID provided.");
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        const res = await api.getData(
          api.apiUrl + `/api/project/load/${projectId}`
        );
        if (!res) {
          throw new Error("Projet not FOUND.");
        }
        setProject(res);
        if (res.pages?.length) {
          if (device === "mobile") {
            setCanvasItems(res.pages[0].canvasMobile);
            setActivePageId(res.pages[0].id);
            setProjectPages(
              res.pages?.map((page) => {
                return {
                  id: page.id,
                  name: page.name,
                };
              })
            );
          } else if (device === "web") {
            setCanvasItems(res.pages[0].canvasWeb);
            setActivePageId(res.pages[0].id);
            setProjectPages(
              res.pages?.map((page) => {
                return {
                  id: page.id,
                  name: page.name,
                };
              })
            );
          }
        }
      } catch (err) {
        console.error(err);
        setError("ERROR when loading projet.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, device]);

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900">
      {/* Navigation Bar */}
      <Navbar
        zoom={zoom}
        setZoom={setZoom}
        showCode={showCode}
        setShowCode={setShowCode}
        deviceSize={deviceSize}
        setDeviceSize={setDeviceSize}
        handleUndoClick={handleUndoClick}
        handleRedoClick={handleRedoClick}
        mode={mode}
        setMode={setMode}
        setDevice={setDevice}
        handleRefreshCanvas={handleRefreshCanvas}
                onRefreshCanvas={handleRefreshCanvas}

      />

      {/* Left Sidebar + Canvas + Right Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <SidebarBuilder
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          topTab={topTab}
          darkMode={darkMode}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          visualItems={visualItems}
          mediaElements={mediaElements}
          layoutElements={layoutElements}
          topographyElements={topographyElements}
          addComponentToCanvas={addComponentToCanvas}
          projectPages={projectPages} // <- array: [{ id, name }]
          activePageId={activePageId}
          onSelectPage={setActivePageId}
        />

        <Canvas
          projectId={projectId}
          ref={canvasRef}
          width={width}
          height={height}
          zoom={zoom}
          deviceSize={deviceSize}
          device={device}
          project={project}
          activePageId={activePageId}
          canvasItems={canvasItems}
          setCanvasItems={setCanvasItems}
          addComponentToCanvas={addComponentToCanvas}
          onSelectWidget={handleSelectWidget}
        />

      {
        mode === "Edit" ? (
          <SidebarProperties item={selectedWidget} onUpdate={updateItem} setCanvasItems={setCanvasItems} />
        ) : (
          <Chat />
        )}
      </div>

      <HTMLPreviewModal
        show={showCode}
        onClose={() => setShowCode(false)}
        widgets={canvasItems}
      />
    </div>
  );
};

export default Interface;
