import React, { useState, useEffect, useRef } from "react";
import {
  FiLayers,
  FiSearch,
  FiChevronRight,
  FiPlus,
  FiMoreVertical,
  FiCode,
} from "react-icons/fi";
import { CgTemplate } from "react-icons/cg";
import API from "../utils/API";

export default function SidebarBuilder({
  activeTab,
  setActiveTab,
  expandedSections,
  showCode,
  setShowCode,
  toggleSection,
  visualItems,
  mediaElements,
  layoutElements,
  pages,
  SidebarPages,
  setCanvasItems,
  topographyElements,
  projectPages = [],
  activePageId = null,
  onSelectPage = () => {},
  handleAddProjectPages,
  fetchProject,
  handleDeletePage,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVisual, setFilteredVisual] = useState(visualItems);
  const [filteredMedia, setFilteredMedia] = useState(mediaElements);
  const [filteredLayout, setFilteredLayout] = useState(layoutElements);
  const [filteredTopography, setFilteredTopography] = useState(topographyElements);
  const [projectPagesName, setProjectPagesName] = useState("");
  const [showAddPageInput, setShowAddPageInput] = useState(false);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    pageId: null,
  });
  const contextMenuRef = useRef();
  const [renamingPageId, setRenamingPageId] = useState(null);
  const [newPageName, setNewPageName] = useState("");
  const api = new API();

  const PREBUILT_TEMPLATES = [
  {
    id: 1,
    name: "Contact Form",
    description: "A minimal contact form with two input fields and a  button.",
    previewColor: "bg-indigo-100",
    category: "Forms",
    items: [
      {
        id: "t1-1",
        type: "text",
        props: {
          content: "Contact Us",
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          color: "#1e1e1e",
        },
        x: 100,
        y: 40,
      },
      {
        id: "t1-2",
        type: "textfield",
        props: {
          placeholder: "Your Name",
          width: 280,
          height: 40,
          borderRadius: "8px",
          padding: "8px",
          backgroundColor: "#ffffff",
        },
        x: 100,
        y: 100,
      },
      {
        id: "t1-3",
        type: "textfield",
        props: {
          placeholder: "Your Email",
          width: 280,
          height: 40,
          borderRadius: "8px",
          padding: "8px",
          backgroundColor: "#ffffff",
        },
        x: 100,
        y: 160,
      },
      {
        id: "t1-4",
        type: "submit-button",
        props: {
          content: "Send Message",
          width: 160,
          height: 44,
          backgroundColor: "#4f46e5",
          color: "#ffffff",
          borderRadius: "8px",
          fontWeight: "bold",
        },
        x: 100,
        y: 220,
      },
    ],
  },
  {
    id: 2,
    name: "Hero Section",
    description: "A modern hero block featuring a headline, subheading, and a supporting image.",
    previewColor: "bg-pink-100",
    category: "Sections",
    items: [
      {
        id: "t2-1",
        type: "text",
        props: {
          content: "Welcome to Our Platform",
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "left",
          color: "#111827",
        },
        x: 80,
        y: 60,
      },
      {
        id: "t2-2",
        type: "text",
        props: {
          content: "Design interfaces visually, faster.",
          fontSize: 18,
          textAlign: "left",
          color: "#6b7280",
        },
        x: 80,
        y: 110,
      },
      {
        id: "t2-3",
        type: "image",
        props: {
          src: "https://placehold.co/200x100",
          width: 240,
          height: 120,
          borderRadius: "12px",
        },
        x: 80,
        y: 160,
      },
    ],
  },
  {
    id: 3,
    name: "Profile Card",
    description: "A user profile component with avatar, name, title, and short bio.",
    previewColor: "bg-green-100",
    category: "Cards",
    items: [
      {
        id: "t3-1",
        type: "image",
        props: {
          src: "https://placehold.co/80x80",
          width: 80,
          height: 80,
          borderRadius: "50%",
        },
        x: 120,
        y: 40,
      },
      {
        id: "t3-2",
        type: "text",
        props: {
          content: "Jane Doe",
          fontSize: 20,
          fontWeight: "600",
          textAlign: "center",
        },
        x: 110,
        y: 130,
      },
      {
        id: "t3-3",
        type: "text",
        props: {
          content: "UI Designer",
          fontSize: 14,
          color: "#6b7280",
          textAlign: "center",
        },
        x: 120,
        y: 160,
      },
      {
        id: "t3-4",
        type: "text",
        props: {
          content: "Crafting beautiful, functional interfaces.",
          fontSize: 12,
          color: "#4b5563",
          textAlign: "center",
        },
        x: 80,
        y: 190,
      },
    ],
  },
  
  {
    id: 5,
    name: "Landing Page",
    description: "A sleek landing page with a header, bold headline, supporting text, image, and a call-to-action button.",
    previewColor: "bg-blue-100",
    category: "Pages",
    items: [
      {
        id: "t5-1",
        type: "text",
        props: {
          content: "ProductName",
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "left",
          color: "#1e3a8a",
        },
        x: 40,
        y: 20,
      },
      {
        id: "t5-2",
        type: "text",
        props: {
          content: "Build Stunning Interfaces Visually",
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "left",
          color: "#111827",
        },
        x: 40,
        y: 80,
      },
      {
        id: "t5-3",
        type: "text",
        props: {
          content: "No-code tools to design, prototype, and launch your UI faster than ever.",
          fontSize: 16,
          color: "#6b7280",
          textAlign: "left",
        },
        x: 40,
        y: 130,
      },
      {
        id: "t5-4",
        type: "submit-button",
        props: {
          content: "Get Started",
          width: 160,
          height: 44,
          backgroundColor: "#2563eb",
          color: "#ffffff",
          borderRadius: "8px",
          fontWeight: "bold",
        },
        x: 40,
        y: 180,
      },
      {
        id: "t5-5",
        type: "image",
        props: {
          src: "https://placehold.co/300x160",
          width: 300,
          height: 160,
          borderRadius: "12px",
        },
        x: 320,
        y: 80,
      },
    ],
  },
{
  id: 6,
  name: "Simple Order Summary",
  description: "A minimal order summary layout with product name, quantity, price, and a place order button.",
  previewColor: "bg-orange-100",
  category: "Orders",
  items: [
    {
      id: "t6-1",
      type: "text",
      props: {
        content: "Order Summary",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
      },
      x: 100,
      y: 30,
    },
    {
      id: "t6-2",
      type: "text",
      props: {
        content: "Product: Wireless Mouse",
        fontSize: 16,
        textAlign: "left",
      },
      x: 80,
      y: 90,
    },
    {
      id: "t6-3",
      type: "text",
      props: {
        content: "Quantity: 2",
        fontSize: 16,
        textAlign: "left",
      },
      x: 80,
      y: 120,
    },
    {
      id: "t6-4",
      type: "text",
      props: {
        content: "Total: $40.00",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "left",
      },
      x: 80,
      y: 150,
    },
    {
      id: "t6-5",
      type: "submit-button",
      props: {
        content: "Place Order",
        width: 160,
        height: 44,
        backgroundColor: "#ef4444",
        color: "#ffffff",
        borderRadius: "8px",
        fontWeight: "bold",
      },
      x: 100,
      y: 200,
    },
  ],
},
{
  id: 7,
  name: "Product Checkout Card",
  description: "A modern checkout card with product image, details, price, and a confirm order button.",
  previewColor: "bg-lime-100",
  category: "Orders",
  items: [
    {
      id: "t7-1",
      type: "image",
      props: {
        src: "https://placehold.co/100x100",
        width: 100,
        height: 100,
        borderRadius: "12px",
      },
      x: 80,
      y: 60,
    },
    {
      id: "t7-2",
      type: "text",
      props: {
        content: "Smart Headphones",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
      },
      x: 200,
      y: 140,
    },
    {
      id: "t7-3",
      type: "text",
      props: {
        content: "Noise cancelling, Bluetooth, 30hr battery",
        fontSize: 14,
        color: "#6b7280",
        textAlign: "left",
      },
      x: 200,
      y: 170,
    },
    {
      id: "t7-4",
      type: "text",
      props: {
        content: "Price: $120.00",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "left",
      },
      x: 200,
      y: 160,
    },
    {
      id: "t7-5",
      type: "submit-button",
      props: {
        content: "Confirm Order",
        width: 160,
        height: 44,
        backgroundColor: "#10b981",
        color: "#ffffff",
        borderRadius: "8px",
        fontWeight: "bold",
      },
      x: 200,
      y: 160,

    },
  ],
}

];

function handleLoadTemplate(template) {
  const newItems = template.items.map(item => ({
    ...item,
    id: `${item.id}-${Date.now()}-${Math.floor(Math.random() * 10000)}`
  }));
  console.log("Loading template items:", newItems);
  setCanvasItems(newItems);
}

  function onDeletePage(pageId) {
    api
      .deleteData(api.apiUrl + `/api/project/pages/${pageId}/delete`, {})
      .then((res) => {
        fetchProject();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  function handleRenameProjectPage(pageId, pageName) {
    api
      .putData(
        api.apiUrl + `/api/project/pages/${pageId}/rename`,
        {
          name: pageName,
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
    if (!searchTerm.trim()) {
      setFilteredVisual(visualItems);
      setFilteredMedia(mediaElements);
      setFilteredLayout(layoutElements);
      setFilteredTopography(topographyElements);
    } else {
      const filterItems = (items) =>
        items.filter((item) =>
          item.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
      setFilteredVisual(filterItems(visualItems));
      setFilteredMedia(filterItems(mediaElements));
      setFilteredLayout(filterItems(layoutElements));
      setFilteredTopography(filterItems(topographyElements));
    }
  }, [
    searchTerm,
    visualItems,
    mediaElements,
    layoutElements,
    topographyElements,
  ]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(e.target)
      ) {
        setContextMenu({ ...contextMenu, visible: false });
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [contextMenu]);

  return (
    <>
      <div className="flex h-screen">
        {/* Left tab panel */}
        <div className="w-[40px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-6 space-y-6">
          <button
            onClick={() => setActiveTab("widgets")}
            className={`p-1 rounded-lg transition-colors ${
              activeTab === "widgets"
                ? "bg-indigo-600 text-white dark:bg-blue-700 dark:text-white"
                : "hover:bg-indigo-400 dark:hover:bg-indigo-800 dark:text-gray-300"
            }`}
            aria-label="Widgets tab"
            type="button"
          >
            <FiPlus size={18} />
          </button>

          <button
            onClick={() => setActiveTab("layers")}
            className={`p-1 rounded-lg transition-colors ${
              activeTab === "layers"
                ? "bg-indigo-600 text-white dark:bg-blue-700 dark:text-white"
                : "hover:bg-indigo-400 dark:hover:bg-indigo-800 dark:text-gray-300"
            }`}
            aria-label="Layers tab"
          >
            <FiLayers size={18} />
          </button>

          <button
            onClick={() => setActiveTab("templates")}
            className={`p-1 rounded-lg transition-colors ${
              activeTab === "templates"
                ? "bg-indigo-600 text-white dark:bg-blue-700 dark:text-white"
                : "hover:bg-indigo-400 dark:hover:bg-indigo-800 dark:text-gray-300"
            }`}
            aria-label="Templates tab"
          >
            <CgTemplate size={19} />
          </button>

            <button
              onClick={() => setShowCode(!showCode)}
                className={`p-3 rounded-lg ${showCode
                        ? "bg-blue-100 text-white dark:bg-blue-700"
                        : "hover:bg-indigo-200 dark:text-white dark:hover:bg-indigo-700"
                    }`}
                  >
                    <FiCode size={20}  />
                  </button>
        </div>

        {activeTab === "layers" && (
          <aside className="w-[240px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-2 ">
            <div className="h-full">
              <div className="flex justify-between items-center pb-1">
                <div className="font-Tahoma text-gray-800 dark:text-gray-200 text-[22px] font-sans ">
                  Pages
                </div>
                <div
                  onClick={() => setShowAddPageInput(true)}
                  className="bg-indigo-600 rounded-md p-2 w-7 h-7 flex items-center justify-center text-white cursor-pointer"
                >
                  <FiPlus size={22} />
                </div>
              </div>
              <div className="border-b border-gray-300 dark:border-gray-700 mb-4" />

              <div className="flex-1 overflow-auto h-full relative">
                {showAddPageInput && (
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={projectPagesName}
                      onChange={(e) => setProjectPagesName(e.target.value)}
                      placeholder="Page name"
                      className="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                    />
                    <button
                      onClick={() => {
                        if (projectPagesName.trim()) {
                          handleAddProjectPages(projectPagesName.trim());
                          setProjectPagesName("");
                          setShowAddPageInput(false);
                        }
                      }}
                      className="px-3 py-1 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                    >
                      Add
                    </button>
                  </div>
                )}

                <div className="space-y-1">
                  {projectPages
                    .slice()
                    .sort((a, b) => a.id - b.id)
                    .map((page) => (
                      <div
                        key={page.id}
                        className="flex min-w-[200px] items-center gap-2 relative"
                      >
                        {renamingPageId === page.id ? (
                          <>
                            <input
                              type="text"
                              value={newPageName}
                              onChange={(e) => setNewPageName(e.target.value)}
                              className="flex-1 px-2 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white text-black dark:text-white"
                            />
                            <button
                              onClick={() => {
                                if (newPageName.trim()) {
                                  handleRenameProjectPage(
                                    page.id,
                                    newPageName.trim()
                                  );
                                  setRenamingPageId(null);
                                  setNewPageName("");
                                }
                              }}
                              className="text-green-600 hover:text-green-800"
                            >
                              save
                            </button>
                            <button
                              onClick={() => {
                                setRenamingPageId(null);
                                setNewPageName("");
                              }}
                              className="text-red-600 hover:text-red-800"
                            >
                              cancel
                            </button>
                          </>
                        ) : (
                          <div className={`relative w-full flex items-center justify-between rounded-lg text-sm transition ${
                                activePageId === page.id
                                  ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-600 dark:text-white"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-300"
                              }`}>
                            <button
                              onClick={() => onSelectPage(page.id)}
                              className={`flex-1 text-left px-3 py-2 `}
                            >
                              {page.name}
                            </button>
                            <div className="absolute right-2 top-2">
                              <FiMoreVertical
                                onClick={(e) => {
                                  e.stopPropagation(); // Important pour ne pas déclencher onSelectPage
                                  const rect =
                                    e.currentTarget.getBoundingClientRect();
                                  setContextMenu({
                                    visible: true,
                                    x: rect.left,
                                    y: rect.bottom + 4, // décalage vertical de 4px
                                    pageId: page.id,
                                  });
                                }}
                                className="cursor-pointer p-1 w-5 h-5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                  {contextMenu.visible && (
                    <ul
                      ref={contextMenuRef}
                      className="fixed z-50 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-md py-1 text-sm w-[120px] "
                      style={{ top: contextMenu.y, left: contextMenu.x }}
                      onClick={(e) => e.stopPropagation()} // Avoid immediate close of menu
                    >
                      <li
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={() => {
                          const selectedPage = projectPages.find(
                            (p) => p.id === contextMenu.pageId
                          );
                          if (selectedPage) {
                            setRenamingPageId(selectedPage.id);
                            setNewPageName(selectedPage.name);
                          }
                          setContextMenu({
                            visible: false,
                            x: 0,
                            y: 0,
                            pageId: null,
                          });
                        }}
                      >
                        Rename
                      </li>
                      <li
                        className="px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={() => {
                          onDeletePage(contextMenu.pageId);
                          setContextMenu({
                            visible: false,
                            x: 0,
                            y: 0,
                            pageId: null,
                          });
                        }}
                      >
                        Delete
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </aside>
        )}

 {activeTab === "templates" && (
  <aside className="w-[270px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4">
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center pb-1 mb-2">
        <div className="font-Tahoma text-gray-800 dark:text-gray-200 text-[24px] font-sans">
        Pre-Build Templates
        </div>
      </div>
      <div className="border-b border-gray-300 dark:border-gray-700 mb-4" />

      {/* Prebuilt Templates List */}
      <div className="mb-4 flex-1 pb-32">
        <div className="space-y-3">
          {PREBUILT_TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition
                hover:scale-[1.03] hover:shadow-lg  
                ${tpl.previewColor} dark:bg-opacity-60`}
              onClick={() => handleLoadTemplate(tpl)}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-200 dark:gray-200 flex items-center justify-center text-indigo-700 font-bold text-lg">
                {tpl.name[0]}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-semibold text-base text-gray-900 dark:text-white">{tpl.name}</span>
                <span className="text-xs text-gray-600 dark:text-gray-300">{tpl.description}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  </aside>
)}

        {/* Main sidebar content */}
        {activeTab === "widgets" && (
          <div className="w-[300px] h-screen flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="px-3 py-3 font-Tahoma text-left text-gray-800 dark:text-gray-200 text-[24px] font-sans">
              User-Interface Builder
            </div>

            {/* Search */}
            <div className="mx-2 w-[270px]">
              <div className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 rounded-md">
                <div className="flex items-center px-2 py-1.5 focus-within:ring-2 focus-within:ring-indigo-500">
                  <input
                    type="text"
                    placeholder="Search"
                    className="flex-grow bg-transparent outline-none text-sm text-black dark:text-gray-200 placeholder-gray-600 dark:placeholder-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FiSearch
                    size={18}
                    className="text-gray-600 dark:text-gray-400 mr-2"
                  />
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar h-full pb-32">
              {/* Form Elements */}
              {filteredVisual.length > 0 && (
                <Section
                  label="Form Elements"
                  expanded={expandedSections["inputControls"]}
                  onToggle={() => toggleSection("inputControls")}
                  items={filteredVisual}
                />
              )}

              {filteredLayout.length > 0 && (
                <Section
                  label="Layout Elements"
                  expanded={expandedSections["layoutElements"]}
                  onToggle={() => toggleSection("layoutElements")}
                  items={filteredLayout}
                />
              )}

              {filteredMedia.length > 0 && (
                <Section
                  label="Media Elements"
                  expanded={expandedSections["mediaElements"]}
                  onToggle={() => toggleSection("mediaElements")}
                  items={filteredMedia}
                />
              )}

              {filteredTopography.length > 0 && (
                <Section
                  label="Topography Elements"
                  expanded={expandedSections["topographyElements"]}
                  onToggle={() => toggleSection("topographyElements")}
                  items={filteredTopography}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Section component
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
          {items.map(({ type, label, icon: Icon }, _i) => (
            <div
              key={_i}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("componentType", type)}
              className="flex flex-col items-center justify-center p-1 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-grab"
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
