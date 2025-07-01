"use client";

import React, { useContext, createContext, useState } from "react";

// data Aplikasi
interface DataIconsProps {
  src: string;
  label: string;
  layout?: string;
}

type WindowState = {
  id: number;
  position: { x: number; y: number };
  label: string;
  zIndex: number;
};

/** data aplikasi , Sesuaikan dengan __renderCardApp__ di DragtableWindow */ // jangan di ubah Posisinya
const DataIcons: DataIconsProps[] = [
  // Icons icons untuk Aplikasi di panel button
  { src: "/iconsApk/github.png", label: "github", layout: "panel-button" },
  { src: "/iconsApk/vscode.png", label: "vscode", layout: "panel-button" },
  { src: "/iconsApk/terminal.png", label: "terminal", layout: "panel-button" },
  { src: "/iconsApk/nvim.png", label: "neovim", layout: "panel-button" },
  { src: "/iconsApk/firefox.png", label: "firefox", layout: "panel-button" },
  // Icons icons untuk Aplikasi di center atau ContextMenu
  { src: "/iconsApk/setting.png", label: "setting", layout: "context-menu" },
  { src: "/iconsApk/word.png", label: "word", layout: "context-menu" },
];

interface apkModalType {
  windows: WindowState[];
  DataIcons: DataIconsProps[];
  addWindow: (label: string) => void;
  closeWindow: (id: number) => void;
  focusWindow: (id: number) => void;
  handleDragWindow: (
    id: number,
    pos: {
      x: number;
      y: number;
    }
  ) => void;
}

const apkModal = createContext<apkModalType | undefined>(undefined);

export const ApkModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //di pindahkan dari dash button
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [highestZIndex, setHighestZIndex] = useState(100);

  const addWindow = (label: string) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.label === label);
      if (existing) {
        focusWindow(existing.id);
        return prev; // 🔁 tidak menambah window baru
      }

      const newZ = highestZIndex + 1;
      const newWindow: WindowState = {
        id: Date.now(),
        label,
        position: {
          x: Math.random() * 300,
          y: Math.random() * 300,
        },
        zIndex: newZ,
      };

      setHighestZIndex(newZ);
      return [...prev, newWindow];
    });
  };

  const closeWindow = (id: number) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const focusWindow = (id: number) => {
    const newZ = highestZIndex + 1;
    setHighestZIndex(newZ);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: newZ } : w))
    );
  };

  const handleDragWindow = (id: number, pos: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position: pos } : w))
    );
  };

  return (
    <apkModal.Provider
      value={{
        DataIcons,
        windows,
        addWindow,
        closeWindow,
        focusWindow,
        handleDragWindow,
      }}
    >
      {children}
    </apkModal.Provider>
  );
};

/** global COntext untuk __Apk provider__ */
export const useModalApk = () => {
  const context = useContext(apkModal);
  if (!context) {
    throw new Error("useModal must be used within a ModalDestopProvider");
  }
  return context;
};
