"use client";
import { useEffect, useState } from "react";
import { Monitor, X } from "lucide-react";

/**Popup ini akan munculk ketika mendekati ukuran yang ditentukan */
export default function MobileWarning() {
  const [isMobile, setIsMobile] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    // Fungsi pengecekan
    const checkViewport = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Jalankan saat pertama kali
    checkViewport();

    // Update saat resize
    window.addEventListener("resize", checkViewport);

    // Cleanup event listener saat komponen unmount
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  if (!isMobile || closed) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center relative">
        {/* Tombol Close */}
        <button
          onClick={() => setClosed(true)}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ikon Lucide */}
        <Monitor className="mx-auto w-10 h-10 text-blue-600 mb-4" />

        <h2 className="text-lg font-semibold mb-2">Gunakan Tampilan Desktop</h2>
        <p className="text-sm text-gray-600">
          Aplikasi ini dirancang untuk desktop. Jika kamu menggunakan perangkat
          mobile, aktifkan mode desktop melalui browser untuk pengalaman
          terbaik.
        </p>
      </div>
    </div>
  );
}
