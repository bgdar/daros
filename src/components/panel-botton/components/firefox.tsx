// FirefoxBrowser.tsx
import { useState } from "react";
import { Minus, Square, X, Lock, RefreshCcw } from "lucide-react";

export default function FirefoxBrowser() {
  const [url, setUrl] = useState("https://www.mozilla.org");

  return (
    <div className="w-full h-full rounded-lg shadow-xl bg-white border border-gray-300 overflow-hidden font-sans">
      {/* Address Bar */}
      <div className="bg-[#f1f3f4] flex items-center px-3 py-2 space-x-2 border-b border-gray-200">
        <Lock size={16} className="text-green-600" />
        <input
          type="text"
          className="flex-1 bg-transparent focus:outline-none text-sm"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <RefreshCcw size={16} className="text-gray-600 cursor-pointer" />
      </div>

      {/* Web Page Content */}
      <div className="bg-white p-4 text-gray-800 h-full overflow-auto">
        <h1 className="text-xl font-bold">Welcome to Firefox!</h1>
        <p className="mt-2">
          This is a mock browser window for learning or demo purposes. You
          typed: <span className="text-blue-600">{url}</span>
        </p>
        <p className="mt-4 text-sm text-gray-600">
          (You can embed iframe or website preview here if needed.)
        </p>
      </div>
    </div>
  );
}
