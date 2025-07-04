import React, { useState, useEffect, useRef } from "react";
import {
  FaMobileAlt,
  FaTabletAlt,
  FaDesktop,
  FaHome,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { RotateCcw, RotateCw } from "lucide-react";
import { FiCode, FiPlay, FiSave,FiPlus, FiMinus } from "react-icons/fi";
import { SlRefresh } from "react-icons/sl";
import { motion } from "framer-motion";
import { useNavigate, Link, useParams } from "react-router-dom";
import { GrUndo } from "react-icons/gr";
import { LuUndo, LuRedo  } from "react-icons/lu";
import {
  HiChevronUpDown,
  HiMiniArrowLeftEndOnRectangle,
  HiMiniBars3,
} from "react-icons/hi2";
import {
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { LocalStorageManager } from "../utils/LocalStorageManager";
import API from "../utils/API";
import { jwtDecode } from "jwt-decode";
import LivePreviewCanvas from "./LivePreviewConvas";
import { generateReactCode } from "../utils/generateReactCode";

const Navbar = ({
  zoom,
  setZoom,
  deviceSize,
  setDeviceSize,
  showCode,
  setShowCode,
  handleUndoClick,
  handleRedoClick,
  mode,
  setMode,
  activePageId,
  pages,
  activeTab,
  projectPages,
  widgets,
  device,
  setDevice,
  onRefreshCanvas,
  canvasItems
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef(null);
  // const [canvasItems, setCanvasItems] = useState([]);
  // const [items, setItems] = useState([]);
  const [active, setActive] = useState(null);
  const [viewMode, setViewMode] = useState("web");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const api = new API();
  const user = jwtDecode(LocalStorageManager.getItem("token"));
  const isLayerTab = activeTab === "layers";

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const filteredPages = isLayerTab
    ? pages.filter((page) =>
        page.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Close dropdown when clicked outside for search bar pages
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //for menu click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreateProject = async () => {
    const name = prompt("Enter a project name:");
    if (!name || !name.trim()) return;
    await api
      .postData(
        `${api.apiUrl}/api/project/save`,
        {
          name: name.trim(),
          userId: user.id,
        },
        false
      )
      .then((res) => {
        api
          .postData(`${api.apiUrl}/api/project/${res.id}/pages`, {
            name: "Page1",
          })
          .then(() => {
            alert("Project saved successfully!");
            navigate(`/interface/${res.id}`);
          })
          .catch((err) => {
            throw new Error(err);
          });
      })
      .catch((err) => {
        console.error("Error when creating Project:", err);
        throw new Error(err);
      });
  };

  const authLinks = [
    {
      name: "Login",
      href: "/login",
      icon: <ArrowRightOnRectangleIcon className="h-5 w-5" />,
      className: "text-white hover:text-white hover:bg-indigo-900 rounded-lg",
    },
    {
      name: "Register",
      href: "/register",
      icon: <UserPlusIcon className="h-5 w-5" />,
      className:
        "bg-indigo-600 text-white hover:bg-indigo-900 rounded-lg shadow-lg shadow-indigo-900",
    },
  ];
  const [deviceSelectedMod, setDeviceSelectedMod] = useState("web");

  const { projectId } = useParams();
  function hadlePreviewClick() {
    window.open(
      `/preview/${projectId}?device=${deviceSelectedMod}&page=${activePageId}`,
      "_blank"
    );
  }

  function saveTemplate() {
    const name = prompt("Entrez un nom pour le template :");

    if (!name || name.trim() === "") {
      alert("Le nom du template est requis.");
      return;
    }

    if (!canvasItems || canvasItems.length === 0) {
      alert("Aucun contenu à enregistrer.");
      return;
    }

    api
      .postData(api.apiUrl + "/api/templates/save", {
        name: name.trim(),
        content: canvasItems,
      })
      .then((res) => {
        console.log("Template sauvegardé :", res);
        alert("Template sauvegardé avec succès !");
      })
      .catch((err) => {
        console.error("Erreur lors de la sauvegarde du template :", err);
        alert("Erreur lors de la sauvegarde du template.");
      });
  }

  const isAuthenticated = !!LocalStorageManager.getItem("token");

  const { cssWeb, html } = generateReactCode(widgets);

  const handleDeploy = async (html, css, name, pageId) => {
    api
      .postData(
        api.apiUrl + "/api/project/deploy",
        { html, css, name, pageId },
        false
      )
      .then((res) => {
        console.log("Deployed at:", res);
        console.log("Deployed at:", res.url);
        // return res.url;
      })
      .catch((err) => {
        console.error("Deployment failed:", err.error);
        throw new Error("Deployment failed");
      });
  };

  return (
    <div className="flex items-center justify-between h-[55px] px-4 bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700">
      {/* Left section */}
      <div className="flex items-center space-x-3">
        {/* Menu Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            ref={buttonRef}
            onClick={() => setOpen(!open)}
            className="p-2 rounded hover:bg-indigo-200 dark:hover:bg-gray-800"
            title="Menu"
          >
            <HiMiniBars3 className="text-gray-700 dark:text-white" size={25} />
          </button>
          {open && (
            <div
              ref={menuRef}
              className="absolute left-0 mt-2 w-48 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-md z-10"
            >
              <button
                className="w-full text-left px-4 py-2 hover:bg-indigo-100 dark:hover:bg-indigo-700 text-gray-700 dark:text-white"
                onClick={handleCreateProject}
              >
                Save
              </button>
              <button
                onClick={() => saveTemplate()}
                className="w-full text-left px-4 py-2 hover:bg-indigo-100 dark:hover:bg-indigo-700 text-gray-700 dark:text-white"
              >
                Save As Template
              </button>
              {isAuthenticated ? (
                <button
                  className="w-full flex items-center text-left px-4 py-2 hover:bg-indigo-100 dark:hover:bg-indigo-700 text-gray-700 dark:text-white"
                  onClick={() => {
                    LocalStorageManager.removeItem("token");
                    window.location.reload();
                  }}
                >
                  <HiMiniArrowLeftEndOnRectangle className="h-6 w-5 mr-2" />
                  <p>Logout</p>
                </button>
              ) : (
                <div className="hidden lg:flex items-center space-x-4 px-2 py-2">
                  {authLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`flex items-center space-x-2 px-4 py-2 text-[16px] font-medium transition-all duration-300 rounded-full ${link.className}`}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="p-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>

       

      <div className="bg-white dark:bg-gray-900 rounded flex">
       {/* Zoom */}
        <div className="ml-2 bg-white dark:bg-gray-900 p-1 rounded inline-flex items-center space-x-2 text-sm text-gray-700 dark:text-white">
          <span
            className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700"
            onClick={() => setZoom(Math.max(50, zoom - 10))}
            title="Zoom Out"
          >
            <FiMinus size={14} className="text-gray-700"/>
          </span>
          <span>{zoom}%</span>
          <span
            className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700"
            onClick={() => setZoom(Math.min(150, zoom + 10))}
            title="Zoom In"
          >
           <FiPlus size={14} className="text-gray-700" />
          </span>
        </div>
        </div>
        
          {/* Refresh button */}
          <div>
          <button
            onClick={onRefreshCanvas}
            className="p-2  text-gray-800 dark:bg-gray-800  dark:text-white"
            title="Refresh Canvas"
          >
            <SlRefresh  size={18}/>
          </button>
        </div>

        {/* Undo/Redo */}
          <div
            onClick={handleUndoClick}
            className={`w-8 h-8 flex items-center justify-center cursor-pointer rounded ${
              active === "undo"
                ? "text-indigo-600 bg-indigo-100 dark:bg-indigo-700 dark:text-white"
                : "text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            title="Undo"
          >
            <LuUndo className="w-5 h-5" />
          </div>
          <div
            onClick={handleRedoClick}
            className={`w-8 h-8 flex items-center justify-center cursor-pointer rounded ${
              active === "redo"
                ? "text-indigo-600 bg-indigo-100 dark:bg-indigo-700 dark:text-white"
                : "text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            title="Redo"
          >
            <LuRedo className="w-5 h-5" />
          </div>
        </div>

       

      {/* Center: Device Toggle + Buttons */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center border rounded-full overflow-hidden text-sm">
          {["web", "mobile"].map((modeOption) => (
            <button
              key={modeOption}
              onClick={() => {
                setViewMode(modeOption);
                setDevice(modeOption);
                setDeviceSelectedMod(modeOption);
                setDeviceSize(modeOption === "web" ? "desktop" : "mobile");
              }}
              className={`px-3 py-1 transition-colors ${
                viewMode === modeOption
                  ? "bg-indigo-200 text-indigo-800 dark:bg-indigo-600 dark:text-white"
                  : "bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
              }`}
            >
              {modeOption.charAt(0).toUpperCase() + modeOption.slice(1)}
            </button>
          ))}
        </div>

        {/* Device sizes */}
        <div className="flex items-center space-x-2">
          {(viewMode === "web"
            ? [
                { icon: FaTabletAlt, size: 18, type: "tablet" },
                { icon: FaDesktop, size: 20, type: "desktop" },
              ]
            : [{ icon: FaMobileAlt, size: 18, type: "mobile" }]
          ).map(({ icon: Icon, size, type }) => {
            const isActive = deviceSize === type;
            return (
              <button
                key={type}
                onClick={() => setDeviceSize(type)}
                className={`p-1 rounded ${
                  isActive
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-700"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                title={type}
              >
                <Icon
                  size={size}
                  className={`${
                    isActive
                      ? "text-blue-800 dark:text-white"
                      : "text-gray-700 dark:text-white"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setShowCode(!showCode)}
          className={`p-3 rounded-lg ${
            showCode
              ? "bg-blue-100 text-white dark:bg-blue-700"
              : "hover:bg-indigo-200 dark:text-white dark:hover:bg-indigo-700"
          }`}
        >
          <FiCode size={20} />
        </button>

    
        {/* Mode Switch */}
        <div className="flex border border-gray-300 dark:border-gray-500 rounded-full text-sm font-medium overflow-hidden">
          <button
            onClick={() => setMode("AI")}
            className={`px-4 py-1 transition-colors ${
              mode === "AI"
                ? "bg-indigo-200 text-indigo-800 dark:bg-indigo-400 dark:text-white"
                : "bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
            }`}
          >
            AI
          </button>
          <button
            onClick={() => setMode("Edit")}
            className={`px-4 py-1 transition-colors ${
              mode === "Edit"
                ? "bg-indigo-200 text-indigo-800 dark:bg-indigo-400 dark:text-white"
                : "bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
            }`}
          >
            Edit
          </button>
        </div>

        {/* Preview */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => hadlePreviewClick()}
          className="px-3 py-1.5 rounded-md text-sm font-medium flex items-center bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700"
        >
          <FiPlay className="mr-1" />
          Preview
        </motion.button>
        {device == "web" ? (
          <div>
            {projectPages.filter((page) => page.id == activePageId)[0]?.url ? (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-1.5 rounded-md text-sm bg-purple-500 hover:bg-purple-600 text-white dark:bg-purple-600 dark:hover:bg-purple-700"
                href={
                  projectPages.filter((page) => page.id == activePageId)[0]?.url
                }
              >
                Open site
              </motion.a>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-1.5 rounded-md text-sm bg-purple-500 hover:bg-purple-600 text-white dark:bg-purple-600 dark:hover:bg-purple-700"
                onClick={() =>
                handleDeploy(html, cssWeb, projectPages.filter((page) => page.id == activePageId)[0]?.name, activePageId)
                }
              >
                Deploy
              </motion.button>
            )}
          </div>
        ) : (
          <div className="hidden"></div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
