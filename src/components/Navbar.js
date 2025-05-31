import React, { useState } from "react";
import { FaMobileAlt, FaTabletAlt, FaLaptop } from "react-icons/fa";
import { RotateCcw, RotateCw } from "lucide-react";
import { FiCode, FiPlay } from "react-icons/fi";
import { motion } from "framer-motion";

const Navbar = ( { zoom, setZoom, deviceSize, setDeviceSize, showCode,setShowCode, handleUndoClick, handleRedoClick } ) => {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [mode, setMode] = useState("Edit");
  const [active, setActive] = useState(null);
  const bgColor = "bg-gray-50"; // Exemple de couleur de fond
  const borderColor = "border-gray-300"; // Exemple de couleur de bordure

  const toggleLangMenu = () => {
    setLangOpen(!langOpen);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setLangOpen(false);
  };

  return (
    <div className={`flex items-center p-2 ${bgColor} border-b ${borderColor}`}>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7h4l3 3h8a2 2 0 012 2v5a2 2 0 01-2 2H3V7z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7V5a2 2 0 012-2h4l3 3h8a2 2 0 012 2v5a2 2 0 01-2 2H3V7z"
                  />
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
          {/* House icon */}
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
          {/* Arrow icon */}
          <div className="absolute inset-y-0 right-2 flex flex-col items-center justify-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 9l5-5 5 5" />
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
          <span
            className="cursor-pointer"
            onClick={() => setZoom(Math.max(50, zoom - 10))}
            title="Zoom Out"
          >
            -
          </span>
          <span>{zoom}%</span>
          <span
            className="cursor-pointer"
            onClick={() => setZoom(Math.min(150, zoom + 10))}
            title="Zoom In"
          >
            +
          </span>
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
          <button
            onClick={() => setShowCode(!showCode)}
            className={`p-3 rounded-lg ${showCode ? 'bg-blue-100 text-white' : 'hover:bg-indigo-200'}`}
          >
            <FiCode size={20} />
          </button>
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
  );
};

export default Navbar;
