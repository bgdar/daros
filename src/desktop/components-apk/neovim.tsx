import React, { useState } from "react";

const NeoVimEditor = () => {
  const [content, setContent] = useState("");

  return (
    <div className="bg-[#1e1e1e] text-gray-200 font-mono min-h-screen p-4 flex flex-col">
      {/* Editor Area */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 bg-transparent outline-none resize-none text-base leading-relaxed"
        placeholder="Welcome to Neovim (React Edition)..."
        autoFocus
      />

      {/* Status Line */}
      <div className="bg-[#2d2d2d] text-green-400 px-4 py-1 text-sm">
        -- INSERT -- | Ln {content.split("\n").length}, Col{" "}
        {content.length - content.lastIndexOf("\n")}
      </div>
    </div>
  );
};

export default NeoVimEditor;
