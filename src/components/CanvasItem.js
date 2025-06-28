import React, { useEffect, useRef, useState } from "react";
import lowcode from "../assets/images/lowcode.jpeg";
import { FiSearch} from "react-icons/fi";
import { IoIosRadioButtonOff } from "react-icons/io";
import * as FiIcons from "react-icons/fi"; 
import { Rnd } from "react-rnd";

const CanvasItem = ({ item, onUpdate, isSelected, onSelect, isPreviewMode }) => {
  const {
    borderRadius,
    src,
    content,
    onDelete,
    setItems,
    type,
  } = item;
  
// const handleDelete = (idToDelete) => {
//   setItems(prevItems =>
//     prevItems.filter(item => {
//       // Filter out the container and also its children (if any)
//       if (item.id === idToDelete) return false;

//       // ❌ Remove items that belong to a deleted container
//       if (item.parentId === idToDelete) return false;

//       return true; // ✅ keep everything else
//     })
//   );};


const handleDelete = (idToDelete) => {
  setItems((prevItems) => {
    // Find the item to delete
    const target = prevItems.find((item) => item.id === idToDelete);

    // If it's a container with children
    if (target?.children && target.children.length > 0) {
      const childIds = target.children.map((c) => c.id);
      return prevItems.filter((item) => item.id !== idToDelete && !childIds.includes(item.id));
    }

    // For normal items
    return prevItems.filter((item) => item.id !== idToDelete);
  });
};


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
    if (!file || typeof onUpdate !== "function") return;
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
    if (
      !isPreviewMode &&
      (item.width == null || item.height == null) &&
      contentRef.current &&
      typeof onUpdate === "function"
    ) {
      const rect = contentRef.current.getBoundingClientRect();
      onUpdate(item.id, {
        width: Math.ceil(rect.width),
        height: Math.ceil(rect.height),
      });
    }
  }, [item.width, item.height, item.content, item.src]);

  const renderContent = () => {
    switch (type) {

//Form Element
case "submit-button":
   const props = item.props || {}
   const borderRadius = props.borderRadius ? `${props.borderRadius}px` : "0px";
  return (
    <button
      type="button"
      className="w-full h-full px-4 py-2 rounded-md"
      style={{
        ...commonStyle,
        fontSize: props?.fontSize || "16px",
        backgroundColor: props?.backgroundColor || "#4f46e5",
        borderRadius: props?.borderRadius ? `${props.borderRadius}px` : "0px",
        color: props?.textColor || "#ffffff",
        cursor: "grab",
        textAlign: "left", // Ensures text starts from the left
        direction: "ltr", 
      }}
      contentEditable={true}
      suppressContentEditableWarning={true}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(props.id);
      }}
      onInput={(e) =>
        onUpdate(props.id, {
          props: {
            ...props,
            content: e.currentTarget.textContent, // stores manually typed text
          }
        })
      }
    >
      {props?.content || "Submit"}
    </button>
  );

case "textfield":
  
  return (
    <input
      className="w-full h-full"
      style={{
        ...inputStyle,
        fontSize: item.props?.fontSize || "16px",
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
    spellCheck={false}
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
      className="h-full w-full px-2 cursor-pointer focus:outline-none"
      style={{
        backgroundColor: dropdownProps.backgroundColor || "#e5e7eb",
        color: dropdownProps.textColor || "black",
        fontSize: item.props?.fontSize || "16px",
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
        height: searchProps.height || "100%",
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
          height: searchProps.height || "100%",
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
      className="flex flex-col w-full h-full"
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
            props: {
              ...radio2Props,
              label: e.currentTarget.textContent,
            },
          })
        }
        // onClick={(e) => e.stopPropagation()}
        className="outline-none"
        style={{
          color: radio2Props.textColor || "#000000",
          fontSize: radio2Props.fontSize || "14px",
          fontWeight: radio2Props.bold ? "bold" : "normal",
          fontStyle: radio2Props.italic ? "italic" : "normal",
          textDecoration: radio2Props.underline ? "underline" : "none",
          lineHeight: radio2Props.lineHeight || "normal",
          fontFamily: radio2Props.fontFamily || "inherit",
          minWidth: 40,
        }}
      >
        {radio2Props.label || "Radio Option2"}
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

  //Layout Element
case "container":
  const containerProps = item.props || {};
  return (
    <div
      className="w-full h-full p-2 border border-dashed border-gray-400 dark:border-gray-600"
      style={{
        ...commonStyle,
        backgroundColor: containerProps.backgroundColor || "transparent",
        color: containerProps.textColor || "#000000",
        lineHeight: containerProps.lineHeight || "normal",
        borderRadius: item.props?.borderRadius ? `${item.props.borderRadius}px` : "0px", 
      }
      }
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
  // Extract grid properties from item.props or fallback to item.gridType
  const props = item.props || {};
  // Use gridType from item or props
  const gridType = item.gridType || props.gridType || "2-cols";
  const columnsMap = {
    "2-cols": 2,
    "3-cols": 3,
    "4-cols": 4,
    "5-cols": 5,
    "6-cols": 6,
  };
  // Responsive columns (fallback to gridType if not set)
  const cols =
    props.display === "flex"
      ? 1
      : props.cols_lg ||
        props.cols_md ||
        props.cols_sm ||
        props.cols_xl ||
        columnsMap[gridType] ||
        2;

  // Responsive grid columns
  const getResponsiveCols = () => {
    // Try to use the largest breakpoint set, fallback to gridType
    return (
      props.cols_xl ||
      props.cols_lg ||
      props.cols_md ||
      props.cols_sm ||
      columnsMap[gridType] ||
      2
    );
  };

  // Distribute children into columns
  const childrenInCells = Array.from({ length: getResponsiveCols() }, () => []);
  (item.children || []).forEach((child, index) => {
    childrenInCells[index % getResponsiveCols()].push(child);
  });

  const handleDropInColumn = (colIndex, droppedItem) => {
    const updatedChildren = [...(item.children || [])];
    updatedChildren.push({
      ...droppedItem,
      id: droppedItem.id || `child-${Date.now()}`,
      parentGridId: item.id,
      columnIndex: colIndex,
    });
    onUpdate(item.id, { children: updatedChildren });
  };

  // Determine display type (grid, flex, etc.)
  const displayType = props.display || "grid";
  const flexDirection = props.flexDirection || "row";

  // Compose style based on sidebar properties
  const style = {
    backgroundColor: props.backgroundColor || "transparent",
    height: props.height ? `${props.height}px` : "auto",
    width: props.width ? `${props.width}px` : "100%",
    display: displayType,
    ...(displayType === "grid"
      ? {
          gridTemplateColumns: `repeat(${getResponsiveCols()}, minmax(0, 1fr))`,
          gap: "1rem",
        }
      : {}),
    ...(displayType === "flex"
      ? {
          flexDirection,
          gap: "1rem",
        }
      : {}),
  };

  return (
    <div
      className="p-4"
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item.id);
      }}
    >
      {childrenInCells.map((childArray, colIndex) => (
        <div
          key={colIndex}
          className="border border-gray-400 dark:border-gray-700 p-4 rounded"
          style={{
            backgroundColor: "#fafafa",
            flex: displayType === "flex" ? 1 : undefined,
            minWidth: 0,
          }}
          onDrop={(e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData("application/json");
            if (!data) return;
            const droppedItem = JSON.parse(data);
            handleDropInColumn(colIndex, droppedItem);
          }}
          onDragOver={(e) => e.preventDefault()}
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
                onSelect={() =>
                  onUpdate(item.id, { selectedChildId: child.id })
                }
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

case "navbar": {
  const navbarProps = item.props || {}; 
  const height = navbarProps.height ? `${navbarProps.height}px` : "auto";
  const width = navbarProps.width ? `${navbarProps.width}px` : "100%";
  const fontSize = navbarProps.fontSize ? `${navbarProps.fontSize}px` : "16px";
  const borderRadius = navbarProps.borderRadius ? `${navbarProps.borderRadius}px` : "0px";

  const menuItems = navbarProps.menuItems || [
    { id: "Home", label: "Home" },
    { id: "About", label: "About" },
    { id: "Contact", label: "Contact" },
  ];

  const updateMenuItem = (id, newLabel) => {
    const updatedItems = menuItems.map(item =>
      item.id === id ? { ...item, label: newLabel } : item
    );
    onUpdate(item.id, {
      props: { ...navbarProps, menuItems: updatedItems }
    });
  };

  return (
    <aside
      style={{
        ...commonStyle,
        display: "flex",
        flexDirection: "row",
        height: navbarProps.height || "100%",
        width,
        fontSize,
        backgroundColor: navbarProps.backgroundColor || "#f9fafb",
        color: navbarProps.textColor || "#111827",
        boxSizing: "border-box",
        overflowX: "auto",
        gap: "12px",
        justifyContent: navbarProps.justifyContent || "space-between",
        alignItems: "center",
        padding: "8px 12px",
        borderRadius,
      }}
      onClick={(e) => {
        e.stopPropagation();      // Prevent parent deselection
        onSelect(item.id);        // ✅ Trigger SidebarProperties for this navbar
      }}
    >
      {menuItems.map((menu) => (
        <div
          key={menu.id}
          contentEditable
          suppressContentEditableWarning={true}
          spellCheck={false}
          className="cursor-text rounded px-2 py-1"
          onClick={(e) => e.stopPropagation()} // Prevent this from overriding the parent click
          onBlur={(e) => updateMenuItem(menu.id, e.currentTarget.textContent)}
          style={{
            whiteSpace: "pre-wrap",
            outline: "none",
            fontSize,
            borderRadius,
             height: navbarProps.height || "100%",
          }}
        >
          {menu.label}
        </div>
      ))}
    </aside>
  );
}

case "sidebar": {
  const sidebarProps = item.props || {};
  const height = sidebarProps.height ? `${sidebarProps.height}px` : "100%";
  const width = sidebarProps.width ? `${sidebarProps.width}px` : "250px";
  const fontSize = sidebarProps.fontSize ? `${sidebarProps.fontSize}px` : "16px";
  const borderRadius = sidebarProps.borderRadius ? `${sidebarProps.borderRadius}px` : "0px";

  const menuItems = sidebarProps.menuItems || [
    { id: "dashboard", label: "Dashboard" },
    { id: "settings", label: "Settings" },
    { id: "logout", label: "Logout" },
  ];

  const updateMenuItem = (id, newLabel) => {
    const updatedItems = menuItems.map(item =>
      item.id === id ? { ...item, label: newLabel } : item
    );
    onUpdate(item.id, {
      props: { ...sidebarProps, menuItems: updatedItems }
    });
  };

  return (
    <aside
      className="flex flex-col space-y-3 p-4"
      style={{
        ...commonStyle,
        height: sidebarProps.height || "100%",
        backgroundColor: sidebarProps.backgroundColor || "#f9fafb",
        color: sidebarProps.textColor || "#111827",
        boxSizing: "border-box",
        overflowY: "auto",
        overflowX: "auto",
        borderRight: "2px solid #ccc",
        fontSize: sidebarProps.fontSize || "auto",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {menuItems.map((menu) => (
        <div
          key={menu.id}
          contentEditable
          suppressContentEditableWarning={true}
          spellCheck={false}
          className="cursor-text  rounded px-2 py-1"
          onClick={(e) => e.stopPropagation()}
          onBlur={(e) => updateMenuItem(menu.id, e.currentTarget.textContent)}
          style={{
            whiteSpace: "pre-wrap",
            outline: "none",
            fontSize: sidebarProps.fontsize || "auto", // Apply the font size from props
            width: sidebarProps.width|| "auto",
          }}
        >
          {menu.label}
        </div>
      ))}
    </aside>
  );
}

case "footer": {
  const footerProps = item.props || {};
  const content = footerProps.content || "Footer content here";
  const height = footerProps.height ? `${footerProps.height}px` : "150px";
  const fontSize = footerProps.fontSize ? `${footerProps.fontSize}px` : "16px";
  const borderRadius = footerProps.borderRadius ? `${footerProps.borderRadius}px` : "0px";

  return (
    <footer
      className="w-full flex items-center justify-center"
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onBlur={(e) =>
        onUpdate(item.id, {
          props: { ...footerProps, content: e.currentTarget.textContent }
        })
      }
      onClick={(e) => e.stopPropagation()}
      style={{
        backgroundColor: footerProps.backgroundColor || "#f3f4f6",
        color: footerProps.textColor || "#111827",
        height: height,
        minHeight: "40px",
        fontSize: fontSize,
        borderRadius: item.props?.borderRadius ? `${item.props.borderRadius}px` : "0px",
        padding: "0 10px",
        boxSizing: "border-box",
        cursor: "text",
      }}
    >
      {content}
    </footer>
  )
}

case "tabs": {
  const props = item.props || {};
  const height = props.height ? `${props.height}px` : "100%";
  const fontSize = props.fontSize ? `${props.fontSize}px` : "16px";
  const backgroundColor = props.backgroundColor || "#ffffff";
  const textColor = props.textColor || "#111827";
  const activeTabId = props.activeTabId || "tab1";
  const selectedTabId = props.selectedTabId || null;

  const tabItems = props.tabItems || [
    { id: "tab1", label: "Tab 1", content: "Tab 1 Content" },
    { id: "tab2", label: "Tab 2", content: "Tab 2 Content" },
    { id: "tab3", label: "Tab 3", content: "Tab 3 Content" },
  ];

  const setActiveTab = (id) => {
    onUpdate(item.id, {
      props: { ...props, activeTabId: id, selectedTabId: id },
    });
  };

  const updateTabLabel = (id, newLabel) => {
    const updated = tabItems.map(tab =>
      tab.id === id ? { ...tab, label: newLabel } : tab
    );
    onUpdate(item.id, {
      props: { ...props, tabItems: updated },
    });
  };

  const updateTabContent = (id, newContent) => {
    const updated = tabItems.map(tab =>
      tab.id === id ? { ...tab, content: newContent } : tab
    );
    onUpdate(item.id, {
      props: { ...props, tabItems: updated },
    });
  };

  const activeTab = tabItems.find(tab => tab.id === activeTabId);

  return (
    <aside
      style={{
        ...commonStyle,
        backgroundColor,
        color: textColor,
        height: props.height || "100%",
        fontSize: props.fontsize || "auto",
        padding: "10px",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Tab Headers */}
      <div className="flex space-x-4 border-b border-gray-300 mb-2">
        {tabItems.map((tab) => (
          <div
            key={tab.id}
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onBlur={(e) => updateTabLabel(tab.id, e.currentTarget.textContent)}
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab(tab.id);
              onSelect(item.id + "-" + tab.id); // 🔁 This makes Sidebar show tab-specific props
            }}
            style={{
              padding: "4px 10px",
              borderBottom: tab.id === activeTabId ? "2px solid #3b82f6" : "2px solid transparent",
              fontWeight: tab.id === activeTabId ? "bold" : "normal",
              fontSize: props.fontSize || "auto",
              cursor: "pointer",
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </aside>
  );
}

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

 //Media Element
case "image": {
  const imageProps = item.props || {};
  const borderRadius = imageProps.borderRadius
    ? `${imageProps.borderRadius}px`
    : "0px";
const img = (item.images && item.images[item.selectedImageIndex]) || item.images?.[0] || {};
  const triggerFileInput = (e) => {
    e.stopPropagation();
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          onUpdate(item.id, {
            images: [...(item.images || []), { src: loadEvent.target.result, alt: file.name }],
            selectedImageIndex: (item.images || []).length,
          });
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };
  return (
    <div
      className="cursor-pointer w-fit h-fit"
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item.id); // Show properties
      }}
      onDoubleClick={triggerFileInput}
      style={{
        ...commonStyle,
        width: imageProps.width ? `${imageProps.width}px` : "100%",
        height: imageProps.height ? `${imageProps.height}px` : "100%",
        borderRadius,
        overflow: "hidden",
      }}
    >
      
      <img
      src={img.src || lowcode} 
      alt={img.alt || "Image"}
      style={{
        width: imageProps.width ? `${imageProps.width}px` : "100%",
        height: imageProps.height ? `${imageProps.height}px` : "100%",
        objectFit: "contain",
        borderRadius: item.props?.borderRadius ? `${item.props.borderRadius}px` : "0px",
        background: item.props?.backgroundColor || "transparent",
      }}
      draggable={true}
    />
    </div>
  );
}

case "video": {
  const videoProps = item.props || {};
  const borderRadius = videoProps.borderRadius
    ? `${videoProps.borderRadius}px`
    : "0px";
  const triggerFileInput = (e) => {
    e?.stopPropagation();
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "video/*";
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        onUpdate(item.id, {
          src: url,
          props: {
            ...videoProps,
            fileName: file.name,
          },
        });
      }
    };
    fileInput.click();
  };

  // Handle manual URL input for video
  const handleUrlChange = (e) => {
    onUpdate(item.id, {
      src: e.target.value,
      props: {
        ...videoProps,
        fileName: undefined,
      },
    });
  };

  // Only render the video if a src is present (i.e., a video is selected)
  return (
    <div
      className="cursor-pointer w-full h-full"
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item.id);
      }}
      onDoubleClick={triggerFileInput}
      style={{
        ...commonStyle,
        width: videoProps.width ? `${videoProps.width}px` : "100%",
        height: videoProps.height ? `${videoProps.height}px` : "100%",
        borderRadius,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
      }}
    >
      {item.src ? (
        <video
          className="w-full h-full"
          controls
          style={{
            borderRadius,
            background: videoProps.backgroundColor || "transparent",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        >
          <source
            src={item.src}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div
          style={{
            color: "#888",
            fontSize: "1rem",
            textAlign: "center",
            padding: "1rem",
            cursor: "pointer",
          }}
        >
          Double-click to select a video
        </div>
      )}
    </div>
  );
}


//Topography Element
case "H1":
  const h1Props = item.props || {};
  const content = item.content || "Header 1";
  return (
    <h1
      className="font-bold p-2"
      contentEditable
      suppressContentEditableWarning={true}
      spellCheck={false}
      onInput={(e) => item.text = e.currentTarget.textContent}
      style={{
        ...commonStyle,
        fontSize: h1Props.fontSize || "3.5rem",
        color: h1Props.textColor || "inherit",

        lineHeight: h1Props.lineHeight || "normal",
        backgroundColor: h1Props.backgroundColor || "transparent",
      }}
    >
      {content}
    </h1>
  );

case "H2":
  const h2Props = item.props || {};
  const content1 = item.content || "Header 2";
  return (
    <h2
      className="font-bold p-2"
      contentEditable
      suppressContentEditableWarning={true}
      spellCheck={false}
      onInput={(e) => item.text = e.currentTarget.textContent}
      style={{
        ...commonStyle,
        fontSize: h2Props.fontSize || "3.0rem",
        color: h2Props.textColor || "inherit",
        lineHeight: h2Props.lineHeight || "normal",
        backgroundColor: h2Props.backgroundColor || "transparent",
      }}
    >
    {content1}
    </h2>
  );

case "H3":
  const h3Props = item.props || {};
  return (
    <h3
      className="text-center font-bold p-2"
      style={{
        ...commonStyle, 
        fontSize: "2.5rem",
        color: h3Props.textColor || "inherit", }}
       contentEditable
      suppressContentEditableWarning={true}
      onInput={(e) => item.text = e.currentTarget.textContent}
      spellCheck={false}
    >
      {item.text || "Header 3"}
    </h3>
  );

case "H4":
    const h4Props = item.props || {};
  return (
    <h4
      className="text-center font-bold p-2"
      style={{ ...commonStyle, 
        fontSize: "2.0rem", 
        color: h4Props.textColor || "inherit",
       }}
      contentEditable
      suppressContentEditableWarning={true}
      onInput={(e) => item.text = e.currentTarget.textContent}
      spellCheck={false}
    >
    {item.text || "Header 4"}
    </h4>
  );

case "H5":
  const h5Props = item.props || {};
  return (
    <h5
      className="text-center font-bold p-2"
      style={{ ...commonStyle, fontSize: "1.5rem", color: h5Props.textColor || "inherit",}}
      contentEditable
      suppressContentEditableWarning={true}
      onInput={(e) => item.text = e.currentTarget.textContent}
      spellCheck={false}
    >
    {item.text || "Header 5"}
    </h5>
  );  
  // Add a default case to handle unknown types
  default:
    return null;
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
