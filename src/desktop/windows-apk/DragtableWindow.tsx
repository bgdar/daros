"use client";

import React, { use, useEffect, useRef, useState } from "react";

// Components apk start
import GithubProfile from "../components-apk/github";
import FirefoxBrowser from "../components-apk/firefox";
import NeoVimEditor from "../components-apk/neovim";
import Terminal from "../components-apk/terminal";
import Word from "../components-apk/word";
import Wallpaper from "../components-apk/walpaper";
import GnomeSettings from "../components-apk/setting";
// Components apk and

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
    case "github":
      return <GithubProfile username={"bgdar"} />;
    case "terminal":
      return <Terminal />;
    case "neovim":
      return <NeoVimEditor />;
    case "vscode":
      return <img src="/icons/vscode.png" alt="VSCode" className="w-8 h-8" />;
    case "firefox":
      return <FirefoxBrowser />;
    case "word":
      return <Word />;
    case "wallpaper":
      return <Wallpaper />;
    case "setting":
      return <GnomeSettings />;
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

  const Windowsref = useRef<HTMLDivElement>(null);

  // Drag windows start
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  // Drag windows and

  //risize components start
  const [size, setSize] = useState({ width: 448, height: 320 }); // 28rem x 20rem
  const resizingRef = useRef<{
    dir: string;
    startX: number;
    startY: number;
    startW: number;
    startH: number;
  } | null>(null);

  //risize components and

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = Windowsref.current?.getBoundingClientRect();
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
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleResizeMouseDown = (dir: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    resizingRef.current = {
      dir,
      startX: e.clientX,
      startY: e.clientY,
      startW: size.width,
      startH: size.height,
    };
    setIsDragging(false);
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleResizeMouseMove = (e: MouseEvent) => {
      if (resizingRef.current) {
        const { dir, startX, startY, startW, startH } = resizingRef.current;
        let newWidth = startW;
        let newHeight = startH;
        let newLeft = win.position.x;
        let newTop = win.position.y;

        if (dir === "right") {
          newWidth = Math.max(200, startW + (e.clientX - startX));
        }
        if (dir === "bottom") {
          newHeight = Math.max(100, startH + (e.clientY - startY));
        }
        // masih bermasalah untuk left dan top yg jadi di matikan sekarang
        // if (dir === "left") {
        //   const delta = e.clientX - startX;
        //   newWidth = Math.max(200, startW - delta);
        //   newLeft = win.position.x + delta;
        // }
        // if (dir === "top") {
        //   const delta = e.clientY - startY;
        //   newHeight = Math.max(100, startH - delta);
        //   newTop = win.position.y + delta;
        // }
        // masih bermasalah untuk left dan top

        setSize({ width: newWidth, height: newHeight });
        // Update posisi window jika resize dari kiri/atas
        if (dir === "left" || dir === "top") {
          onDrag(win.id, { x: newLeft, y: newTop });
        }
      }
    };

    const handleResizeMouseUp = () => {
      resizingRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handleResizeMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseup", handleResizeMouseUp); // saat diresize bisa keluar

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleResizeMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseup", handleResizeMouseUp);
    };
  }, [isDragging, offset, win.position, onDrag, size]);

  return (
    <div
      ref={Windowsref}
      className="fixed bg-white border shadow-lg rounded-lg"
      style={{
        top: win.position.y,
        left: win.position.x,
        width: size.width,
        height: size.height,
        zIndex: win.zIndex,
        overflow: "hidden",
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

      {/* SEMUA APK AKAN DI RENDER DI SINI */}
      <div className="p-3">{renderCardApp(win.label)}</div>

      {/* untuk agar windows bisa di besar kecilkan  */}
      {/* Handle resize kanan */}
      <div
        onMouseDown={handleResizeMouseDown("right")}
        className="absolute top-0 right-0 w-2 h-full cursor-ew-resize z-50"
        style={{ userSelect: "none" }}
      />
      {/* Handle resize kiri */}
      <div
        onMouseDown={handleResizeMouseDown("left")}
        className="absolute top-0 left-0 w-2 h-full cursor-ew-resize z-50"
        style={{ userSelect: "none" }}
      />
      {/* Handle resize bawah */}
      <div
        onMouseDown={handleResizeMouseDown("bottom")}
        className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize z-50"
        style={{ userSelect: "none" }}
      />
      {/* Handle resize atas */}
      <div
        onMouseDown={handleResizeMouseDown("top")}
        className="absolute top-0 left-0 w-full h-2 cursor-ns-resize z-50"
        style={{ userSelect: "none" }}
      />
      {/* ...existing code... */}
    </div>
  );
};

export default DraggableWindow;
