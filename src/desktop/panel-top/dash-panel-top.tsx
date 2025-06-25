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

const CardMenu = () => {
  return (
    <div className="w-64 bg-gray-900 z-30 absolute top-5 text-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header Menu */}
      <div className="bg-gray-800 p-3 flex items-center space-x-2">
        <Menu className="w-5 h-5 text-blue-400" />
        <span className="text-sm font-semibold">Applications</span>
      </div>

      {/* List Aplikasi */}
      <div className="p-3 space-y-3">
        <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
          <Terminal className="w-5 h-5 text-green-400" />
          <span className="text-sm">Terminal</span>
        </div>
        <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
          <Globe className="w-5 h-5 text-blue-400" />
          <span className="text-sm">Web Browser</span>
        </div>
        <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
          <Settings className="w-5 h-5 text-yellow-400" />
          <span className="text-sm">Settings</span>
        </div>
      </div>
    </div>
  );
};

const StatusSystem = () => {
  return (
    <div className="flex justify-between content-center items-center  space-x-4">
      <Network className="text-white size-5" />
      <Volume2 className="text-white size-5" />
      <Power className="text-white size-5" />
    </div>
  );
};

const DashTop = () => {
  const [IsShowMenu, SetIsShowMenu] = useState<boolean>(false);

  return (
    <div className="absolute top-0 w-[100vw] ">
      <section className="flex relative justify-between backdrop-blur-lg bg-white/10 shadow-lg border-white/20  h-7">
        <div
          className="  border border-black  max-w-8"
          onMouseEnter={() => SetIsShowMenu(true)}
          onMouseLeave={() => SetIsShowMenu(false)}
        >
          {IsShowMenu ? <CardMenu /> : ""}
          <img src="daros.png" className="w-4 h-4 " alt="" />
        </div>
        <div>
          <StatusSystem />
        </div>
      </section>
    </div>
  );
};

export default DashTop;
