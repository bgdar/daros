import React, { useState } from "react";

const settingsMenu = [
  "Wi-Fi",
  "Bluetooth",
  "Display",
  "Sound",
  "Power",
  "Network",
  "Privacy",
  "About",
];

const GnomeSettings = () => {
  const [active, setActive] = useState("Wi-Fi");

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm">
        <h2 className="text-lg font-semibold p-4 border-b">Settings</h2>
        <nav className="flex flex-col">
          {settingsMenu.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`text-left px-4 py-2 hover:bg-gray-100 ${
                active === item ? "bg-blue-100 font-medium text-blue-700" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">{active}</h1>
        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-600">
            This is the <strong>{active}</strong> settings section. You can
            customize your system settings here.
          </p>
        </div>
      </main>
    </div>
  );
};

export default GnomeSettings;
