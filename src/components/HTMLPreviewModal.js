import { AnimatePresence, motion } from "framer-motion";
import { generateReactCode } from "../utils/generateHTMLCode";

const HTMLPreviewModal = ({ show, onClose, widgets }) => {
  const htmlCode = generateReactCode(widgets);

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
            className="bg-white w-[90%] max-w-4xl rounded-xl p-6"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Generated HTML Code</h2>
              <button onClick={onClose}>❌</button>
            </div>
            <textarea
              readOnly
              className="w-full h-96 border border-gray-300 rounded-lg p-4 font-mono text-sm resize-none"
              value={htmlCode}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => navigator.clipboard.writeText(htmlCode)}
              >
                Copy
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HTMLPreviewModal;
