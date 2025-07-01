//halmaan utamaa usakan tidak menggunakn __use client___
"server component";
import DashButtom from "@/desktop/panel-button/dash-panel-buttom";
import DashTop from "@/desktop/panel-top/dash-panel-top";
import Destop from "@/desktop/destop";
import WrappingApps from "@/desktop/windows-apk/wrappingWindowsApp";
import MobileWarning from "@/components/mobileWarning";

export default async function home() {
  return (
    <div
      id="Desktop"
      className="relative box-border p-0 m-0 w-[100vw] h-[100vh]"
    >
      {/* dash panuntuk menu aplikasi nya di atas */}
      <DashTop />

      {/* popup peringatan */}
      <MobileWarning />

      {/* Windows Applikasi */}
      <WrappingApps />

      {/* tampilan desktop */}
      <Destop />

      {/* dash panel untuk menu aplikasi nya di bawha*/}
      <DashButtom />
    </div>
  );
}
