import React, { useState } from "react";
import { FaMobileAlt, FaTabletAlt, FaDesktop, FaHome } from "react-icons/fa";
import { RotateCcw, RotateCw } from "lucide-react";
import { FiCode, FiPlay } from "react-icons/fi";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate, Link } from "react-router-dom";
import { HiChevronUpDown, HiLanguage, HiMiniArrowLeft, HiMiniArrowLeftEndOnRectangle, HiMiniBars3 } from "react-icons/hi2";

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
}) => {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [active, setActive] = useState(null);
  const bgColor = "bg-white"; // Bg-Color
  const borderColor = "border-gray-300"; // Border-color
  const navigate = useNavigate();

  const toggleLangMenu = () => {
    setLangOpen(!langOpen);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setLangOpen(false);
  };

  const handleDashboard = () => {
    navigate("/"); // This will redirect to the interface page
  };

  return (
    <div
      className={`flex items-center h-[55px] p-2 ${bgColor} border-b ${borderColor}`}
    >
      {/* Left section of Navbar */}
      <div className="flex items-center space-x-3 text-sm">
        {/* 1-hamburger button */}
        <div className="relative inline-block text-left">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded hover:bg-indigo-200"
            aria-expanded={open}
            aria-haspopup="true"
            title="Menu"
          >
            <HiMiniBars3 className="text-gray-700" size={25} />
          </button>

          {/* Dropdown menu */}
          {open && (
            <div className="absolute left-0 mt-2 w-48 bg-gray-100 border border-gray-300 rounded shadow-md z-10">
              
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
              <button
                className="w-full text-left px-4 py-2 hover:bg-indigo-100 text-gray-700"
                onClick={() => alert("Darkmode")}
              >
                Switch to Darkmode
              </button>
              <button
                className="w-full flex items-center text-left px-4 py-2 hover:bg-indigo-100 text-gray-700"
                onClick={handleDashboard}
              >
                <HiMiniArrowLeftEndOnRectangle className="h-6 w-5 mr-2" />
                <p>LogOut</p>
              </button>
            </div>
          )}
        </div>

        {/* 2-Search Bar */}
        <div className="relative w-[170px]">
          {/* House icon */}
          <div className="absolute inset-y-1 left-1 flex items-center pointer-events-none">
          <FaHome className="text-gray-600" size={17}/>
          </div>
          {/* Arrow icon */}
          <div className="absolute inset-y-0 right-2 flex flex-col items-center justify-center pointer-events-none">
            <HiChevronUpDown className="text-gray-600" size={18} />
          </div>
          <input
            type="search"
            placeholder="Home"
            className="w-[171px] pl-7 pr-8 py-1 rounded border text-sm bg-white border-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* 3-Language Selector */}
        <div className="relative ">
        <button
        onClick={toggleLangMenu}
        className="h-7 px-1.5 border rounded text-sm flex items-center space-x-0.5 bg-white border-gray-300 text-gray-700"
        >
        <HiLanguage className="text-gray-600" size={16} />
        <span>{language}</span>
        </button>
          {langOpen && (
            <ul className="absolute mt-1 rounded shadow-lg w-full z-10 text-xs border bg-white text-black border-gray-300">
              {["en", "de", "fr"].map((lang) => (
                <li
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className="px-3 py-1 hover:bg-indigo-300 hover:text-white cursor-pointer"
                >
                  {lang}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 4-Zoom control */}
        <div className="bg-white p-1 rounded inline-flex items-center space-x-2 text-s text-gray-800">
          <span
            className="cursor-pointer w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 "
            onClick={() => setZoom(Math.max(50, zoom - 10))}
            title="Zoom Out"
          >
            -
          </span>
          <span>{zoom}%</span>
          <span
            className="cursor-pointer w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-gray-700"
            onClick={() => setZoom(Math.min(150, zoom + 10))}
            title="Zoom In"
            >
              +
            </span>
        </div>
      </div>

      {/* Space Dividing  */}
      <div className="flex items-center w-full px-4 py-2 bg-white border-b">
        <div className="w-40" />
           {/* 1. Centered Device Buttons */}
        <div className="flex-1 flex justify-center">
          <div className="flex space-x-1">
            {[
              { icon: <FaMobileAlt size={18} />, type: "mobile" },
              { icon: <FaTabletAlt size={18} />, type: "tablet" },
              { icon: <FaDesktop size={20} />, type: "desktop" },
            ].map(({ icon, type }) => (
              <button
                key={type}
                onClick={() => setDeviceSize(type)}
                className={`p-1 rounded ${
                  deviceSize === type
                    ? "bg-blue-100 text-blue-800"
                    : "hover:bg-gray-200"
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
          <button
            onClick={() => setShowCode(!showCode)}
            className={`p-3 rounded-lg ${showCode ? "bg-blue-100 text-white" : "hover:bg-indigo-200"}`}
          >
            <FiCode size={20} />
          </button>
          
          {/* Undo/Redo */}
          <div className="bg-white rounded flex">
            <div
              onClick={handleUndoClick}
              className={`w-8 h-8 flex items-center justify-center cursor-pointer rounded ${
                active === "undo"
                  ? "text-indigo-600 bg-indigo-100"
                  : "text-gray-600 hover:bg-gray-200"
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
                active === "redo"
                  ? "text-indigo-600 bg-indigo-100"
                  : "text-gray-600 hover:bg-gray-200"
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
          className={`px-4 py-1 transition focus:outline-none cursor-pointer ${
          mode === "AI"
        ? "bg-indigo-200 text-indigo-800"
        : "bg-white text-gray-800"
        }`}
        >
        AI
      </button>
      <button
      onClick={() => setMode("Edit")}
      className={`px-4 py-1 transition focus:outline-none cursor-pointer ${
      mode === "Edit"
        ? "bg-indigo-200 text-indigo-800"
        : "bg-white text-gray-800"
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
            Deploy
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
