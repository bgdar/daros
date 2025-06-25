//halmaan utamaa usakan tidak menggunakn __use client___
"server component";
import DashBottom from "@/desktop/panel-botton/dash-panel-bottom";
import DashTop from "@/desktop/panel-top/dash-panel-top";
import Destop from "@/desktop/destop";
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

      {/* tampilan desktop */}
      <Destop />

      {/* dash panel untuk menu aplikasi nya di bawha*/}
      <DashBottom />
    </div>
  );
}
