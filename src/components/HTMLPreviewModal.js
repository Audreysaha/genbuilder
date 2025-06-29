import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { generateReactCode } from "../utils/generateReactCode";

const HTMLPreviewModal = ({ show, onClose, widgets, device }) => {
  const {
    jsxWeb,
    cssWeb,
    jsxNative
  } = generateReactCode(widgets);

  const isMobile = device === "mobile";

  const [activeTab, setActiveTab] = useState("jsx");

  useEffect(() => {
    if (show) {
      setActiveTab(isMobile ? "native" : "jsx");
    }
  }, [device, show]);

  const tabs = isMobile
    ? [
        {
          key: "native",
          label: "Canvas.native.js",
          content: jsxNative
        }
      ]
    : [
        {
          key: "jsx",
          label: "code.jsx",
          content: jsxWeb
        },
        {
          key: "css",
          label: "styles.css",
          content: cssWeb
        }
      ];

  const handleDownload = () => {
    tabs.forEach((tab) => {
      const blob = new Blob([tab.content], {
        type: tab.key === "css" ? "text/css" : "text/jsx",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = tab.label;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white w-[90%] h-[70vh] flex flex-col max-w-4xl justify-between rounded-xl p-6"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="flex mb-2 border-b border-gray-300 justify-between">
              <div className="flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    className={`px-4 py-2 font-medium ${
                      activeTab === tab.key
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div>
                <button onClick={onClose}>❌</button>
              </div>
            </div>

            <textarea
              readOnly
              className="w-full h-full border border-gray-300 rounded-lg p-4 font-mono text-sm resize-none"
              value={tabs.find((t) => t.key === activeTab)?.content || ""}
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() =>
                  navigator.clipboard.writeText(
                    tabs.find((t) => t.key === activeTab)?.content || ""
                  )
                }
              >
                Copy
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleDownload}
              >
                Download All
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HTMLPreviewModal;
