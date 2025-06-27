export const generateReactCode = (items) => {
  return items
    .map((item, index) => {
      const { type, x, y, content = "", props = {} } = item;
      const style = `absolute left-[${x}px] top-[${y}px]`;

      switch (type) {
        // Typographie
        case "heading":
          return `<h1 key={${index}} className="${style} text-2xl font-bold">${content || "Heading"}</h1>`;

        case "paragraph":
          return `<p key={${index}} className="${style} text-gray-700">${content || "Lorem ipsum dolor sit amet..."}</p>`;

        // Médias
        case "image":
          return `<img key={${index}} src="${props.src || "https://via.placeholder.com/150"}" alt="Canvas" className="${style} w-[100px] h-[100px] object-cover" />`;

        case "video":
          return `<video key={${index}} controls className="${style} w-[200px] h-[150px]">
                        <source src="${props.src || "https://www.w3schools.com/html/mov_bbb.mp4"}" type="video/mp4" />
                        Your browser does not support the video tag.
                  </video>`;

        // Formulaires
        case "textfield":
          return `<input key={${index}} type="text" defaultValue="${content}" placeholder="Enter text..." className="${style} border border-gray-300 p-1" />`;

        case "submit-button":
          return `<button key={${index}} className="${style} bg-blue-500 text-white py-2 px-4 rounded">${content || "Submit"}</button>`;

        case "checkbox":
          return `<label key={${index}} className="${style} flex items-center gap-2">
                        <input type="checkbox" />
                        <span>${content || "Check me"}</span>
                  </label>`;

        case "dropdown":
          return `<select key={${index}} className="${style} p-1 border border-gray-300">
                        <option>${content || "Select an option"}</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                  </select>`;

        case "search":
          return `<input key={${index}} type="search" placeholder="${content || "Search..."}" className="${style} p-1 border border-gray-300" />`;

        // Navigation
        case "navbar":
          return `<nav key={${index}} className="${style} bg-gray-800 text-white p-2 flex gap-4">
                        <span>Home</span>
                        <span>About</span>
                        <span>Contact</span>
                  </nav>`;

        case "sidebar":
          return `<aside key={${index}} className="${style} bg-gray-200 p-2 space-y-2">
                        <div>Dashboard</div>
                        <div>Settings</div>
                        <div>Logout</div>
                  </aside>`;

        case "tabs":
          return `<div key={${index}} className="${style} flex border-b-2 border-gray-300">
                        <button className="px-4 py-2 border-b-2 border-blue-500">Tab 1</button>
                        <button className="px-4 py-2">Tab 2</button>
                  </div>`;

        case "breadcrumbs":
          return `<div key={${index}} className="${style} text-sm text-gray-500">Home &gt; Category &gt; Page</div>`;

        // Layout
        case "grid":
          return `<div key={${index}} className="${style} grid grid-cols-2 gap-2">
                        <div className="bg-gray-100 p-2">Col 1</div>
                        <div className="bg-gray-200 p-2">Col 2</div>
                  </div>`;

        case "headers":
          return `<header key={${index}} className="${style} bg-blue-100 p-4 text-center font-bold">Header</header>`;

        case "footer":
          return `<footer key={${index}} className="${style} bg-gray-300 p-4 text-center">Footer Content</footer>`;

        case "sidepanel":
          return `<div key={${index}} className="${style} bg-gray-100 p-2">Side Panel Content</div>`;

        case "card":
          return `<div key={${index}} className="${style} bg-white shadow p-4 rounded-lg">
                        <h2 className="text-lg font-bold">Card Title</h2>
                        <p>Card content goes here.</p>
                  </div>`;

        default:
          return `{/* Unknown component type: ${type} */}`;
      }
    })
    .join("\n");
};
