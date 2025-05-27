import { FiSettings } from 'react-icons/fi';
import { motion } from 'framer-motion';

const SidebarProperties = ({ selectedWidget, widgets, setWidgets, updateWidget, darkMode }) => {
  const selected = widgets.find(w => w.id === selectedWidget);
  const textColor = darkMode ? 'text-gray-300' : 'text-gray-700';
  const borderColor = darkMode ? 'border-gray-600' : 'border-gray-300';
  const bgColor = darkMode ? 'bg-gray-700' : 'bg-white';

  const handleDelete = () => {
    setWidgets(widgets.filter(w => w.id !== selectedWidget));
  };

  const renderSizeSelector = (currentSize, onChange) => (
    <div className="flex space-x-2">
      {['sm', 'md', 'lg'].map(size => (
        <motion.button
          key={size}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(size)}
          className={`px-3 py-1 rounded text-xs ${
            currentSize === size
              ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
              : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {size.toUpperCase()}
        </motion.button>
      ))}
    </div>
  );

  const renderColorPicker = (currentColor, onChange) => {
    const colors = ['#4F46E5', '#10B981', '#EF4444', '#F59E0B', '#6B7280'];
    return (
      <div className="flex space-x-2">
        {colors.map(color => (
          <motion.div
            key={color}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange(color)}
            className={`w-6 h-6 rounded-full cursor-pointer ${
              currentColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    );
  };

  const renderPositionFields = () => (
    <div className="grid grid-cols-2 gap-2">
      {['x', 'y'].map(axis => (
        <div key={axis}>
          <label className={`block text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {axis.toUpperCase()}
          </label>
          <input
            type="number"
            value={selected?.[axis] || 0}
            onChange={(e) => updateWidget(selectedWidget, { [axis]: parseInt(e.target.value) || 0 })}
            className={`w-full px-3 py-2 rounded text-sm border ${bgColor} ${borderColor} ${darkMode ? 'text-white' : ''}`}
          />
        </div>
      ))}
    </div>
  );

  const renderInput = (label, value, onChange) => (
    <div>
      <label className={`block text-sm font-medium mb-1 ${textColor}`}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 rounded text-sm border ${bgColor} ${borderColor} ${darkMode ? 'text-white' : ''}`}
      />
    </div>
  );

  const renderContent = () => {
    if (!selected) return null;

    switch (selected.type) {
      case 'button':
        return (
          <>
            {renderInput('Text', selected.props.text || '', (e) =>
              updateWidget(selectedWidget, { props: { ...selected.props, text: e.target.value } })
            )}
            <div>
              <label className={`block text-sm font-medium mb-1 ${textColor}`}>Color</label>
              {renderColorPicker(selected.props.color, (color) =>
                updateWidget(selectedWidget, { props: { ...selected.props, color } })
              )}
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${textColor}`}>Size</label>
              {renderSizeSelector(selected.props.size, (size) =>
                updateWidget(selectedWidget, { props: { ...selected.props, size } })
              )}
            </div>
          </>
        );

      case 'text':
        return (
          <>
            {renderInput('Text', selected.props.text || '', (e) =>
              updateWidget(selectedWidget, { props: { ...selected.props, text: e.target.value } })
            )}
            <div>
              <label className={`block text-sm font-medium mb-1 ${textColor}`}>Size</label>
              {renderSizeSelector(selected.props.size, (size) =>
                updateWidget(selectedWidget, { props: { ...selected.props, size } })
              )}
            </div>
          </>
        );

      case 'container':
        return (
          <>
            <div>
              <label className={`block text-sm font-medium mb-1 ${textColor}`}>Width</label>
              <input
                type="range"
                min="100"
                max="500"
                value={selected.props.width || 200}
                onChange={(e) =>
                  updateWidget(selectedWidget, { props: { ...selected.props, width: parseInt(e.target.value) } })
                }
                className="w-full"
              />
              <div className="text-right text-xs text-gray-500">
                {selected.props.width}px
              </div>
            </div>
            <div>
              <label className={`flex items-center space-x-2 text-sm font-medium ${textColor}`}>
                <input
                  type="checkbox"
                  checked={selected.props.rounded || false}
                  onChange={(e) =>
                    updateWidget(selectedWidget, { props: { ...selected.props, rounded: e.target.checked } })
                  }
                  className="rounded"
                />
                <span>Rounded Corners</span>
              </label>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`w-80 ${darkMode ? 'bg-black' : 'bg-white'} border-l ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4 overflow-y-auto`}>
      {selected ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold capitalize">{selected.type} Properties</h2>
            <button
              onClick={handleDelete}
              className={`text-sm ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'}`}
            >
              Delete
            </button>
          </div>
          <div className="space-y-4">
            {renderContent()}
            <div>
              <label className={`block text-sm font-medium mb-1 ${textColor}`}>Position</label>
              {renderPositionFields()}
            </div>
          </div>
        </>
      ) : (
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} text-center`}>
          <FiSettings size={24} className="mx-auto mb-2" />
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {widgets.length === 0 ? 'Add a widget to get started' : 'Select a widget to edit its properties'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SidebarProperties;
