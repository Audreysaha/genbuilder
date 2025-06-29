import React, { useState, useEffect, useRef } from "react";
import { FiLayers, FiSearch, FiChevronRight, FiPlus, FiMoreVertical } from "react-icons/fi";
import { CgTemplate } from "react-icons/cg";
import API from "../utils/API";

export default function SidebarBuilder({
  activeTab,
  setActiveTab,
  expandedSections,
  toggleSection,
  visualItems,
  mediaElements,
  layoutElements,
  onDeletePage,
  pages, 
  SidebarPages,
  topographyElements,
  projectPages = [],
  activePageId = null,
  onSelectPage = () => {},
  handleAddProjectPages,
  fetchProject,
  handleRenameProjectPage,
  handleDeletePage,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVisual, setFilteredVisual] = useState(visualItems);
  const [filteredMedia, setFilteredMedia] = useState(mediaElements);
  const [filteredLayout, setFilteredLayout] = useState(layoutElements);
  const [filteredTopography, setFilteredTopography] =
    useState(topographyElements);
  const [projectPagesName, setProjectPagesName] = useState("");
  const [showAddPageInput, setShowAddPageInput] = useState(false);
  const [projectTemplates, setProjectTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [showAddTemplateInput, setShowAddTemplateInput] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [activeTemplateId, setActiveTemplateId] = useState(null);
  const [renamingPageId, setRenamingPageId] = useState(null);
  const [newPageName, setNewPageName] = useState("");
  const api = new API();
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    pageId: null,
  });
  const contextMenuRef = useRef();

const handleAddTemplate = (name) => {
  const newTemplate = {
    id: Date.now(),
    name,
  };
  setProjectTemplates(prev => [...prev, newTemplate]);
};

const onSelectTemplate = (id) => {
  setActiveTemplateId(id);
};


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

  <SidebarPages
  pages={pages}
  onDeletePage={handleDeletePage}  // ✅ This is important
/>


  return (
    <>
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
        .icon-wrapper svg {
          stroke-width: 1 !important;
        }
      `}</style>

      <div className="flex h-screen">
        {/* Left tab panel */}
        <div className="w-16 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-4 space-y-4">
          <button
            onClick={() => setActiveTab("widgets")}
            className={`p-3 rounded-lg transition-colors ${
              activeTab === "widgets"
                ? "bg-indigo-600 text-white dark:bg-blue-700 dark:text-white"
                : "hover:bg-indigo-400 dark:hover:bg-indigo-800 dark:text-gray-300"
            }`}
            aria-label="Widgets tab"
            type="button"
          >
            <FiPlus size={20} />
          </button>
          <button
            onClick={() => setActiveTab("layers")}
            className={`p-3 rounded-lg transition-colors ${
              activeTab === "layers"
                ? "bg-indigo-600 text-white dark:bg-blue-700 dark:text-white"
                : "hover:bg-indigo-400 dark:hover:bg-indigo-800 dark:text-gray-300"
            }`}
            aria-label="Layers tab"
          >
            <FiLayers size={20} />
          </button>
            <button
            onClick={() => setActiveTab("templates")}
            className={`p-3 rounded-lg transition-colors ${
              activeTab === "templates"
                ? "bg-indigo-600 text-white dark:bg-blue-700 dark:text-white"
                : "hover:bg-indigo-400 dark:hover:bg-indigo-800 dark:text-gray-300"
            }`}
            aria-label="Templates tab"
          >
            <CgTemplate size={24} />
          </button>
        </div>

    {activeTab === "templates" && (
  <aside className="w-fit bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-2">
    {projectTemplates.length > 0 && (
      <div className="h-full">
        {/* Header */}
        <div className="flex justify-between items-center pb-1">
          <div className="font-Tahoma text-gray-800 dark:text-gray-200 text-[26px] font-sans">
            Templates
          </div>
          <div
            onClick={() => setShowAddTemplateInput(true)}
            className="bg-indigo-600 rounded-md p-2 w-8 h-8 flex items-center justify-center text-white cursor-pointer"
          >
            <FiPlus size={18} />
          </div>
        </div>

        {/* Separator */}
        <div className="border-b border-gray-300 dark:border-gray-700 mb-4" />

        {/* Input Form */}
        {showAddTemplateInput && (
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={newTemplateName}
              onChange={(e) => setNewTemplateName(e.target.value)}
              placeholder="Template name"
              className="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
            />
            <button
              onClick={() => {
                if (newTemplateName.trim()) {
                  handleAddTemplate(newTemplateName.trim());
                  setNewTemplateName("");
                  setShowAddTemplateInput(false);
                }
              }}
              className="px-3 py-1 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded"
            >
              Add
            </button>
          </div>
        )}

        {/* Template List */}
        <div className="space-y-1">
          {projectTemplates
            .slice()
            .sort((a, b) => a.id - b.id)
            .map((template) => (
              <button
                key={template.id}
                onClick={() => onSelectTemplate(template.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg w-[300px] text-sm transition ${
                  activeTemplateId === template.id
                    ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-600 dark:text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-300"
                }`}
              >
                <span className="truncate">{template.name}</span>
                <FiMoreVertical className="ml-2" />
              </button>
            ))}
        </div>
      </div>
    )}
  </aside>
)}


                
        
        {activeTab === "layers" && (
          <aside className="w-fit bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-2 ">
            {projectPages.length > 0 && (
              <div className="h-full">
                <div className="flex justify-between items-center pb-1">
                  <div className="font-Tahoma text-gray-800 dark:text-gray-200 text-[26px] font-sans ">
                    Pages
                  </div>
                  <div
                    onClick={() => setShowAddPageInput(true)}
                    className="bg-indigo-600 rounded-md p-2 w-8 h-8 flex items-center justify-center text-white cursor-pointer"
                  >
                    <FiPlus size={40} />
                  </div>
                </div>
                {/* Separator Line */}
                <div className="border-b border-gray-300 dark:border-gray-700 mb-4" />

                <div className="flex-1 overflow-auto h-full">
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

                  {/* Page List */}
                  <div className="space-y-1 relative">
                    {projectPages
                      .slice()
                      .sort((a, b) => a.id - b.id)
                      .map((page) => (
                        <div
                          key={page.id}
                          className="flex items-center gap-2 relative"
                          onContextMenu={(e) => {
                            e.preventDefault();
                            setContextMenu({
                              visible: true,
                              x: e.pageX,
                              y: e.pageY,
                              pageId: page.id,
                            });
                          }}
                        >
                          {renamingPageId === page.id ? (
                            <>
                              <input
                                type="text"
                                value={newPageName}
                                onChange={(e) => setNewPageName(e.target.value)}
                                className="flex-1 px-2 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
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
                                title="Save"
                              >
                                save
                              </button>
                              <button
                                onClick={() => {
                                  setRenamingPageId(null);
                                  setNewPageName("");
                                }}
                                className="text-red-600 hover:text-red-800"
                                title="Cancel"
                              >
                                cancel
                              </button>
                            </>
                          ) : (
                            <>
                            <button
                            onClick={() => onSelectPage(page.id)}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg w-[300px] text-sm transition ${
                            activePageId === page.id
                            ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-600 dark:text-white"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-300"
                            }`}
>
                                  <span>{page.name}</span>
                                  <FiMoreVertical />
                              </button>
                            </>
                          )}
                        </div>
                      ))}

                    {/* Menu contextuel */}
                    {contextMenu.visible && (
                      <ul
                        ref={contextMenuRef}
                        className="absolute z-50 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-md py-1 text-sm"
                        style={{ top: contextMenu.y, left: contextMenu.x }}
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
                            setContextMenu({ ...contextMenu, visible: false });
                          }}
                        >
                          Rename
                        </li>
                        <li className="...">
                          {pages.map((page) => (
                          <div key={page.id}>
                          <span>{page.name}</span>
                          <button onClick={() => onDeletePage(page.id)}>Delete</button>
                          </div>
                        ))}
                          Delete
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
          </aside>
        )}

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