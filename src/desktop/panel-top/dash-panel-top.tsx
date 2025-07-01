"use client";
import {
  Menu,
  Terminal,
  Globe,
  Settings,
  Network,
  Volume2,
  Power,
} from "lucide-react";
import { useState } from "react";
import { useModalApk } from "../aplikasi-modal";

/**CardMenu adalah menu __menu aplikasi__ yg terletak di sebelah kiri */
const CardMenu = () => {
  const { addWindow, DataIcons } = useModalApk();

  return (
    <div className="w-64 bg-gray-900 z-30 absolute top-7 text-white  shadow-lg overflow-hidden">
      {/* Header Menu */}
      <div className="bg-gray-800 p-3 flex items-center space-x-2">
        <Menu className="w-5 h-5 text-blue-400" />
        <span className="text-sm font-semibold">Applications</span>
      </div>

      {/* List Aplikasi | perhatikan DataIcons jika di ubah posisi index nya */}

      <div className="p-3 space-y-3">
        <button
          onClick={() => addWindow(DataIcons[2].label)}
          className="flex items-center space-x-3  hover:bg-gray-700 p-2 rounded-lg"
        >
          <Terminal className="w-5 h-5 text-green-400" />
          <span className="text-sm">Terminal</span>
        </button>
        <button
          onClick={() => addWindow(DataIcons[4].label)}
          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg"
        >
          <Globe className="w-5 h-5 text-blue-400" />
          <span className="text-sm">Web Browser</span>
        </button>
        <button
          onClick={() => addWindow("setting")}
          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg"
        >
          <Settings className="w-5 h-5 text-yellow-400" />
          <span className="text-sm">Settings</span>
        </button>
      </div>
    </div>
  );
};

/**Satatus sistem terletak di Ujung sebelah __kanan__ */
const StatusSystem = () => {
  return (
    <div className="flex justify-between content-center items-center  space-x-4">
      <Network className="text-white size-5" />
      <Volume2 className="text-white size-5" />
      <Power className="text-white size-5" />
    </div>
  );
};

/** DashTop adalah dash panel yang terletak di paling __atas__ sebagai header **Destop**/
const DashTop = () => {
  const [IsShowMenu, SetIsShowMenu] = useState<boolean>(false);

  return (
    <div className="absolute top-0 w-[100vw] ">
      <section className="flex p-1 relative justify-between backdrop-blur-lg bg-white/10 shadow-lg border-white/20  h-7">
        <div
          // gunakan lebar dan tinggi yg identik agar mudah di hover
          className=" w-10 h-10"
          onMouseEnter={() => SetIsShowMenu(true)}
          onMouseLeave={() => SetIsShowMenu(false)}
        >
          {IsShowMenu ? <CardMenu /> : ""}
          <img src="daros.png" className="w-6 h-6 " alt="" />
        </div>
        <div>
          <StatusSystem />
        </div>
      </section>
    </div>
  );
};

export default DashTop;
