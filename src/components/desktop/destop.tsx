"use client";

import { useState, useRef, useEffect } from "react";
import ContextMenu from "./contextMenu";
import CardWalpapper from "./components/cardWalpapper";
import Word from "./components/cardWord";
import { useModal } from "../modal";
import { X } from "lucide-react";

const dataWalpaper = [
  {
    id: 1,
    src: "wallpaper/linux.jpg",
  },
  {
    id: 1,
    src: "wallpaper/linux.jpg",
  },
  {
    id: 1,
    src: "wallpaper/linux.jpg",
  },
  {
    id: 1,
    src: "wallpaper/linux.jpg",
  },
];

/**function untuk mennentukan card saat di clcik menu click kanan*/
/**sesuai dengan __idDerection__ dari dataItems di contextMenu.tsx  */
function renderItemCard(content: string) {
  switch (content) {
    case "show-walpaper":
      return (
        <CardWalpapper
          Poss={{
            wallpapers: dataWalpaper.map((walpaper) => walpaper.src),
          }}
        />
      );
    case "word":
      return <Word />;
    default:
      return null;
  }
}

const Destop = () => {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [sizeMenu, setSizeMenu] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const menuRef = useRef<HTMLDivElement>(null);
  const { thisItemDirection } = useModal();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setContextMenu(null);
        //  togleWalpaperDirection(); //ubah walpaperDerection ke false
      }
    };
    //dapatkan ukuran div menu ref saat ini
    if (menuRef.current) {
      setSizeMenu({
        width: menuRef.current.offsetWidth,
        height: menuRef.current.offsetHeight,
      });
    }

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
        // dimanapun yang di click di dalam div ini
        e.preventDefault(); // Mencegah menu konteks bawaan browser (popup nya)
        const maxWidth = window.innerWidth;
        const maxHeight = window.innerHeight;
        //cek jika x dan y melewati windows
        if (e.clientX >= maxWidth || e.clientY >= maxHeight) {
          //  setContextMenu(null); // Reset context menu jika melewati batas
          //muncnculkan di tepi
          // setContextMenu({ x: (e.clientX % maxWidth) , y: e.clientY % maxHeight });
          setContextMenu({
            x: (e.clientX * sizeMenu.width) / 2,
            y: (e.clientY * sizeMenu.height) / 2,
          });
          console.log("x:", e.clientX, "y", e.clientY);

          return;
        }

        setContextMenu({
          x: Math.min(e.clientX, maxWidth),
          y: Math.min(e.clientY, maxHeight),
        });
      }}
    >
      {contextMenu && (
        <div className="relative" ref={menuRef}>
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
          />
          {/* { && (
            <CardWalpapper
              Poss={{
                x: (contextMenu?.x ?? 0) - 460,
                y: (contextMenu?.y ?? 0) + 10,
                wallpapers: dataWalpaper.map((walpaper) => walpaper.src),
              }}
            />
          )} */}

          {thisItemDirection.id && (
            // lakukan manipulasi pada element ii jika keluar dari
            <div
              style={{
                //sesuaikan tata letak agar tidak keluar dari  windows
                top: contextMenu.y + 10,
                left: contextMenu.x + -460, //
              }}
              className="absolute z-50"
            >
              {renderItemCard(thisItemDirection.id)}
            </div>
          )}
        </div>
      )}

      {/* card untuk menampung walpapper */}
      {/* jika hasilnya undifinde gunakan 0 sbg default */}
    </div>
  );
};

export default Destop;
