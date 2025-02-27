"use client";

import { useState, useRef, useEffect } from "react";
import ContextMenu from "./contextMenu";

const dataWalpaper = [
  {
    id: 1,
    src: "wallpaper/linux.jpg",
  },
];

const Destop = () => {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setContextMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${dataWalpaper[0].src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      }}
      onContextMenu={(e) => {
        e.preventDefault(); // Mencegah menu konteks bawaan browser (popup nya)
        const maxWidth = window.innerWidth - 200; // Sesuaikan dengan lebar menu
        const maxHeight = window.innerHeight - 200; // Sesuaikan dengan tinggi menu

        setContextMenu({
          x: Math.min(e.clientX, maxWidth),
          y: Math.min(e.clientY, maxHeight),
        });
      }}
    >
      {contextMenu && (
        <div ref={menuRef}>
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Destop;
