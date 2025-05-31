export const generateHTMLCode = (items) => {
    return items
        .map((item) => {
            const { type, x, y, content = "", props = {} } = item;
            const style = `position: absolute; left: ${x}px; top: ${y}px;`;

            switch (type) {
                // Typographie
                case "heading":
                    return `<h1 style="${style} font-size: 24px; font-weight: bold;">${content || "Heading"}</h1>`;

                case "paragraph":
                    return `<p style="${style} color: #374151;">${content || "Lorem ipsum dolor sit amet..."}</p>`;

                // Médias
                case "image":
                    return `<img src="${props.src || "https://via.placeholder.com/150"}" alt="Canvas Image" style="${style} width: 100px; height: 100px; object-fit: cover;" />`;

                case "video":
                    return `
              <video controls style="${style} width: 200px; height: 150px;">
                <source src="${props.src || "https://www.w3schools.com/html/mov_bbb.mp4"}" type="video/mp4" />
                Your browser does not support the video tag.
              </video>`;

                // Formulaires
                case "textfield":
                    return `<input type="text" value="${content}" placeholder="Enter text..." style="${style} border: 1px solid #ccc; padding: 4px;" />`;

                case "submit-button":
                    return `<button style="${style} background-color: #3B82F6; color: white; padding: 8px 16px; border-radius: 4px;">${content || "Submit"}</button>`;

                case "checkbox":
                    return `<label style="${style} display: flex; align-items: center; gap: 4px;">
                      <input type="checkbox" />
                      <span>${content || "Check me"}</span>
                    </label>`;

                case "dropdown":
                    return `<select style="${style} padding: 4px; border: 1px solid #ccc;">
                      <option>${content || "Select an option"}</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>`;

                case "search":
                    return `<input type="search" placeholder="${content || "Search..."}" style="${style} padding: 4px; border: 1px solid #ccc;" />`;

                // Navigation
                case "navbar":
                    return `<nav style="${style} background-color: #1F2937; color: white; padding: 8px; display: flex; gap: 16px;">
                      <span>Home</span>
                      <span>About</span>
                      <span>Contact</span>
                    </nav>`;

                case "sidebar":
                    return `<aside style="${style} background-color: #E5E7EB; padding: 8px;">
                      <div>Dashboard</div>
                      <div>Settings</div>
                      <div>Logout</div>
                    </aside>`;

                case "tabs":
                    return `<div style="${style} display: flex; border-bottom: 2px solid #ccc;">
                      <button style="padding: 8px; border-bottom: 2px solid #3B82F6;">Tab 1</button>
                      <button style="padding: 8px;">Tab 2</button>
                    </div>`;

                case "breadcrumbs":
                    return `<div style="${style} font-size: 14px; color: #6B7280;">Home &gt; Category &gt; Page</div>`;

                // Layout
                case "grid":
                    return `<div style="${style} display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
                      <div style="background: #F3F4F6; padding: 8px;">Col 1</div>
                      <div style="background: #E5E7EB; padding: 8px;">Col 2</div>
                    </div>`;

                case "headers":
                    return `<header style="${style} background: #DBEAFE; padding: 16px; text-align: center; font-weight: bold;">Header</header>`;

                case "footer":
                    return `<footer style="${style} background: #D1D5DB; padding: 16px; text-align: center;">Footer Content</footer>`;

                case "sidepanel":
                    return `<div style="${style} background: #F3F4F6; padding: 8px;">Side Panel Content</div>`;

                case "card":
                    return `<div style="${style} background: white; box-shadow: 0 0 5px rgba(0,0,0,0.1); padding: 16px; border-radius: 8px;">
                      <h2 style="font-size: 18px; font-weight: bold;">Card Title</h2>
                      <p>Card content goes here.</p>
                    </div>`;

                default:
                    return `<!-- Unknown component type: ${type} -->`;
            }
        })
        .join("\n");
};
