// ini adalah dash panel untuk menampung icons icons aplikasi
"use client";
import { Circle } from "lucide-react";
import Terminal from "./components/terminal";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import FirefoxBrowser from "./components/firefox";

const DashBottom = () => {
  //const [zoomActive, setIsZoomActive] = useState(false); // Ambil state dari Context

  const router = useRouter();

  const handleToAplikasi = () => {
    router.push("/aplikasi");
  };

  const windowsMain = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [posisition, setPosisition] = useState<{ x: number; y: number }>({
    x: 100,
    y: 100,
  });
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isShowingApp, setIsShowingApp] = useState({ show: false, label: "" });

  // useEffect(() => {
  //   if (windowsMain.current) {
  //     const width = windowsMain.current.offsetWidth;
  //     const height = windowsMain.current.offsetHeight;
  //     setPosisition({
  //       x: (window.innerWidth - width) / 2,
  //       y: (window.innerHeight - height) / 2,
  //     });
  //   }
  // }, []);

  const HandleMouseDown = (event: React.MouseEvent) => {
    if (windowsMain.current) {
      setIsDragging(true);
      const rectMain = windowsMain.current.getBoundingClientRect();
      setOffset({
        x: event.clientX - rectMain.left,
        y: event.clientY - rectMain.top,
      });
    }
  };

  const HandleMoveMouse = (event: MouseEvent) => {
    if (isDragging && windowsMain.current) {
      setPosisition({
        x: event.clientX - offset.x,
        y: event.clientY - offset.y,
      });
    }
  };
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", HandleMoveMouse);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", HandleMoveMouse);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);

  return (
    <div
      className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[50vw] max-w-[600px] p-2 
                      bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl  justify-around border border-white/20"
    >
      <section className="flex relative gap-4 justify-between">
        {DataIcons.map((apk, index) => (
          <div
            key={index}
            className="flex  p-2 bg-black/20 border border-white/30 rounded-lg transition-transform transform hover:scale-105"
            onClick={() => {
              if (apk.label != isShowingApp.label) {
                setIsShowingApp({ show: true, label: apk.label });
                //atur posisi Awal aplikasi
                setPosisition({
                  x: 480,
                  y: 230,
                });
              } else {
                //Toggle aplikasi
                setIsShowingApp({ show: false, label: "" });
              }
            }}
          >
            <img
              loading="lazy"
              src={apk.src}
              alt={apk.label}
              className="w-8 h-8"
            />
          </div>
        ))}

        {/* tampilkan PEMBUNGKUS  yang bisa di draq dan membesar sesaui atau pembungkus semua Aplikasi */}
        {isShowingApp.show && (
          <main
            ref={windowsMain}
            className="fixed  inset-0 bg-transparent  shadow-lg border-2 border-gray-300 -z-30"
            style={{
              left: posisition.x - 300,
              top: posisition.y - 600,
              height: "16rem",
              width: "24rem",
            }}
          >
            <header
              onMouseDown={HandleMouseDown}
              className="text-center cursor-move rounded-t-lg select-none"
            >
              {" "}
              <h3> {"nama apk"}</h3>
              <div className="flex items-center gap-2 px-3 py-2">
                <div
                  className="w-3 h-3 bg-red-500 rounded-full hover:brightness-90 cursor-pointer"
                  title="Close"
                ></div>
                <div
                  className="w-3 h-3 bg-yellow-500 rounded-full hover:brightness-90 cursor-pointer"
                  title="Minimize"
                ></div>
                <div
                  className="w-3 h-3 bg-green-500 rounded-full hover:brightness-90 cursor-pointer"
                  title="Maximize"
                ></div>
              </div>
            </header>

            <div>
              {/* di sini render componets */}
              {renderCardApp(isShowingApp.label)}
            </div>
          </main>
        )}

        {/* tampilan menu All Apliaksi */}
        <div onClick={handleToAplikasi}>
          <img
            className="w-12 h-12  transition-transform transform hover:scale-105"
            src="/icons/dashboard.png"
            alt=""
          />
        </div>
      </section>
    </div>
  );
};

/** data yang tapil di ambil dari nama __DataIcons.label__  */
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

interface DataIconsProps {
  src: string;
  label: string;
}

const DataIcons: DataIconsProps[] = [
  { src: "/icons/github.png", label: "GitHub" },
  { src: "/icons/vscode.png", label: "VSCode" },
  { src: "/icons/terminal.png", label: "Terminal" },
  { src: "/icons/firefox.png", label: "Firefox" },
];

export default DashBottom;
