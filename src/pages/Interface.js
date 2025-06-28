import { useEffect, useRef, useState } from "react";
import { FaCreditCard, FaEllipsisV, FaEllipsisH } from "react-icons/fa";
import { HiH1, HiH2, HiH3, HiLink, HiWindow } from "react-icons/hi2";
import {
  FiColumns,
  FiCheckSquare,
  FiType,
  FiSearch,
  FiSend,
  FiEdit,
  FiChevronDown,
  FiSidebar,
  FiVideo,
  FiGrid,
  FiImage,
  FiList,
  FiSquare,
  FiStar,
} from "react-icons/fi";
import Canvas from "../components/Canvas";
import SidebarBuilder from "../components/SidebarBuilder";
import SidebarProperties from "../components/SidebarPropeties";
import Navbar from "../components/Navbar";
import HTMLPreviewModal from "../components/HTMLPreviewModal";
import Chat from "./Chat";
import { useParams } from "react-router-dom";
import API from "../utils/API";

const FlutterFlowClone = () => {
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
        return { width: 555, height: 540 };
      case "desktop":
        return { width: 1655, height: 490 };
      default:
        return { width: 375, height: 667 };
    }
  };

  const visualItems = [
    { type: "submit-button", label: "Submit", icon: FiSend },
    { type: "textfield", label: "TextField", icon: FiEdit },
    { type: "text", label: "Text", icon: FiType },
    { type: "checkbox", label: "Checkbox", icon: FiCheckSquare },
    { type: "icon", label: "Icon", icon: FiStar },
    { type: "dropdown", label: "Dropdown", icon: FiChevronDown },
    { type: "search", label: "Search", icon: FiSearch },
    { type: "list", label: "List", icon: FiList },
  ];

  const layoutElements = [
    { type: "container", label: "Container", icon: FiSquare },
    { type: "grid", label: "Grid", icon: FiGrid },
    { type: "div", label: "Div", icon: FiColumns },
    { type: "H flex", label: "H flex", icon: FaEllipsisH },
    { type: "V flex", label: "V flex", icon: FaEllipsisV },
    { type: "sidebar", label: "SideBar", icon: FiSidebar },
    { type: "card", label: "Cards", icon: FaCreditCard },
    { type: "NavBar", label: "NavBar", icon: HiWindow },
  ];

  const topographyElements = [
    { type: "H1", label: "H1", icon: HiH1 },
    { type: "H2", label: "H2", icon: HiH2 },
    { type: "H3", label: "H3", icon: HiH3 },
    { type: "Link", label: "Links", icon: HiLink },
    { type: "H1", label: "" },
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
      // Topography
      case "heading":
        newItem.props = { content: "Titre", fontSize: 24 };
        break;
      case "paragraph":
        newItem.props = { content: "Paragraphe", fontSize: 16 };
        break;

      // Media
      case "image":
        newItem.props = {
          src: "https://via.placeholder.com/150",
          alt: "Image",
        };
        break;
      case "video":
        newItem.props = { src: "https://www.youtube.com/embed/dQw4w9WgXcQ" };
        break;

      // Form Elements
      case "textfield":
        newItem.props = { placeholder: "Entrer du texte...", value: "" };
        break;
      case "submit-button":
        newItem.props = { label: "Envoyer" };
        break;
      case "checkbox":
        newItem.props = { label: "Accepter les termes", checked: false };
        break;
      case "dropdown":
        newItem.props = {
          options: ["Option 1", "Option 2", "Option 3"],
          selected: "Option 1",
        };
        break;
      case "search":
        newItem.props = { placeholder: "Rechercher...", value: "" };
        break;

      // Layout
      case "grid":
        newItem.props = { columns: 2 };
        break;
      case "headers":
        newItem.props = { content: "En-tête" };
        break;
      case "footer":
        newItem.props = { content: "Pied de page" };
        break;
      case "sidepanel":
        newItem.props = { content: "Panneau latéral" };
        break;
      case "card":
        newItem.props = { content: "Carte" };
        break;

      // Navigation
      case "navbar":
        newItem.props = { items: ["Accueil", "À propos", "Contact"] };
        break;
      case "sidebar":
        newItem.props = { items: ["Menu 1", "Menu 2", "Menu 3"] };
        break;
      case "tabs":
        newItem.props = { tabs: ["Tab 1", "Tab 2"], activeTab: "Tab 1" };
        break;
      case "breadcrumbs":
        newItem.props = { path: ["Accueil", "Section", "Page"] };
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

  function handleAddProjectPages(projectpageName) {
    api
      .postData(
        api.apiUrl + `/api/project/${projectId}/pages`,
        {
          name: projectpageName,
        },
        false
      )
      .then((res) => {
        fetchProject();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  useEffect(() => {
    if (!projectId) {
      setError("No ID provided.");
      setLoading(false);
      return;
    }
    fetchProject();
  }, [projectId]);

  useEffect(() => {
    if(project){
      setActivePageId(
        project?.pages.filter((pag) => pag.id == activePageId)[0].id
      );
      if (device === "mobile") {
        setCanvasItems(project?.pages.filter((pag) => pag.id == activePageId)[0].canvasMobile);
        setActivePageId(project?.pages.filter((pag) => pag.id == activePageId)[0].id);
        setProjectPages(
          project?.pages?.map((page) => {
            return {
              id: page.id,
              name: page.name,
            };
          })
        );
      } else if (device === "web") {
        setCanvasItems(project?.pages.filter((pag) => pag.id == activePageId)[0].canvasWeb);
        setActivePageId(project?.pages.filter((pag) => pag.id == activePageId)[0].id);
        setProjectPages(
          project?.pages.map((page) => {
            return {
              id: page.id,
              name: page.name,
            };
          })
        );
      }
    }
  }, [activePageId, device]);

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
        canvasItems={canvasItems}
        activePageId={activePageId}
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
          projectPages={projectPages}
          activePageId={activePageId}
          onSelectPage={setActivePageId}
          handleAddProjectPages={handleAddProjectPages}
          fetchProject={fetchProject}
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

        {mode === "Edit" ? (
          <SidebarProperties item={selectedWidget} onUpdate={updateItem} />
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

export default FlutterFlowClone;
