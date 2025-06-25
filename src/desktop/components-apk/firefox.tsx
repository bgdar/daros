import React, { useState } from "react";
import { Lock, RefreshCcw } from "lucide-react";

export default function MiniBrowser() {
  const [url, setUrl] = useState("https://www.youtube.com/embed/dQw4w9WgXcQ");
  const [inputUrl, setInputUrl] = useState(url);

  const handleGo = () => {
    let formattedUrl = inputUrl;
    // Jika URL tidak dimulai dengan "http://" atau "https://", tambahkan "https://" di depannya
    // Ini penting agar iframe bisa memuat URL dengan benar (butuh protokol eksplisit)
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = "https://" + formattedUrl;
    }

    setUrl(formattedUrl);
  };

  return (
    <div className="w-full h-full rounded-lg shadow-xl bg-white border border-gray-300 overflow-hidden font-sans flex flex-col">
      {/* Address Bar */}
      <div className="bg-[#f1f3f4] flex items-center px-3 py-2 space-x-2 border-b border-gray-200">
        <Lock size={16} className="text-green-600" />
        <input
          type="text"
          className="flex-1 bg-transparent focus:outline-none text-sm"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGo()}
        />
        <RefreshCcw
          size={16}
          className="text-gray-600 cursor-pointer"
          onClick={handleGo}
        />
      </div>

      {/* Web Page Content */}
      <div className="flex-1">
        <iframe
          src={url}
          title="mini-browser"
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>
      <p className="text-center">
        hanya work kalau domain embed. atau player. diizinkan.
      </p>
    </div>
  );
}
