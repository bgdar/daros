"use client";

import React, { use, useEffect, useRef, useState } from "react";
import FirefoxBrowser from "../components-apk/firefox";
import Terminal from "../components-apk/terminal";
import { Circle } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  win: {
    id: number;
    label: string;
    position: { x: number; y: number };
    zIndex: number;
  };
  onClose: (id: number) => void;
  onDrag: (id: number, pos: { x: number; y: number }) => void;
  onFocus: (id: number) => void;
}

/** data yang tapil di ambil dari nama __DataIcons.label__
 * setiap data adalah __apk__ yang di tampung
 */
function renderCardApp(nameApp: string) {
  switch (nameApp) {
    case "Terminal":
      return <Terminal />;
    case "VSCode":
      return <img src="/icons/vscode.png" alt="VSCode" className="w-8 h-8" />;
    case "Firefox":
      return <FirefoxBrowser />;
    default:
      null;
  }
}

/** ini adalah windows yang membungkus setiap apk */
const DraggableWindow: React.FC<Props> = ({
  win,
  onClose,
  onDrag,

  onFocus,
}) => {
  const route = useRouter();

  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    onFocus(win.id);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      onDrag(win.id, {
        x: e.clientX - offset.x - 390,
        y: e.clientY - offset.y - 540,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <div
      ref={ref}
      className="fixed bg-white border shadow-lg rounded-lg"
      style={{
        top: win.position.y,
        left: win.position.x,
        width: "28rem",
        height: "20rem",
        zIndex: win.zIndex,
      }}
    >
      <header
        onMouseDown={handleMouseDown}
        className="cursor-move draggable select-none bg-gray-100 px-4 py-2 rounded-t-md flex justify-between items-center"
      >
        <span className="font-semibold">{win.label}</span>
        <div className="flex items-center gap-2">
          <Circle
            className="w-3 h-3 text-red-500 cursor-pointer"
            onClick={() => onClose(win.id)}
          />
          {/* tombol maxsimze saat di click akan mengarahkan ke halaman lainyang berisi url dan  */}
          <Circle className="w-3 h-3 text-yellow-500" />
          <Circle
            className="w-3 h-3 text-green-500 cursor-pointer"
            onClick={() => route.push(`/aplikasi/${win.label}`)}
          />
        </div>
      </header>
      <div className="p-3">{renderCardApp(win.label)}</div>
    </div>
  );
};

export default DraggableWindow;
