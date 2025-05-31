import React, { useRef, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
import { FiColumns, FiCheckSquare, FiType, FiSearch, FiSend, FiEdit2, FiChevronDown, FiNavigation, FiCornerDownRight, FiLayout, FiHash, FiSidebar, FiCreditCard, FiVideo, FiGrid, FiAlignLeft, FiImage, } from 'react-icons/fi';
import Canvas from '../components/Canvas';
import SidebarBuilder from '../components/SidebarBuilder';
import SidebarProperties from '../components/SidebarPropeties';
import Navbar from '../components/Navbar';
import HTMLPreviewModal from '../components/HTMLPreviewModal';

const FlutterFlowClone = () => {
  const [canvasItems, setCanvasItems] = useState([]);
  const [darkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('widgets');
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [deviceSize, setDeviceSize] = useState('mobile');
  const [showCode, setShowCode] = useState(false);
  const [zoom, setZoom] = useState(100);

  const canvasRef = useRef();

  // Undo / Redo handlers
  const handleUndoClick = () => {
    canvasRef.current?.undo();
  };
  const handleRedoClick = () => {
    canvasRef.current?.redo();
  };

  // Sélection d'un widget dans le canvas
  const handleSelectWidget = (widgetId) => {
    const widget = canvasItems.find((w) => w.id === widgetId);
    setSelectedWidget(widget || null);
  };

  // Dimensions selon l'appareil sélectionné
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

  // Listes d'éléments par catégorie
  const visualItems = [
    { type: 'submit-button', label: 'Submit Button', icon: FiSend },
    { type: 'textfield', label: 'Text Field', icon: FiEdit2 },
    { type: 'checkbox', label: 'Checkbox', icon: FiCheckSquare },
    { type: 'dropdown', label: 'Dropdown List', icon: FiChevronDown },
    { type: 'search', label: 'Search Field', icon: FiSearch },
  ];

  const navigationalItems = [
    { type: 'navbar', label: 'Navigation Bar', icon: FiNavigation },
    { type: 'sidebar', label: 'Sidebar', icon: FiSidebar },
    { type: 'tabs', label: 'Tabs', icon: FiGrid },
    { type: 'breadcrumbs', label: 'Breadcrumbs', icon: FiCornerDownRight },
  ];

  const layoutElements = [
    { type: 'grid', label: 'Grids / Columns', icon: FiColumns },
    { type: 'headers', label: 'Headers', icon: FiType },
    { type: 'footer', label: 'Footer', icon: FiLayout },
    { type: 'sidepanel', label: 'Side Panels', icon: FiSidebar },
    { type: 'card', label: 'Cards', icon: FiCreditCard },
  ];

  const topographyElements = [
    { type: 'heading', label: 'Headings', icon: FiHash },
    { type: 'paragraph', label: 'Paragraph', icon: FiAlignLeft },
    { type: 'image', label: 'Images', icon: FiImage },
    { type: 'video', label: 'Videos', icon: FiVideo },
  ];

  // Sections extensibles
  const [expandedSections, setExpandedSections] = useState({
    topographyElements: true,
  });

  // Toggle d'une section
  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Ajout d'un composant dans le canvas
  const addComponentToCanvas = (componentType) => {
    const baseItem = {
      id: Date.now(),
      type: componentType,
      x: 50,
      y: 50,
      width: 200,
      height: 100,
      props: {}, // on centralise les props ici pour faciliter la MAJ
    };

    let newItem = { ...baseItem };

    switch (componentType) {
      // 🧱 Topography
      case 'heading':
        newItem.props = { content: 'Titre', fontSize: 24 };
        break;
      case 'paragraph':
        newItem.props = { content: 'Paragraphe', fontSize: 16 };
        break;

      // 📸 Media
      case 'image':
        newItem.props = { src: 'https://via.placeholder.com/150', alt: 'Image' };
        break;
      case 'video':
        newItem.props = { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' };
        break;

      // 🖊️ Form Elements
      case 'textfield':
        newItem.props = { placeholder: 'Entrer du texte...', value: '' };
        break;
      case 'submit-button':
        newItem.props = { label: 'Envoyer' };
        break;
      case 'checkbox':
        newItem.props = { label: 'Accepter les termes', checked: false };
        break;
      case 'dropdown':
        newItem.props = { options: ['Option 1', 'Option 2', 'Option 3'], selected: 'Option 1' };
        break;
      case 'search':
        newItem.props = { placeholder: 'Rechercher...', value: '' };
        break;

      // 📚 Layout
      case 'grid':
        newItem.props = { columns: 2 };
        break;
      case 'headers':
        newItem.props = { content: 'En-tête' };
        break;
      case 'footer':
        newItem.props = { content: 'Pied de page' };
        break;
      case 'sidepanel':
        newItem.props = { content: 'Panneau latéral' };
        break;
      case 'card':
        newItem.props = { content: 'Carte' };
        break;

      // 🧭 Navigation
      case 'navbar':
        newItem.props = { items: ['Accueil', 'À propos', 'Contact'] };
        break;
      case 'sidebar':
        newItem.props = { items: ['Menu 1', 'Menu 2', 'Menu 3'] };
        break;
      case 'tabs':
        newItem.props = { tabs: ['Tab 1', 'Tab 2'], activeTab: 'Tab 1' };
        break;
      case 'breadcrumbs':
        newItem.props = { path: ['Accueil', 'Section', 'Page'] };
        break;

      default:
        newItem.props = { content: 'Composant' };
    }

    setCanvasItems((prev) => [...prev, newItem]);
  };

  // Gestion du panneau responsive (inactif ici)
  const [showResponsivePanel, setShowResponsivePanel] = useState(false);

  // Gestion onglets du haut
  const [topTab, setTopTab] = useState('widgets');
  const handleTabClick = (tab) => {
    setTopTab(tab);
    setShowResponsivePanel(tab === 'Responsive');
  };

  // Dimensions pour le canvas
  const { width, height } = getDeviceDimensions();

  // Mise à jour d’un widget dans canvasItems (propagation des props dans l’objet props)
  const updateWidget = (id, updates) => {
    setCanvasItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, props: { ...item.props, ...updates } } : item
      )
    );

    // Si le widget édité est celui sélectionné, on met à jour la sélection aussi pour re-render la SidebarProperties
    if (selectedWidget?.id === id) {
      setSelectedWidget((prev) => ({
        ...prev,
        props: { ...prev.props, ...updates },
      }));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-indigo-500 text-gray-900">

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
      />

      {/* Left Sidebar + Canvas + Right Sidebar */}
      <div className="flex flex-1  overflow-hidden">
        <SidebarBuilder
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          topTab={topTab}
          handleTabClick={handleTabClick}
          darkMode={darkMode}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          visualItems={visualItems}
          navigationalItems={navigationalItems}
          layoutElements={layoutElements}
          topographyElements={topographyElements}
          addComponentToCanvas={addComponentToCanvas} // si tu veux déclencher l'ajout depuis SidebarBuilder
        />

        <Canvas
          ref={canvasRef}
          width={width}
          height={height}
          zoom={zoom}
          canvasItems={canvasItems}
          setCanvasItems={setCanvasItems}
          addComponentToCanvas={addComponentToCanvas}
          onSelectWidget={handleSelectWidget}
        />

        <SidebarProperties
          selectedWidget={selectedWidget}
          widgets={canvasItems}
          setWidgets={setCanvasItems}
          updateWidget={updateWidget}
          darkMode={darkMode}
        />
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
