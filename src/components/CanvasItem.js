import React, { useEffect, useRef, useState } from "react";
import lowcode from "../assets/images/lowcode.jpeg";
import { FiSearch } from "react-icons/fi";
import { IoIosRadioButtonOff } from "react-icons/io";
import * as FiIcons from "react-icons/fi";
import { Rnd } from "react-rnd";

const CanvasItem = ({
  item,
  onUpdate,
  isSelected,
  onSelect,
  isPreviewMode,
  id,
}) => {
  const { borderRadius, src, content, onDelete, handleUpdate, setItems, type } =
    item;

  // when you right click manu panel for delete
  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 });
  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
  };
  const handleCloseMenu = () => setMenu({ ...menu, visible: false });
  const handleDelete = () => {
    handleCloseMenu();
    if (typeof onUpdate === "function") {
      onUpdate(item.id, { delete: true }); // You can handle actual deletion in parent
    }
  };
  const handleEdit = () => {
    handleCloseMenu();
    if (typeof onSelect === "function") {
      onSelect(item.id); // Or open a modal, etc.
    }
  };
  // Optional: Close menu on click outside
  useEffect(() => {
    if (!menu.visible) return;
    const close = () => setMenu({ ...menu, visible: false });
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [menu.visible]);

  //position of items on canvas
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

  // Utility function to preserve cursor position
  const preserveCursorPosition = (element, callback) => {
    if (isPreviewMode) return callback();
    
    const selection = window.getSelection();
    const cursorPos = selection.rangeCount > 0 ? selection.getRangeAt(0).startOffset : 0;
    
    callback();
    
    requestAnimationFrame(() => {
      try {
        const range = document.createRange();
        const textNode = element.firstChild || element;
        if (textNode.nodeType === Node.TEXT_NODE) {
          range.setStart(textNode, Math.min(cursorPos, textNode.textContent.length));
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } catch (err) {
        // Ignore positioning errors
      }
    });
  };

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
        const props = item.props || {};
        const borderRadius = props.borderRadius
          ? `${props.borderRadius}px`
          : "0px";
        return (
          <button
            type="button"
            className="w-full h-full px-4 py-2 rounded-md"
            style={{
              ...commonStyle,
              fontSize: props?.fontSize || "16px",
              backgroundColor: props?.backgroundColor || "#4f46e5",
              borderRadius: props?.borderRadius
                ? `${props.borderRadius}px`
                : "0px",
              color: props?.textColor || "#ffffff",
              cursor: "grab",
              textAlign: "left",
              direction: "ltr",
            }}
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning={true}
            onClick={(e) => {
              e.stopPropagation();
              if (typeof onSelect === "function") {
                onSelect(props.id);
              }
            }}
            onInput={(e) => {
              if (!isPreviewMode && typeof onUpdate === "function") {
                preserveCursorPosition(e.currentTarget, () => {
                  onUpdate(item.id, { 
                    props: {
                      ...props,
                      content: e.currentTarget.textContent
                    }
                  });
                });
              }
            }}
          >
            {props?.content || "Submit"}
          </button>
        );

      case "textfield":
        return (
          <input
            className="w-full h-full focus:outline-none"
            placeholder={item.props?.placeholder || "Enter text..."}
            style={{
              ...inputStyle,
              backgroundColor: item.props?.backgroundColor || "transparent",
              color: item.props?.textColor || "black",
              fontSize: item.props?.fontSize || "auto",
              textAlign: item.props?.textAlign || "left",
              lineHeight: item.props?.lineHeight || "normal",
              padding: item.props?.padding || "8px",
              border: isSelected ? "2px solid gray" : "1px solid #6b7280",
              borderRadius: item.props?.borderRadius || "10px",
            }}
            value={item.props?.content || ""}
            onChange={(e) => {
              if (!isPreviewMode && typeof onUpdate === "function") {
                onUpdate(item.id, {
                  props: {
                    ...item.props,
                    content: e.target.value,
                  },
                });
              }
            }}
          />
        );

      case "text":
        return (
          <textarea
            className="w-full h-full focus:outline-none resize-none"
            placeholder="Enter text..."
            style={{
              ...inputStyle,
              color: item.props?.textColor || "black",
              backgroundColor: item.props?.backgroundColor || "transparent",
              fontSize: item.props?.fontSize || "16px",
              fontWeight: item.props?.bold ? "bold" : "normal",
              fontStyle: item.props?.italic ? "italic" : "normal",
              textDecoration: item.props?.underline ? "underline" : "none",
              textAlign: item.props?.textAlign || "left",
              lineHeight: item.props?.lineHeight || "normal",
              padding: item.props?.padding || "8px",
              fontFamily: item.props?.fontFamily || "Arial, sans-serif",
            }}
            value={item.props?.content || ""}
            onChange={(e) => {
              if (!isPreviewMode && typeof onUpdate === "function") {
                onUpdate(item.id, {
                  props: {
                    ...item.props,
                    content: e.target.value,
                  },
                });
              }
            }}
          />
        );

      case "checkbox":
        const checkboxProps = item.props || {};
        const labelStyle = {
          color: checkboxProps.textColor || "black",
          backgroundColor: checkboxProps.backgroundColor || "transparent",
          fontSize: checkboxProps.fontSize || "16px",
          padding: "0.25rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          width: "100%",
          height: "100%",
          cursor: "pointer",
        };

        return (
          <label style={{ ...commonStyle, ...labelStyle }}>
            <input 
              type="checkbox" 
              checked={checkboxProps.checked || false}
              onChange={(e) => {
                if (!isPreviewMode && typeof onUpdate === "function") {
                  onUpdate(item.id, {
                    props: {
                      ...checkboxProps,
                      checked: e.target.checked,
                    },
                  });
                }
              }}
            />
            <span
              contentEditable={!isPreviewMode}
              suppressContentEditableWarning
              onClick={(e) => e.stopPropagation()}
              onInput={(e) => {
                if (!isPreviewMode && typeof onUpdate === "function") {
                  preserveCursorPosition(e.currentTarget, () => {
                    onUpdate(item.id, {
                      props: {
                        ...checkboxProps,
                        content: e.currentTarget.textContent,
                      },
                    });
                  });
                }
              }}
              style={{
                direction: "ltr",
                textAlign: "left",
              }}
            >
              {checkboxProps.content || "Check me"}
            </span>
          </label>
        );

      case "icon":
        const SelectedIcon = FiIcons[item.props?.iconName] || FiIcons.FiBox;
        return (
          <div style={{ ...commonStyle }}>
            <SelectedIcon
              size={parseInt(item.props?.fontSize) || 24}
              color={item.props?.textColor || "#000"}
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
            value={dropdownProps.content || ""}
            onChange={(e) => {
              if (!isPreviewMode && typeof onUpdate === "function") {
                onUpdate(item.id, {
                  props: {
                    ...dropdownProps,
                    content: e.target.value,
                  },
                });
              }
            }}
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
              width: searchProps.width || "100%",
              height: searchProps.height || "100%",
            }}
          >
            <FiSearch
              style={{
                position: "absolute",
                top: "50%",
                left: "8px",
                transform: "translateY(-50%)",
                color: "#6b7280",
                pointerEvents: "none",
                fontSize: "1rem",
              }}
            />
            <input
              type="search"
              value={searchProps.content || ""}
              placeholder={searchProps.placeholder || "Search..."}
              className="w-full"
              style={{
                paddingLeft: "1.5rem",
                backgroundColor: searchProps.backgroundColor || "#e5e7eb",
                color: searchProps.textColor || "#000000",
                fontSize: searchProps.fontSize || "14px",
                borderRadius: searchProps.borderRadius || "10px",
                border: isSelected ? "2px solid blue" : "1px solid #6b7280",
                height: searchProps.height || "100%",
              }}
              onChange={(e) => {
                if (!isPreviewMode && typeof onUpdate === "function") {
                  onUpdate(item.id, {
                    props: {
                      ...searchProps,
                      content: e.target.value,
                    },
                  });
                }
              }}
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
              gap: "1.5rem",
              listStyleType: "disc",
            }}
          >
            {listContent.split(",").map((li, i, arr) => (
              <li
                key={i}
                contentEditable={!isPreviewMode}
                suppressContentEditableWarning
                onInput={(e) => {
                  if (!isPreviewMode && typeof onUpdate === "function") {
                    preserveCursorPosition(e.currentTarget, () => {
                      const newContent = [...arr];
                      newContent[i] = e.currentTarget.textContent;
                      onUpdate(item.id, { content: newContent.join(",") });
                    });
                  }
                }}
                className="cursor-text outline-none list-item"
                style={{
                  display: "list-item",
                  listStylePosition: "inside",
                  direction: "ltr",
                  textAlign: "left",
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
            }}
          >
            <input
              type="radio"
              name={radioProps.name || `radio-group-${item.id}`}
              checked={radioProps.checked || false}
              onChange={() => {
                if (!isPreviewMode && typeof onUpdate === "function") {
                  onUpdate(item.id, {
                    props: { ...radioProps, checked: true },
                  });
                }
              }}
              className="form-radio text-indigo-600"
              style={{
                width: 18,
                height: 18,
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <span
              contentEditable={!isPreviewMode}
              suppressContentEditableWarning
              spellCheck={false}
              onInput={(e) => {
                if (!isPreviewMode && typeof onUpdate === "function") {
                  preserveCursorPosition(e.currentTarget, () => {
                    onUpdate(item.id, {
                      props: {
                        ...radioProps,
                        label: e.currentTarget.textContent,
                      },
                    });
                  });
                }
              }}
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
                direction: "ltr",
                textAlign: "left",
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
            }}
          >
            <IoIosRadioButtonOff
              size={20}
              className="text-black dark:text-black"
            />
            <span
              contentEditable={!isPreviewMode}
              suppressContentEditableWarning
              spellCheck={false}
              onInput={(e) => {
                if (!isPreviewMode && typeof onUpdate === "function") {
                  preserveCursorPosition(e.currentTarget, () => {
                    onUpdate(item.id, {
                      props: {
                        ...radio2Props,
                        label: e.currentTarget.textContent,
                      },
                    });
                  });
                }
              }}
              className="outline-none"
              style={{
                color: radio2Props.textColor || "#000000",
                fontSize: radio2Props.fontSize || "14px",
                lineHeight: radio2Props.lineHeight || "normal",
                fontFamily: radio2Props.fontFamily || "inherit",
                minWidth: 40,
                direction: "ltr",
                textAlign: "left",
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
              contentEditable={!isPreviewMode}
              suppressContentEditableWarning
              spellCheck={false}
              onInput={(e) => {
                if (!isPreviewMode && typeof onUpdate === "function") {
                  preserveCursorPosition(e.currentTarget, () => {
                    onUpdate(item.id, {
                      content: e.currentTarget.textContent,
                    });
                  });
                }
              }}
              onClick={(e) => e.stopPropagation()}
              style={{ 
                outline: "none", 
                minWidth: 40,
                direction: "ltr",
                textAlign: "left",
              }}
            >
              {labelText}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (typeof onSelect === "function") {
                  onSelect(item.id);
                }
                if (!isPreviewMode && typeof onUpdate === "function") {
                  onUpdate(item.id, {
                    props: {
                      ...toggleProps,
                      checked: !toggleProps.checked,
                    },
                  });
                }
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
              borderRadius: item.props?.borderRadius
                ? `${item.props.borderRadius}px`
                : "0px",
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (typeof onSelect === "function") {
                onSelect();
              }
            }}
          >
            {item.children && item.children.length > 0 ? (
              item.children.map((child) => (
                <CanvasItem
                  key={child.id}
                  item={child}
                  handleUpdate={(childId, updates) => {
                    const updatedChildren = item.children.map((c) =>
                      c.id === childId ? { ...c, ...updates } : c
                    );
                    if (typeof onUpdate === "function") {
                      onUpdate(item.id, { children: updatedChildren });
                    }
                  }}
                  isSelected={child.id === item.selectedChildId}
                  onSelect={() => {
                    if (typeof onUpdate === "function") {
                      onUpdate(item.id, { selectedChildId: child.id });
                    }
                  }}
                />
              ))
            ) : (
              <div className="text-gray-400 text-sm italic">
                {/* Drop items here... */}
              </div>
            )}
          </div>
        );

      case "grid": {
        const props = item.props || {};
        const gridType = item.gridType || props.gridType || "2-cols";
        const columnsMap = {
          "2-cols": 2,
          "3-cols": 3,
          "4-cols": 4,
          "5-cols": 5,
          "6-cols": 6,
        };
        const cols =
          props.display === "flex"
            ? 1
            : props.cols_lg ||
              props.cols_md ||
              props.cols_sm ||
              props.cols_xl ||
              columnsMap[gridType] ||
              2;

        const getResponsiveCols = () => {
          return (
            props.cols_xl ||
            props.cols_lg ||
            props.cols_md ||
            props.cols_sm ||
            columnsMap[gridType] ||
            2
          );
        };

        const childrenInCells = Array.from(
          { length: getResponsiveCols() },
          () => []
        );
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
          if (typeof onUpdate === "function") {
            onUpdate(item.id, { children: updatedChildren });
          }
        };

        const displayType = props.display || "grid";
        const flexDirection = props.flexDirection || "row";

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
              if (typeof onSelect === "function") {
                onSelect(item.id);
              }
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
                        if (typeof onUpdate === "function") {
                          onUpdate(item.id, { children: updatedChildren });
                        }
                      }}
                      isSelected={
                        isSelected && child.id === item.selectedChildId
                      }
                      onSelect={() => {
                        if (typeof onUpdate === "function") {
                          onUpdate(item.id, { selectedChildId: child.id });
                        }
                      }}
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
        const fontSize = navbarProps.fontSize
          ? `${navbarProps.fontSize}px`
          : "16px";
        const borderRadius = navbarProps.borderRadius
          ? `${navbarProps.borderRadius}px`
          : "0px";

        const menuItems = navbarProps.menuItems || [
          { id: "Home", label: "Home" },
          { id: "About", label: "About" },
          { id: "Contact", label: "Contact" },
        ];

        const updateMenuItem = (id, newLabel) => {
          const updatedItems = menuItems.map((menuItem) =>
            menuItem.id === id ? { ...menuItem, label: newLabel } : menuItem
          );
          if (typeof onUpdate === "function") {
            onUpdate(item.id, {
              props: { ...navbarProps, menuItems: updatedItems },
            });
          }
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
              e.stopPropagation();
              if (typeof onSelect === "function") {
                onSelect(item.id);
              }
            }}
          >
            {menuItems.map((menu) => (
              <div
                key={menu.id}
                contentEditable={!isPreviewMode}
                suppressContentEditableWarning={true}
                spellCheck={false}
                className="cursor-text rounded px-2 py-1"
                onClick={(e) => e.stopPropagation()}
                onInput={(e) => {
                  if (!isPreviewMode && typeof onUpdate === "function") {
                    preserveCursorPosition(e.currentTarget, () => {
                      updateMenuItem(menu.id, e.currentTarget.textContent);
                    });
                  }
                }}
                style={{
                  whiteSpace: "pre-wrap",
                  outline: "none",
                  fontSize,
                  borderRadius,
                  height: navbarProps.height || "100%",
                  direction: "ltr",
                  textAlign: "left",
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
        const height = sidebarProps.height
          ? `${sidebarProps.height}px`
          : "100%";
        const width = sidebarProps.width ? `${sidebarProps.width}px` : "250px";
        const fontSize = sidebarProps.fontSize
          ? `${sidebarProps.fontSize}px`
          : "16px";
        const borderRadius = sidebarProps.borderRadius
          ? `${sidebarProps.borderRadius}px`
          : "0px";

        const menuItems = sidebarProps.menuItems || [
          { id: "dashboard", label: "Dashboard" },
          { id: "settings", label: "Settings" },
          { id: "logout", label: "Logout" },
        ];

        const updateMenuItem = (id, newLabel) => {
          const updatedItems = menuItems.map((menuItem) =>
            menuItem.id === id ? { ...menuItem, label: newLabel } : menuItem
          );
          if (typeof onUpdate === "function") {
            onUpdate(item.id, {
              props: { ...sidebarProps, menuItems: updatedItems },
            });
          }
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
                contentEditable={!isPreviewMode}
                suppressContentEditableWarning={true}
                spellCheck={false}
                className="cursor-text rounded px-2 py-1"
                onClick={(e) => e.stopPropagation()}
                onInput={(e) => {
                  if (!isPreviewMode && typeof onUpdate === "function") {
                    preserveCursorPosition(e.currentTarget, () => {
                      updateMenuItem(menu.id, e.currentTarget.textContent);
                    });
                  }
                }}
                style={{
                  whiteSpace: "pre-wrap",
                  outline: "none",
                  fontSize: sidebarProps.fontsize || "auto",
                  width: sidebarProps.width || "auto",
                  direction: "ltr",
                  textAlign: "left",
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
        const height = footerProps.height ? `${footerProps.height}px` : "100%";
        const fontSize = footerProps.fontSize
          ? `${footerProps.fontSize}px`
          : "16px";
        const borderRadius = footerProps.borderRadius
          ? `${footerProps.borderRadius}px`
          : "0px";

        return (
          <footer
            className="w-full flex items-center justify-center"
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning
            spellCheck={false}
            onInput={(e) => {
              if (!isPreviewMode && typeof onUpdate === "function") {
                preserveCursorPosition(e.currentTarget, () => {
                  onUpdate(item.id, {
                    props: {
                      ...footerProps,
                      content: e.currentTarget.textContent,
                    },
                  });
                });
              }
            }}
            style={{
              ...commonStyle,
              height: footerProps.height || "100%",
              backgroundColor: footerProps.backgroundColor || "#f3f4f6",
              color: footerProps.textColor || "#111827",
              fontSize: fontSize,
              borderRadius: item.props?.borderRadius
                ? `${item.props.borderRadius}px`
                : "0px",
              padding: "0 10px",
              boxSizing: "border-box",
              cursor: "text",
              direction: "ltr",
              textAlign: "left",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </footer>
        );
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
          if (!isPreviewMode && typeof onUpdate === "function") {
            onUpdate(item.id, {
              props: { ...props, activeTabId: id, selectedTabId: id },
            });
          }
        };

        const updateTabLabel = (id, newLabel) => {
          const updated = tabItems.map((tab) =>
            tab.id === id ? { ...tab, label: newLabel } : tab
          );
          if (!isPreviewMode && typeof onUpdate === "function") {
            onUpdate(item.id, {
              props: { ...props, tabItems: updated },
            });
          }
        };

        const updateTabContent = (id, newContent) => {
          const updated = tabItems.map((tab) =>
            tab.id === id ? { ...tab, content: newContent } : tab
          );
          if (!isPreviewMode && typeof onUpdate === "function") {
            onUpdate(item.id, {
              props: { ...props, tabItems: updated },
            });
          }
        };

        const activeTab = tabItems.find((tab) => tab.id === activeTabId);

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
            <div className="flex space-x-4 border-b border-gray-300 mb-2">
              {tabItems.map((tab) => (
                <div
                  key={tab.id}
                  contentEditable={!isPreviewMode}
                  suppressContentEditableWarning
                  spellCheck={false}
                  onInput={(e) => {
                    if (!isPreviewMode && typeof onUpdate === "function") {
                      preserveCursorPosition(e.currentTarget, () => {
                        updateTabLabel(tab.id, e.currentTarget.textContent);
                      });
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (typeof setActiveTab === "function") {
                      setActiveTab(tab.id);
                    }
                    if (typeof onSelect === "function") {
                      onSelect(item.id + "-" + tab.id);
                    }
                  }}
                  style={{
                    padding: "4px 10px",
                    borderBottom:
                      tab.id === activeTabId
                        ? "2px solid #3b82f6"
                        : "2px solid transparent",
                    fontWeight: tab.id === activeTabId ? "bold" : "normal",
                    fontSize: props.fontSize || "auto",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    userSelect: "none",
                    direction: "ltr",
                    textAlign: "left",
                  }}
                >
                  {tab.label}
                </div>
              ))}
            </div>
          </aside>
        );
      }

      //Media Element
      case "image": {
  const imageProps = item.props || {};
  const borderRadius = imageProps.borderRadius
    ? `${imageProps.borderRadius}px`
    : "0px";

  const width = imageProps.width ? `${imageProps.width}px` : "auto";
  const height = imageProps.height ? `${imageProps.height}px` : "auto";

  const img =
    (item.images && item.images[item.selectedImageIndex]) ||
    item.images?.[0] ||
    {};

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
          const newImage = {
            src: loadEvent.target.result,
            alt: file.name,
          };

          if (typeof onUpdate === "function") {
            onUpdate(item.id, {
              images: [...(item.images || []), newImage],
              selectedImageIndex: (item.images || []).length,
            });
          }
        };

        if (file) {
          reader.readAsDataURL(file);
        }
      }
    };
    fileInput.click();
  };

  return (
    <div
      className="cursor-move w-fit h-fit"
      onClick={(e) => {
        e.stopPropagation();
        if (typeof onSelect === "function") {
          onSelect(item.id);
        }
      }}
      onDoubleClick={triggerFileInput}
      style={{
        ...commonStyle,
        height: imageProps.height || "auto",
        width: imageProps.width || "auto",
        borderRadius,
        overflow: "hidden",
        background: imageProps.backgroundColor || "transparent",
        // Add a visible border when selected
        border: isSelected && !isPreviewMode ? "2px solid #3b82f6" : "none",
      }}
    >
      <img
        src={img.src || lowcode}
        alt={img.alt || "Image"}
        style={{
          width: "100%",
          height: "100%",
          objectFit: imageProps.objectFit || "contain",
          borderRadius,
          pointerEvents: "none", // Let Rnd handle drag events
        }}
        // draggable={false} // REMOVE or set to false
      />
    </div>
  );
}

      case "video": {
        const videoProps = item.props || {};
        const borderRadius = videoProps.borderRadius
          ? `${videoProps.borderRadius}px`
          : "0px";
        const width = videoProps.width ? `${videoProps.width}px` : "100%";
        const height = videoProps.height ? `${videoProps.height}px` : "100%";
        
        const triggerFileInput = (e) => {
          e?.stopPropagation();
          const fileInput = document.createElement("input");
          fileInput.type = "file";
          fileInput.accept = "video/*";
          fileInput.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
              const url = URL.createObjectURL(file);
              if (typeof onUpdate === "function") {
                onUpdate(item.id, {
                  src: url,
                  props: {
                    ...videoProps,
                    fileName: file.name,
                  },
                });
              }
            }
          };
          fileInput.click();
        };

        const handleUrlChange = (e) => {
          if (typeof onUpdate === "function") {
            onUpdate(item.id, {
              src: e.target.value,
              props: {
                ...videoProps,
                fileName: undefined,
              },
            });
          }
        };

        return (
          <div
            className="cursor-pointer w-full h-full"
            onClick={(e) => {
              e.stopPropagation();
              if (typeof onSelect === "function") {
                onSelect(item.id);
              }
            }}
            onDoubleClick={triggerFileInput}
            style={{
              ...commonStyle,
              height: videoProps.height || "100%",
              width: videoProps.height || "100%",
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
                <source src={item.src} type="video/mp4" />
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

      //Typography Element
      case "H1":
        const h1Props = item.props || {};
        const h1Content = item.content || "Header 1";
        return (
          <h1
            className="font-bold p-2"
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning={true}
            spellCheck={false}
            onInput={(e) => {
              if (!isPreviewMode && typeof onUpdate === "function") {
                preserveCursorPosition(e.currentTarget, () => {
                  onUpdate(item.id, { 
                    content: e.currentTarget.textContent 
                  });
                });
              }
            }}
            style={{
              ...commonStyle,
              fontSize: h1Props.fontSize || "3.5rem",
              color: h1Props.textColor || "inherit",
              lineHeight: h1Props.lineHeight || "normal",
              backgroundColor: h1Props.backgroundColor || "transparent",
              direction: "ltr",
              textAlign: "left",
            }}
          >
            {h1Content}
          </h1>
        );

      case "H2":
        const h2Props = item.props || {};
        const h2Content = item.content || "Header 2";
        return (
          <h2
            className="font-bold p-2"
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning={true}
            spellCheck={false}
            onInput={(e) => {
              if (!isPreviewMode && typeof onUpdate === "function") {
                preserveCursorPosition(e.currentTarget, () => {
                  onUpdate(item.id, { 
                    content: e.currentTarget.textContent 
                  });
                });
              }
            }}
            style={{
              ...commonStyle,
              fontSize: h2Props.fontSize || "3.0rem",
              color: h2Props.textColor || "inherit",
              lineHeight: h2Props.lineHeight || "normal",
              backgroundColor: h2Props.backgroundColor || "transparent",
              direction: "ltr",
              textAlign: "left",
            }}
          >
            {h2Content}
          </h2>
        );

      case "H3":
        const h3Props = item.props || {};
        const h3Content = item.content || item.text || "Header 3";
        return (
          <h3
            className="font-bold p-2"
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning={true}
            spellCheck={false}
            onInput={(e) => {
              if (!isPreviewMode && typeof onUpdate === "function") {
                preserveCursorPosition(e.currentTarget, () => {
                  onUpdate(item.id, { 
                    content: e.currentTarget.textContent 
                  });
                });
              }
            }}
            style={{
              ...commonStyle,
              fontSize: h3Props.fontSize || "2.5rem",
              color: h3Props.textColor || "inherit",
              lineHeight: h3Props.lineHeight || "normal",
              backgroundColor: h3Props.backgroundColor || "transparent",
              direction: "ltr",
              textAlign: "left",
            }}
          >
            {h3Content}
          </h3>
        );

      case "H4":
        const h4Props = item.props || {};
        const h4Content = item.content || item.text || "Header 4";
        return (
          <h4
            className="font-bold p-2"
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning={true}
            spellCheck={false}
            onInput={(e) => {
              if (!isPreviewMode && typeof onUpdate === "function") {
                preserveCursorPosition(e.currentTarget, () => {
                  onUpdate(item.id, { 
                    content: e.currentTarget.textContent 
                  });
                });
              }
            }}
            style={{
              ...commonStyle,
              fontSize: h4Props.fontSize || "2.0rem",
              color: h4Props.textColor || "inherit",
              lineHeight: h4Props.lineHeight || "normal",
              backgroundColor: h4Props.backgroundColor || "transparent",
              direction: "ltr",
              textAlign: "left",
            }}
          >
            {h4Content}
          </h4>
        );

      case "H5":
        const h5Props = item.props || {};
        const h5Content = item.content || item.text || "Header 5";
        return (
          <h5
            className="font-bold p-2"
            contentEditable={!isPreviewMode}
            suppressContentEditableWarning={true}
            spellCheck={false}
            onInput={(e) => {
              if (!isPreviewMode && typeof onUpdate === "function") {
                preserveCursorPosition(e.currentTarget, () => {
                  onUpdate(item.id, { 
                    content: e.currentTarget.textContent 
                  });
                });
              }
            }}
            style={{
              ...commonStyle,
              fontSize: h5Props.fontSize || "1.5rem",
              color: h5Props.textColor || "inherit",
              lineHeight: h5Props.lineHeight || "normal",
              backgroundColor: h5Props.backgroundColor || "transparent",
              direction: "ltr",
              textAlign: "left",
            }}
          >
            {h5Content}
          </h5>
        );

      // Divider case that was missing from original
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
              margin: `${item.props?.margin || 32}px 0`,
            }}
            onClick={(e) => e.stopPropagation()}
          />
        );

      // Add a default case to handle unknown types
      default:
        return null;
    }
  };

  if (isPreviewMode) {
    // En mode preview, occupe tout l'espace parent (plein écran), 
    // positionne et scale le contenu à l'intérieur
    return (
      <div
        style={{
          position: "absolute",
          left: item.x ?? 0,
          top: item.y ?? 0,
          width: item.width ?? "auto",
          height: item.height ?? "auto",
          pointerEvents: "none",
          // Pour que l'item occupe tout l'espace parent si width/height non définis
          minWidth: 0,
          minHeight: 0,
          maxWidth: "100vw",
          maxHeight: "100vh",
          boxSizing: "border-box",
          ...item.props,
        }}
      >
        {renderContent()}
      </div>
    );
  }

  return (
    <Rnd
      size={{
        width: item.width || "auto",
        height: item.height || "auto",
      }}
      position={{ x: item.x ?? initialX, y: item.y ?? initialY }}
      bounds="parent"
      disableDragging={isPreviewMode}
      enableResizing={!isPreviewMode}
      onDragStop={(e, d) => {
        if (!isPreviewMode && typeof onUpdate === "function") {
          onUpdate(item.id, { x: d.x, y: d.y });
        }
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        if (!isPreviewMode && typeof onUpdate === "function") {
          onUpdate(item.id, {
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
            x: position.x,
            y: position.y,
          });
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        if (typeof window.showCanvasContextMenu === "function") {
          window.showCanvasContextMenu(e, item.id);
        }
      }}
      onClick={(e) => {
        if (!isPreviewMode) {
          e.stopPropagation();
          typeof onSelect === "function" && onSelect();
        }
      }}
      enableUserSelectHack={false}
      dragAxis={isPreviewMode ? "none" : "both"}
      resizeHandleComponent={isPreviewMode ? {} : undefined}
      resizeHandleStyles={isPreviewMode ? {} : undefined}
      className={isPreviewMode ? "pointer-events-none" : ""}
      style={{
        border: isSelected && !isPreviewMode ? "2px solid blue" : "none",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%", height: "100%", pointerEvents: "auto" }}>
        {renderContent()}
      </div>

      {/* Context Menu */}
      {menu.visible && (
        <div
          style={{
            position: "fixed",
            top: menu.y,
            left: menu.x,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 4,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 9999,
            minWidth: 120,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            style={{
              display: "block",
              width: "100%",
              padding: "8px 16px",
              border: "none",
              background: "none",
              textAlign: "left",
              cursor: "pointer",
            }}
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            style={{
              display: "block",
              width: "100%",
              padding: "8px 16px",
              border: "none",
              background: "none",
              textAlign: "left",
              color: "red",
              cursor: "pointer",
            }}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </Rnd>
  );
};

export default CanvasItem;