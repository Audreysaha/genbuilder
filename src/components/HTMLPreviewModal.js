import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { generateReactCode } from "../utils/generateReactCode";

const HTMLPreviewModal = ({ show, onClose, widgets }) => {
  const { jsx, css } = generateReactCode(widgets);
  const [activeTab, setActiveTab] = useState("jsx");

  const jsxFormatted = `import "./styles.css";\n\nexport default function App() {\n  return (\n    <div className="relative w-full h-screen">\n${jsx
    .split("\n")
    .map((line) => "      " + line)
    .join("\n")}\n    </div>\n  );\n}`;

  const handleDownload = () => {
    const jsxBlob = new Blob([jsxFormatted], { type: "text/jsx" });
    const cssBlob = new Blob([css], { type: "text/css" });

    const downloadFile = (blob, filename) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    downloadFile(jsxBlob, "code.jsx");
    downloadFile(cssBlob, "styles.css");
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
              <div className="lex mb-2 border-b border-gray-300">
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === "jsx"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("jsx")}
                >
                  code.jsx
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === "css"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("css")}
                >
                  styles.css
                </button>
              </div>
              <div className="flex justify-between items-center mb-4">
                {/* <h2 className="text-xl font-bold">Generated React Code</h2> */}
                <button onClick={onClose}>❌</button>
              </div>
            </div>

            {activeTab === "jsx" ? (
              <textarea
                readOnly
                className="w-full h-full border border-gray-300 rounded-lg p-4 font-mono text-sm resize-none"
                value={jsxFormatted}
              />
            ) : (
              <textarea
                readOnly
                className="w-full h-full border border-gray-300 rounded-lg p-4 font-mono text-sm resize-none"
                value={css}
              />
            )}

            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() =>
                  navigator.clipboard.writeText(
                    activeTab === "jsx" ? jsxFormatted : css
                  )
                }
              >
                Copy {activeTab === "jsx" ? "JSX" : "CSS"}
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleDownload}
              >
                Download
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HTMLPreviewModal;
