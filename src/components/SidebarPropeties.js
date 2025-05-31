import { FiSettings } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const SidebarProperties = ({ selectedWidget, widgets, setWidgets, updateWidget, darkMode }) => {
  // Memo pour éviter recalcul inutile
  const selected = useMemo(() => widgets.find(w => w.id === selectedWidget?.id), [widgets, selectedWidget]);

  const textColor = darkMode ? 'text-gray-300' : 'text-gray-700';
  const borderColor = darkMode ? 'border-gray-600' : 'border-gray-300';
  const bgColor = darkMode ? 'bg-gray-700' : 'bg-white';

  // Mise à jour des propriétés en s'assurant que selected existe
  const updateProps = (updates) => {
    if (!selected) return;
    updateWidget(selected, { props: { ...selected.props, ...updates } });
  };

  // Suppression avec confirmation
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this widget?')) {
      setWidgets(widgets.filter(w => w.id !== selectedWidget?.id));
    }
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
              ? darkMode
                ? 'bg-blue-600 text-white'
                : 'bg-blue-100 text-blue-800'
              : darkMode
              ? 'bg-gray-700 hover:bg-gray-600'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {size.toUpperCase()}
        </motion.button>
      ))}
    </div>
  );

  const colors = ['#4F46E5', '#10B981', '#EF4444', '#F59E0B', '#6B7280'];

  const renderColorPicker = (currentColor, onChange) => (
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

  const renderPositionFields = () => (
    <div className="grid grid-cols-2 gap-2">
      {['x', 'y'].map(axis => (
        <div key={axis}>
          <label className={`block text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {axis.toUpperCase()}
          </label>
          <input
            type="number"
            value={selected?.[axis] ?? 0}
            onChange={e =>
              updateWidget(selectedWidget, { [axis]: parseInt(e.target.value, 10) || 0 })
            }
            className={`w-full px-3 py-2 rounded text-sm border ${bgColor} ${borderColor} ${
              darkMode ? 'text-white' : ''
            }`}
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
        className={`w-full px-3 py-2 rounded text-sm border ${bgColor} ${borderColor} ${
          darkMode ? 'text-white' : ''
        }`}
      />
    </div>
  );

  const renderTextarea = (label, value, onChange) => (
    <div>
      <label className={`block text-sm font-medium mb-1 ${textColor}`}>{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 rounded text-sm border resize-none h-24 ${bgColor} ${borderColor} ${
          darkMode ? 'text-white' : ''
        }`}
      />
    </div>
  );

  const propertyRenderers = {
    heading: () => (
      <>
        {renderInput('Text', selected.props?.text || '', e => updateProps({ text: e.target.value }))}
      </>
    ),

    paragraph: () => (
      <>
        {renderTextarea('Text', selected.props?.text || '', e => updateProps({ text: e.target.value }))}
      </>
    ),

    image: () => (
      <>
        {renderInput('Image URL', selected.props?.src || '', e => updateProps({ src: e.target.value }))}
      </>
    ),

    video: () => (
      <>
        {renderInput('Video URL', selected.props?.src || '', e => updateProps({ src: e.target.value }))}
      </>
    ),

    textfield: () => (
      <>
        {renderInput('Placeholder', selected.props?.text || '', e => updateProps({ text: e.target.value }))}
        {renderSizeSelector(selected.props?.size || 'md', size => updateProps({ size }))}
      </>
    ),

    search: () => (
      <>
        {renderInput('Placeholder', selected.props?.text || '', e => updateProps({ text: e.target.value }))}
      </>
    ),

    'submit-button': () => (
      <>
        {renderInput('Text', selected.props?.text || '', e => updateProps({ text: e.target.value }))}
        {renderColorPicker(selected.props?.color, color => updateProps({ color }))}
      </>
    ),

    checkbox: () => (
      <>
        {renderInput('Label', selected.props?.text || '', e => updateProps({ text: e.target.value }))}
      </>
    ),

    dropdown: () => (
      <>
        {renderInput(
          'Label',
          selected.props?.text || '',
          e => updateProps({ text: e.target.value })
        )}
        {renderInput(
          'Options (comma separated)',
          Array.isArray(selected.props?.options)
            ? selected.props?.options.join(', ')
            : selected.props?.options || '',
          e => updateProps({ options: e.target.value.split(',').map(opt => opt.trim()) })
        )}
      </>
    ),

    navbar: () => (
      <>
        {renderInput('Links (comma separated)', selected.props?.links || '', e => updateProps({ links: e.target.value }))}
      </>
    ),

    sidebar: () => (
      <>
        {renderInput('Items (comma separated)', selected.props?.items || '', e => updateProps({ items: e.target.value }))}
      </>
    ),

    tabs: () => (
      <>
        {renderInput('Tabs (comma separated)', selected.props?.tabs || '', e => updateProps({ tabs: e.target.value }))}
      </>
    ),

    breadcrumbs: () => (
      <>
        {renderInput('Path (e.g. Home > Category > Page)', selected.props?.path || '', e => updateProps({ path: e.target.value }))}
      </>
    ),

    grid: () => (
      <>
        {renderInput(
          'Columns (e.g. 2)',
          selected.props?.columns || 2,
          e => updateProps({ columns: parseInt(e.target.value, 10) || 2 })
        )}
      </>
    ),

    headers: () => (
      <>
        {renderInput('Text', selected.props?.text || '', e => updateProps({ text: e.target.value }))}
      </>
    ),

    footer: () => (
      <>
        {renderInput('Text', selected.props?.text || '', e => updateProps({ text: e.target.value }))}
      </>
    ),

    sidepanel: () => (
      <>
        {renderInput('Content', selected.props?.text || '', e => updateProps({ text: e.target.value }))}
      </>
    ),

    card: () => (
      <>
        {renderInput('Title', selected.props?.title || '', e => updateProps({ title: e.target.value }))}
        {renderTextarea('Content', selected.props?.content || '', e => updateProps({ content: e.target.value }))}
      </>
    ),
  };

  const renderContent = () => {
    if (!selected) return null;
    return propertyRenderers[selected.type]?.() || null;
  };

  // useEffect(() => {
  //   console.log('Selected widget changed:', selectedWidget);
  //   console.log('WidgetList', widgets);
  //   console.log(selected);
  // }, [selectedWidget]);

  return (
    <div
      className={`w-80 ${darkMode ? 'bg-black' : 'bg-white'} border-l ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      } p-4 overflow-y-auto`}
    >
      {selected ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold capitalize">{selected.type} Properties</h2>
            <button
              onClick={handleDelete}
              className={`text-sm ${
                darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'
              }`}
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
