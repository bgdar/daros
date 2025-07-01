"use client";

import { LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";

import { useModalApk } from "../aplikasi-modal";

import DraggableWindow from "../windows-apk/DragtableWindow";

interface WindowState {
  id: number;
  position: { x: number; y: number };
  label: string;

  zIndex: number;
}

const DashButtom = () => {
  //const [zoomActive, setIsZoomActive] = useState(false); // Ambil state dari Context

  const router = useRouter();

  const handleToAplikasi = () => {
    router.push("/aplikasi");
  };

  const { addWindow, DataIcons } = useModalApk();

  return (
    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[90vw] max-w-[600px]">
      <section className="flex gap-4 p-1 justify-between bg-white/10 backdrop-blur rounded-2xl border border-white/20">
        {DataIcons.map((apk, index) =>
          DataIcons[index].layout === "panel-button".trim() ? (
            <div
              key={index}
              className="flex p-2 bg-black/20 border border-white/30 rounded-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={() => addWindow(apk.label)}
            >
              <img src={apk.src} alt={apk.label} className="w-8 h-8" />
            </div>
          ) : (
            ""
          )
        )}

        <button
          onClick={handleToAplikasi}
          className="flex p-2 bg-black/20 border border-white/30 rounded-lg cursor-pointer hover:scale-105 transition-transform"
        >
          <LayoutDashboard className="w-8 h-8" />
        </button>
      </section>

      {/* {windows.map((win) => (
        <DraggableWindow
          key={win.id}
          win={win}
          onClose={closeWindow}
          onDrag={handleDragWindow}
          onFocus={focusWindow}
        />
      ))} */}
    </div>
  );
};

export default DashButtom;
