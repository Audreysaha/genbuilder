import React, { useEffect, useRef, useState } from "react";
import lowcode from "../assets/images/lowcode.jpeg";
import { FiSearch} from "react-icons/fi";
import { IoIosRadioButtonOff } from "react-icons/io";
import * as FiIcons from "react-icons/fi"; 
import { Rnd } from "react-rnd";

const CanvasItem = ({ item, onUpdate, isSelected, onSelect }) => {
  const {
    borderRadius,
    src,
    content,
    type,
  } = item;
  

  const defaultPropsByType = {
  divider: {
    color: "#4f46e5", // indigo-600
    thickness: 4,
    width: "100%",
    margin: 32
  },
  // other types...
};



  const initialX = item.x ?? Math.floor(Math.random() * 200);
  const initialY = item.y ?? Math.floor(Math.random() * 200);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onUpdate(item.id, { src: url });
  };

  const triggerFileInput = () => {
    const input = document.createElement("input");
    input.type = "file";
    if (type === "image") input.accept = "image/*";
    if (type === "video") input.accept = "video/*";
    input.onchange = handleFileChange;
    input.click();
  };

  const contentRef = useRef(null);

  const commonStyle = {
    backgroundColor: item.backgroundColor || "transparent",
    borderRadius: item.borderRadius ? `${item.borderRadius}px` : "none",
    fontSize: item.fontSize ? `${item.fontSize}px` : "Arial",
    padding: "1px",
    cursor: "cursor",
    userSelect: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const inputStyle = {
    ...commonStyle,
    padding: "0.25rem",
    lineHeight: 1.2,
    resize: "none",
  };

  useEffect(() => {
    if ((item.width == null || item.height == null) && contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect();
      onUpdate(item.id, {
        width: Math.ceil(rect.width),
        height: Math.ceil(rect.height),
      });
    }
  }, [item.width, item.height, item.content, item.src]); 

  const renderContent = () => {
    switch (type) {

case "submit-button":
  return (
    <button
      type="button"
      className="w-full h-full px-4 py-2 rounded-md"
      style={{
        ...commonStyle,
        backgroundColor: item.props?.backgroundColor || "#4f46e5",
        color: item.props?.textColor || "#ffffff",
        cursor: "grab",
        textAlign: "left", // Ensures text starts from the left
        direction: "ltr", 
      }}
      contentEditable={true}
      suppressContentEditableWarning={true}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item.id);
      }}
      onInput={(e) =>
        onUpdate(item.id, {
          props: {
            ...item.props,
            content: e.currentTarget.textContent, // stores manually typed text
          }
        })
      }
    >
      {item.props?.content || "Submit"}
    </button>
  );

case "textfield":
  return (
    <input
      className="w-full h-full"
      style={{
        ...inputStyle,
        border: isSelected ? "2px solid gray" : "1px solid #6b7280",
        borderRadius: "10px",
        cursor: "grab",
        backgroundColor: item.props?.backgroundColor || "#ffffff", // background color from props
        color: item.props?.textColor || "#000000", // text color from props
      }}
      value={item.props?.content || ""}
      onChange={(e) =>
        onUpdate(item.id, {
          props: {
            ...item.props,
            content: e.target.value,
          },
        })
      }
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item.id);
      }}
    />
  );

case "text":
  const style = {
    color: item.props?.textColor || "black",
    backgroundColor: item.props?.backgroundColor || "transparent",
    fontSize: item.props?.fontSize || "16px",
    fontFamily: item.props?.fontFamily || "Arial, sans-serif",
    fontWeight: item.props?.bold ? "bold" : "normal",
    fontStyle: item.props?.italic ? "italic" : "normal",
    textDecoration: item.props?.underline ? "underline" : "none",
    padding: "4px",
    outline: isSelected ? "1px solid blue" : "none", // optional focus style
    cursor: "text",
    whiteSpace: "pre-wrap", // to preserve line breaks
  };
  return (
    <div
      contentEditable
      suppressContentEditableWarning={true}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item.id);
      }}
      onInput={(e) => {
        onUpdate(item.id, {
          props: {
            ...item.props,
            content: e.currentTarget.textContent,
          },
        });
      }}
      // optionally, prevent line breaks or other behaviors here if needed
    >
      {item.props?.content || "Enter a text"}
    </div>
  );

case "checkbox":
  const checkboxProps = item.props || {};
  const labelStyle = {
    color: checkboxProps.textColor || "black",
    backgroundColor: checkboxProps.backgroundColor || "transparent",
    fontSize: checkboxProps.fontSize || "16px", // optional, can be removed if not needed
    padding: "0.25rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    width: "100%",
    height: "100%",
    cursor: "pointer",
  };

  return (
    <label
      style={{ ...commonStyle, ...labelStyle }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item.id);
      }}
    >
      <input type="checkbox" />
      <span
        contentEditable
        suppressContentEditableWarning
        onClick={(e) => e.stopPropagation()}
        onInput={(e) =>
          onUpdate(item.id, {
            props: {
              ...checkboxProps,
              content: e.currentTarget.textContent,
            },
          })
        }
      >
        {checkboxProps.content || "Check me"}
      </span>
    </label>
  );

case "icon":
  const SelectedIcon =
    FiIcons[item.props?.iconName] && typeof FiIcons[item.props?.iconName] === "function"
      ? FiIcons[item.props.iconName]
      : FiIcons.FiBox;

  return (
    <div
      style={{
        ...commonStyle,
        backgroundColor: item.props?.backgroundColor || "transparent",
        padding: "0.5rem",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item.id);
      }}
    >
      <SelectedIcon
        size={parseInt(item.props?.fontSize) || 24}
        color={item.props?.textColor || "#000"}
        style={{
          strokeWidth: 1.0,
        }}
      />
    </div>
  );

case "dropdown":
  const dropdownProps = item.props || {};
  const options = dropdownProps.options || ["Option 1", "Option 2"];

  return (
    <select
      className="h-[50px] px-2 cursor-pointer focus:outline-none"
      style={{
        width: dropdownProps.width || "250px",
        backgroundColor: dropdownProps.backgroundColor || "#e5e7eb",
        color: dropdownProps.textColor || "black",
        borderRadius: dropdownProps.borderRadius || "0px",
        fontSize: dropdownProps.fontSize || "14px",
        appearance: "auto",
        border: "1px solid #ccc",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item.id);
      }}
      value={dropdownProps.content || ""}
      onChange={(e) =>
        onUpdate(item.id, {
          props: {
            ...dropdownProps,
            content: e.target.value,
          },
        })
      }
    >
      <option value="" disabled>
        Select an option
      </option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );

case "search":
  const searchProps = item.props || {};

  return (
    <div
      style={{
        position: "relative",
        width: searchProps.width || "100%", // dynamic width
      }}
    >
      <FiSearch
        style={{
          position: "absolute",
          top: "50%",
          left: "8px", // closer to left edge
          transform: "translateY(-50%)",
          color: "#6b7280",
          pointerEvents: "none",
          fontSize: "1rem",
        }}
      />
      <input
        type="search"
        value={searchProps.placeholder || ""}
        placeholder={searchProps.placeholder || "Search..."}
        className="w-full"
        style={{
          paddingLeft: "1.5rem", // 👈 reduced padding so placeholder is near icon
          backgroundColor: searchProps.backgroundColor || "#e5e7eb",
          color: searchProps.textColor || "#000000",
          fontSize: searchProps.fontSize || "14px",
          borderRadius: searchProps.borderRadius || "10px",
          border: isSelected ? "2px solid blue" : "1px solid #6b7280",
          height: "40px",
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(item.id);
        }}
        onChange={(e) =>
          onUpdate(item.id, {
            props: {
              ...searchProps,
              placeholder: e.target.value,
            },
          })
        }
      />
    </div>
  );

case "list":
  const listProps = item.props || {};
  const listContent = item.content || "Item 1,Item 2,Item 3";

  return (
    <ul
      className="flex w-full h-full"
      style={{
        backgroundColor: listProps.backgroundColor || "transparent",
        color: listProps.textColor || "#000000",
        fontSize: listProps.fontSize || "16px",
        fontWeight: listProps.bold ? "bold" : "normal",
        fontStyle: listProps.italic ? "italic" : "normal",
        textDecoration: listProps.underline ? "underline" : "none",
        lineHeight: listProps.lineHeight || "normal",
        fontFamily: listProps.fontFamily || "inherit",
        padding: "0.5rem",
        gap: "1.5rem", // spacing between items
        listStyleType: "disc",
      }}
    >
      {listContent.split(",").map((li, i, arr) => (
        <li
          key={i}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => {
            const newContent = [...arr];
            newContent[i] = e.target.textContent;
            onUpdate(item.id, { content: newContent.join(",") });
          }}
          className="cursor-text outline-none list-item"
          style={{
            display: "list-item", // ensures bullets appear even in flex
            listStylePosition: "inside",
          }}
        >
          {li.trim()}
        </li>
      ))}
    </ul>
  );

case "radio-button":
  const radioProps = item.props || {};

  return (
    <label
      className="flex items-center space-x-2 cursor-pointer"
      style={{
        backgroundColor: radioProps.backgroundColor || "transparent",
        padding: "0.25rem 0.5rem",
        borderRadius: "6px",
      }}
    >
      <input
        type="radio"
        name={radioProps.name || `radio-group-${item.id}`}
        checked={radioProps.checked || false}
        onChange={() =>
          onUpdate(item.id, {
            props: { ...radioProps, checked: true },
          })
        }
        className="form-radio text-indigo-600"
        style={{
          width: 18,
          height: 18,
        }}
        onClick={(e) => e.stopPropagation()}
      />
      <span
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        onBlur={(e) =>
          onUpdate(item.id, {
            props: {
              ...radioProps,
              label: e.currentTarget.textContent,
            },
          })
        }
        onClick={(e) => e.stopPropagation()}
        className="outline-none"
        style={{
          color: radioProps.textColor || "#000000",
          fontSize: radioProps.fontSize || "14px",
          fontWeight: radioProps.bold ? "bold" : "normal",
          fontStyle: radioProps.italic ? "italic" : "normal",
          textDecoration: radioProps.underline ? "underline" : "none",
          lineHeight: radioProps.lineHeight || "normal",
          fontFamily: radioProps.fontFamily || "inherit",
          minWidth: 40,
        }}
      >
        {radioProps.label || "Radio Option"}
      </span>
    </label>
  );

case "radio-button2":
  const radio2Props = item.props || {};
  const labelText2 = item.content || radio2Props.label || "Radio Option";

  return (
    <label
      className="flex items-center space-x-2 cursor-pointer"
      style={{
        backgroundColor: radio2Props.backgroundColor || "transparent",
        padding: "0.25rem 0.5rem",
        borderRadius: "6px",
      }}
    >
      <IoIosRadioButtonOff size={20} className="text-black dark:text-black" />
      <span
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        onBlur={(e) =>
          onUpdate(item.id, {
            content: e.currentTarget.textContent,
          })
        }
        onClick={(e) => e.stopPropagation()}
        style={{ 
          outline: "none", 
          minWidth: 40,
          color: radio2Props.textColor || "#000000",
          fontSize: radio2Props.fontSize || "14px",
          fontWeight: radio2Props.bold ? "bold" : "normal",
          fontStyle: radio2Props.italic ? "italic" : "normal",
          textDecoration: radio2Props.underline ? "underline" : "none",
          lineHeight: radio2Props.lineHeight || "normal",
          fontFamily: radio2Props.fontFamily || "inherit",
        }}
      >
        {labelText2}
      </span>
    </label>
  );

case "toggle-button":
  const toggleProps = item.props || {};
  const labelText = item.content || toggleProps.label || "";

  return (
    <label
      className="flex items-center space-x-3 cursor-pointer select-none"
      style={{
        color: toggleProps.textColor || "#000000",
        fontSize: toggleProps.fontSize || "16px",
        fontWeight: toggleProps.bold ? "bold" : "normal",
        fontStyle: toggleProps.italic ? "italic" : "normal",
        textDecoration: toggleProps.underline ? "underline" : "none",
        fontFamily: toggleProps.fontFamily || "inherit",
      }}
    >
      <span
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        onBlur={(e) =>
          onUpdate(item.id, {
            content: e.currentTarget.textContent,
          })
        }
        onClick={(e) => e.stopPropagation()}
        style={{ outline: "none", minWidth: 40 }}
      >
        {labelText}
      </span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(item.id);
          onUpdate(item.id, {
            props: {
              ...toggleProps,
              checked: !toggleProps.checked,
            },
          });
        }}
        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
          toggleProps.checked ? "bg-indigo-600" : "bg-gray-300"
        }`}
        style={{ minWidth: 48 }}
      >
        <span
          className={`absolute left-0 top-0 h-6 w-6 bg-white rounded-full shadow transform transition-transform duration-200 ${
            toggleProps.checked ? "translate-x-6" : ""
          }`}
        />
      </button>
    </label>
  );

case "footer":
  return (
    <footer
      className="w-full flex items-center justify-center"
      style={{
        backgroundColor: item.props?.backgroundColor || "#f3f4f6",
        color: item.props?.textColor || "#111827",
        height: item.props?.height || 60,
        minHeight: 40,
        fontWeight: "bold"
      }}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onBlur={e =>
        onUpdate(item.id, {
          props: { ...item.props, content: e.currentTarget.textContent }
        })
      }
      onClick={e => e.stopPropagation()}
    >
      {item.props?.content || "Footer content here"}
    </footer>
  );

case "tabs":
  return (
    <div className="w-full">
      <div className="flex border-b">
        {(item.props?.tabs || []).map((tab, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 -mb-px border-b-2 ${
              item.props?.activeTab === idx
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500"
            }`}
            onClick={e => {
              e.stopPropagation();
              onUpdate(item.id, { props: { ...item.props, activeTab: idx } });
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4 bg-gray-50 dark:bg-gray-800 min-h-[40px]">
        {(item.props?.tabs?.[item.props?.activeTab]?.content) || "Tab content"}
      </div>
    </div>
  );

case "divider":
  return (
    <hr
      className="w-full"
      style={{
        border: "none",
        borderTop: `${item.props?.thickness || 4}px solid ${item.props?.color || "#4f46e5"}`,
        borderRadius: item.props?.thickness
          ? `${item.props?.thickness / 2}px`
          : "2px",
        width: item.props?.width || "100%",
        margin: `${item.props?.margin || 32}px 0`
      }}
      onClick={(e) => e.stopPropagation()}
    />
  );

case "container":
  return (
    <div
      className="w-full h-full p-2 border border-dashed border-gray-400 dark:border-gray-600"
      style={commonStyle}
      onClick={(e) => {
        e.stopPropagation(); // Prevent deselecting on parent click
        onSelect(); // Mark container as selected
      }}
    >
      {item.children && item.children.length > 0 ? (
        item.children.map((child) => (
          <CanvasItem
            key={child.id}
            item={child}
            onUpdate={(childId, updates) => {
              const updatedChildren = item.children.map((c) =>
                c.id === childId ? { ...c, ...updates } : c
              );
              onUpdate(item.id, { children: updatedChildren });
            }}
            isSelected={child.id === item.selectedChildId}
            onSelect={() =>
              onUpdate(item.id, { selectedChildId: child.id })
            }
          />
        ))
      ) : (
        <div className="text-gray-400 text-sm italic">Drop items here...</div>
      )}
    </div>
  );

case "grid": {
  // Map gridType to number of columns, default 2
  const columnsMap = {
    "2-cols": 2,
    "3-cols": 3,
    "4-cols": 4,
    "5-cols": 5,
    "6-cols": 6,
  };
  const cols = columnsMap[item.gridType] || 2;
  const childrenInCells = Array.from({ length: cols }, () => []);

  (item.children || []).forEach((child, index) => {
    childrenInCells[index % cols].push(child);
  });

  const handleDropInColumn = (colIndex, droppedItem) => {
    const updatedChildren = [...(item.children || [])];
    updatedChildren.push({
      ...droppedItem,
      id: droppedItem.id || `child-${Date.now()}`,
      // Optionally store column index if needed
      parentGridId: item.id,
      columnIndex: colIndex,
    });

    onUpdate(item.id, { children: updatedChildren });
  };

  return (
    <div
      className="grid gap-4 w-full h-full p-4"
      style={{
        ...commonStyle,
        backgroundColor: item.backgroundColor || "transparent",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        minHeight: 300,  // Increased size here
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {childrenInCells.map((childArray, colIndex) => (
        <div
          key={colIndex}
          className="border border-gray-400 dark:border-gray-700 p-4 min-h-[150px] rounded"
          style={{ minHeight: 150, backgroundColor: "#fafafa" }}
          // Add your drop event handlers here, example:
          onDrop={(e) => {
            e.preventDefault();
            // Extract dropped data from event - adjust as per your DnD setup
            const data = e.dataTransfer.getData("application/json");
            if (!data) return;
            const droppedItem = JSON.parse(data);
            handleDropInColumn(colIndex, droppedItem);
          }}
          onDragOver={(e) => e.preventDefault()} // Allow drop
        >
          {childArray.length > 0 ? (
            childArray.map((child) => (
              <CanvasItem
                key={child.id}
                item={child}
                onUpdate={(childId, updates) => {
                  const updatedChildren = item.children.map((c) =>
                    c.id === childId ? { ...c, ...updates } : c
                  );
                  onUpdate(item.id, { children: updatedChildren });
                }}
                isSelected={isSelected && child.id === item.selectedChildId}
                onSelect={() => onUpdate(item.id, { selectedChildId: child.id })}
              />
            ))
          ) : (
            <div className="text-gray-400 text-sm italic select-none text-center">
              Drop items here...
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

case "wireframe":
  return (
    <div
      className="w-full h-[200px] bg-gray-100 border border-dashed border-gray-400 text-center flex items-center justify-center text-gray-500 cursor-grab"
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item.id);
      }}
    >
      Wireframe Placeholder
    </div>
  );


case "navbar":
  return (
    <nav
      className="flex space-x-2 px-2 py-1"
      style={{
        ...commonStyle,
        backgroundColor: item.backgroundColor || "white",
      }}
    >
      <span>Home</span>
      <span>About</span>
      <span>Contact</span>
    </nav>
  );

 case "sidebar":
        return (
          <aside className="space-y-1 p-1 h-full" style={commonStyle}>
            <div>Dashboard</div>
            <div>Settings</div>
            <div>Logout</div>
          </aside>
        );

case "image":
        return (
          <div
            className="cursor-grab w-full h-full"
            onDoubleClick={triggerFileInput}
            style={commonStyle}
          >
            <img
              src={lowcode}
              alt="Canvas"
              className="w-full h-full object-cover"
              style={{ borderRadius }}
            />
          </div>
        );

      case "video":
        return (
          <div
            className="cursor-grab w-full h-full"
            onDoubleClick={triggerFileInput}
            style={commonStyle}
          >
            <video className="w-full h-full" controls style={{ borderRadius }}>
              <source
                src={src || "https://www.w3schools.com/html/mov_bbb.mp4"}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        );

case "H1":
  const h1Props = item.props || {};
  const content = item.content || "Header 1";

  return (
    <h1
      className="text-center font-bold p-2"
      contentEditable
      suppressContentEditableWarning={true}
      spellCheck={false}
      onInput={(e) =>
        onUpdate(item.id, {
          content: e.currentTarget.textContent,
        })
      }
      style={{
        ...commonStyle,
        fontSize: h1Props.fontSize || "2.5rem",
        color: h1Props.textColor || "inherit",
        fontWeight: h1Props.bold ? "bold" : "normal",
        fontStyle: h1Props.italic ? "italic" : "normal",
        textDecoration: h1Props.underline ? "underline" : "none",
        fontFamily: h1Props.fontFamily || "inherit",
        textAlign: h1Props.textAlign || "center",
        lineHeight: h1Props.lineHeight || "normal",
        textAlign: "left",

      }}
    >
      {content}
    </h1>
  );


case "H2":
  return (
    <h2
      className="text-center font-bold p-2"
      style={{ ...commonStyle, fontSize: "2rem" }}
      contentEditable
      suppressContentEditableWarning={true}
      onInput={(e) => item.text = e.currentTarget.textContent}
      spellCheck={false}
    >
    {item.text || "Header 2"}
    </h2>
  );

case "H3":
  return (
    <h3
      className="text-center font-bold p-2"
      style={{ ...commonStyle, fontSize: "1.5rem" }}
       contentEditable
      suppressContentEditableWarning={true}
      onInput={(e) => item.text = e.currentTarget.textContent}
      spellCheck={false}
    >
      {item.text || "Header 3"}
    </h3>
  );

  case "H4":
  return (
    <h4
      className="text-center font-bold p-2"
      style={{ ...commonStyle, fontSize: "1.25rem" }}
      contentEditable
      suppressContentEditableWarning={true}
      onInput={(e) => item.text = e.currentTarget.textContent}
      spellCheck={false}
    >
    {item.text || "Header 4"}
    </h4>
  );

case "H5":
  return (
    <h5
      className="text-center font-bold p-2"
      style={{ ...commonStyle, fontSize: "1rem" }}
      contentEditable
      suppressContentEditableWarning={true}
      onInput={(e) => item.text = e.currentTarget.textContent}
      spellCheck={false}
    >
    {item.text || "Header 5"}
    </h5>
  );  
  
  case "Piechart": {
  const { data = [], width = 180, height = 180 } = item.props || {};
  const total = data.reduce((sum, d) => sum + Number(d.value), 0);
  let cumulative = 0;

  const slices = data.map((d, i) => {
    const startAngle = (cumulative / total) * 2 * Math.PI;
    cumulative += Number(d.value);
    const endAngle = (cumulative / total) * 2 * Math.PI;

    const x1 = width / 2 + (width / 2) * Math.cos(startAngle);
    const y1 = height / 2 + (height / 2) * Math.sin(startAngle);
    const x2 = width / 2 + (width / 2) * Math.cos(endAngle);
    const y2 = height / 2 + (height / 2) * Math.sin(endAngle);

    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

    const pathData = [
      `M ${width / 2} ${height / 2}`,
      `L ${x1} ${y1}`,
      `A ${width / 2} ${height / 2} 0 ${largeArc} 1 ${x2} ${y2}`,
      "Z"
    ].join(" ");

    return (
      <path key={i} d={pathData} fill={d.color} stroke="#fff" strokeWidth="2" />
    );
  });

  return (
    <div style={{ width, height: height + 40, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {slices}
      </svg>
      <div className="flex flex-wrap justify-center mt-2 gap-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center space-x-1">
            <input
              type="color"
              value={d.color}
              onChange={e => {
                const newData = [...data];
                newData[i].color = e.target.value;
                onUpdate(item.id, { props: { ...item.props, data: newData } });
              }}
              style={{ width: 18, height: 18, border: "none", background: "none" }}
            />
            <input
              type="text"
              value={d.label}
              onChange={e => {
                const newData = [...data];
                newData[i].label = e.target.value;
                onUpdate(item.id, { props: { ...item.props, data: newData } });
              }}
              className="w-12 border rounded px-1 text-xs"
              style={{ minWidth: 30 }}
            />
            <input
              type="number"
              value={d.value}
              min={0}
              onChange={e => {
                const newData = [...data];
                newData[i].value = Number(e.target.value);
                onUpdate(item.id, { props: { ...item.props, data: newData } });
              }}
              className="w-10 border rounded px-1 text-xs"
              style={{ minWidth: 24 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
  
    }
  };

  return (
  <Rnd
  size={{
    width: item.width || "auto",
    height: item.height || "auto",
  }}
  position={{ x: item.x ?? initialX, y: item.y ?? initialY }}
  bounds="parent"
  onDragStop={(e, d) => onUpdate(item.id, { x: d.x, y: d.y })}
  onResizeStop={(e, direction, ref, delta, position) => {
    onUpdate(item.id, {
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height),
      x: position.x,
      y: position.y,
    });
  }}
  onClick={(e) => {
    e.stopPropagation();
    onSelect();
  }}
  onContextMenu={(e) => {
    e.preventDefault();
    if (typeof window.showCanvasContextMenu === "function") {
      window.showCanvasContextMenu(e, item.id);
    }
  }}
  enableResizing={true}
  style={{
    border: isSelected ? "2px solid blue" : "none",
    boxSizing: "border-box",
  }}
>
  <div style={{ width: "100%", height: "100%" }}>
    {renderContent()}
  </div>
</Rnd>

  );
};

export default CanvasItem;
