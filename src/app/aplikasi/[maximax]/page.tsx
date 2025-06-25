"use client";

import { useParams, useRouter } from "next/navigation";
import { Circle } from "lucide-react";
import FirefoxBrowser from "@/desktop/components-apk/firefox";
import Terminal from "@/desktop/components-apk/terminal";

function renderCardApp(nameApp: string) {
  switch (nameApp) {
    case "Terminal":
      return <Terminal />;
    case "VSCode":
      return <img src="/icons/vscode.png" alt="VSCode" className="w-8 h-8" />;
    case "Firefox":
      return <FirefoxBrowser />;
    default:
      return null;
  }
}
const MaximaxApp = () => {
  const params = useParams();
  const router = useRouter();
  const AppName = params.maximax as string;

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col bg-white shadow-lg overflow-hidden">
      {/* Header */}
      <header className="  select-none bg-gray-100 px-4 py-2 rounded-t-md flex justify-between items-center">
        <p className="font-semibold">{AppName}</p>
        <div className="flex items-center gap-2">
          <Circle
            className="w-3 h-3 text-red-500 cursor-pointer"
            onClick={() => router.back()}
          />
          {/* tombol maxsimze saat di click akan mengarahkan ke halaman lainyang berisi url dan  */}
          <Circle className="w-3 h-3 text-yellow-500" />
          <Circle className="w-3 h-3 text-green-500 cursor-not-allowed" />
        </div>
      </header>
      {renderCardApp(AppName)}
    </div>
  );
};

export default MaximaxApp;
