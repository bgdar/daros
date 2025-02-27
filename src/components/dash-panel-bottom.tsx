// ini adalah dash panel untuk menampung icons icons aplikasi
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DashBottom = () => {
  //const [zoomActive, setIsZoomActive] = useState(false); // Ambil state dari Context

  const router = useRouter();

  const handleToAplikasi = async () => {
    await router.push("/aplikasi");
  };
  return (
    <div
      className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[50vw] max-w-[600px] p-2 
                      bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl  justify-around border border-white/20"
    >
      <section className="flex relative gap-4 justify-between">
        {[
          // gunakan isShow untuk menampilkan aplikasi nya
          { src: "/icons/github.png", label: "GitHub", isShow: false },
          { src: "/icons/vscode.png", label: "VSCode" },
          { src: "/icons/terminal.png", label: "Terminal" },
          { src: "/icons/firefox.png", label: "Firefox" },
        ].map((apk, index) => (
          <div
            key={index}
            className="flex  p-2 bg-black/20 border border-white/30 rounded-lg transition-transform transform hover:scale-105"
          >
            <img src={apk.src} alt={apk.label} className="w-8 h-8" />
          </div>
        ))}
        {/* tampilan menu saat Active */}

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

export default DashBottom;
