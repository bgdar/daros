import React from "react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

const Word = () => {
  const menus = ["File", "Home", "Insert", "Layout", "Review", "View"];

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-sm">
      {/* Toolbar */}
      <div className="bg-white border-b px-4 py-2 flex space-x-6 shadow-sm">
        {menus.map((menu) => (
          <button
            key={menu}
            className="hover:text-blue-600 text-gray-800 font-medium"
          >
            {menu}
          </button>
        ))}
      </div>

      {/* Ribbon */}
      <div className="bg-white border-b px-4 py-3 flex space-x-4 items-center shadow-sm">
        {/* Font Styling */}
        <div className="flex space-x-2">
          <button className="p-2 rounded hover:bg-gray-200">
            <Bold className="w-5 h-5" />
          </button>
          <button className="p-2 rounded hover:bg-gray-200">
            <Italic className="w-5 h-5" />
          </button>
          <button className="p-2 rounded hover:bg-gray-200">
            <Underline className="w-5 h-5" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-4" />

        {/* Alignment */}
        <div className="flex space-x-2">
          <button className="p-2 rounded hover:bg-gray-200">
            <AlignLeft className="w-5 h-5" />
          </button>
          <button className="p-2 rounded hover:bg-gray-200">
            <AlignCenter className="w-5 h-5" />
          </button>
          <button className="p-2 rounded hover:bg-gray-200">
            <AlignRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="p-6">
        <div
          contentEditable
          suppressContentEditableWarning
          className="w-full h-[600px] bg-white border shadow-inner rounded-lg p-6 text-gray-800 leading-relaxed focus:outline-none"
        >
          <p>Start typing your document here...</p>
        </div>
      </div>
    </div>
  );
};

export default Word;
