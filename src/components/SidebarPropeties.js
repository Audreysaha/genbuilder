import React from "react";

const SidebarProperties = ({ item, onUpdate }) => {
  if (!item) return <div className="p-4">Aucun élément sélectionné</div>;

  const updateProp = (key, value) => {
    onUpdate(item.id, { [key]: value });
  };

  return (
    <div className="p-4 space-y-4 w-64 border-l bg-gray-50 h-full overflow-y-auto">
      <h2 className="text-lg font-bold">Propriétés</h2>

      {/* Contenu textuel */}
      {(item.type === "heading" || item.type === "paragraph" || item.type === "textfield" || item.type === "button" || item.type === "submit-button") && (
        <div>
          <label className="block text-sm font-medium">Contenu</label>
          <input
            type="text"
            className="w-full border px-2 py-1"
            value={item.content || ""}
            onChange={(e) => updateProp("content", e.target.value)}
          />
        </div>
      )}

      {/* Source image */}
      {item.type === "image" && (
        <div>
          <label className="block text-sm font-medium">URL de l’image</label>
          <input
            type="text"
            className="w-full border px-2 py-1"
            value={item.src || ""}
            onChange={(e) => updateProp("src", e.target.value)}
          />
        </div>
      )}

      {/* Couleur de fond (pertinent pour beaucoup de types sauf image/heading/paragraph) */}
      {item.type !== "image" && (
        <div>
          <label className="block text-sm font-medium">Couleur de fond</label>
          <input
            type="color"
            className="w-full"
            value={item.backgroundColor || "#ffffff"}
            onChange={(e) => updateProp("backgroundColor", e.target.value)}
          />
        </div>
      )}

      {/* Couleur du texte */}
      {item.type !== "image" && (
        <div>
          <label className="block text-sm font-medium">Couleur du texte</label>
          <input
            type="color"
            className="w-full"
            value={item.textColor || "#000000"}
            onChange={(e) => updateProp("textColor", e.target.value)}
          />
        </div>
      )}

      {/* Taille de police */}
      {item.type !== "image" && (
        <div>
          <label className="block text-sm font-medium">Taille de police (px)</label>
          <input
            type="number"
            className="w-full border px-2 py-1"
            value={item.fontSize || 14}
            onChange={(e) => updateProp("fontSize", parseInt(e.target.value))}
          />
        </div>
      )}

      {/* Arrondi des bords */}
      <div>
        <label className="block text-sm font-medium">Arrondi des bords</label>
        <input
          type="range"
          min="0"
          max="50"
          value={item.borderRadius || 0}
          onChange={(e) => updateProp("borderRadius", parseInt(e.target.value))}
        />
      </div>

      {/* Largeur / Hauteur */}
      <div>
        <label className="block text-sm font-medium">Largeur (px)</label>
        <input
          type="number"
          value={item.width || 100}
          onChange={(e) => updateProp("width", parseInt(e.target.value))}
          className="w-full border px-2 py-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Hauteur (px)</label>
        <input
          type="number"
          value={item.height || 50}
          onChange={(e) => updateProp("height", parseInt(e.target.value))}
          className="w-full border px-2 py-1"
        />
      </div>

      {/* Position X / Y */}
      <div>
        <label className="block text-sm font-medium">Position X</label>
        <input
          type="number"
          value={item.x || 0}
          onChange={(e) => updateProp("x", parseInt(e.target.value))}
          className="w-full border px-2 py-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Position Y</label>
        <input
          type="number"
          value={item.y || 0}
          onChange={(e) => updateProp("y", parseInt(e.target.value))}
          className="w-full border px-2 py-1"
        />
      </div>
    </div>
  );
};

export default SidebarProperties;
