import React, { useState } from "react";

// Contoh data wallpaper (bisa diganti dengan fetch dari server)
const wallpapers = [
  {
    name: "Sunset",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
  },
  {
    name: "Forest",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
  },
  {
    name: "Mountains",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600",
  },
  {
    name: "Night City",
    url: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=600",
  },
];

const Wallpaper = () => {
  const [selected, setSelected] = useState(wallpapers[0]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Wallpaper</h1>

      {/* Preview */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Preview</h2>
        <div className="w-full h-64 bg-gray-200 rounded overflow-hidden">
          <img
            src={selected.url}
            alt={selected.name}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-gray-600 mt-2">
          Selected: <strong>{selected.name}</strong>
        </p>
      </div>

      {/* Gallery */}
      <div>
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          Choose a wallpaper
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wallpapers.map((wallpaper) => (
            <div
              key={wallpaper.name}
              className={`cursor-pointer border-2 rounded overflow-hidden transition ${
                selected.name === wallpaper.name
                  ? "border-blue-500"
                  : "border-transparent hover:border-gray-300"
              }`}
              onClick={() => setSelected(wallpaper)}
            >
              <img
                src={wallpaper.url}
                alt={wallpaper.name}
                className="w-full h-32 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallpaper;
