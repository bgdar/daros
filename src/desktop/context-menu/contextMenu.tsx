import { useModalDestop } from "../destop-modal";
import {
  Folder,
  File,
  Trash2,
  Settings,
  LogOut,
  Wallpaper,
  ArrowBigRightDash,
} from "lucide-react";
import { useRef, useState } from "react";
import { useModalApk } from "../aplikasi-modal";
import MenuItem from "./menuItems";

interface dataItemsType {
  text: string[];
  idDirection: string[];
}

//pastikan sama dengan yg di child __menuItems.tsx__
/** sesuaikan dengan data dari **RenderCardApp** di __DragtableWindow__*/
const dataItems: dataItemsType[] = [
  {
    text: ["docx", "txt"],
    idDirection: ["word"],
  },
  {
    text: ["new folder", "create folder"],
    idDirection: [""],
  },
];

/** ini adalah card yang akan active saat **MenuContext** di Hover */
const CardHoverItems = ({ context }: { context: ContextType }) => {
  // const { togleItemsDirection } = useModalDestop();
  const { addWindow } = useModalApk();

  const handleAlliemsDirection = () => {
    if (context.idDirection && context.idDirection.length > 0) {
      context.idDirection.forEach((id, index) => {
        const element = document.getElementById(id);
        console.info("isi element id", id);

        if (element) {
          //   //nantik pilih items yang di click dengan katagori id
          //   togleItemsDirection(id); // Panggil fungsi untuk toggle arah
          //   //  element.scrollIntoView({ behavior: "smooth" });

          addWindow(id);
        }
      });
    }
  };
  return (
    <div className="border rounded-xl bg-gray-800 p-4 shadow-lg">
      <ul className="space-y-2">
        {context.text.map((item, index) => (
          <li
            key={index}
            className="hover:bg-gray-600 transition rounded-md p-2"
          >
            {context.idDirection ? (
              <>
                {" "}
                <p
                  id={context.idDirection[index]}
                  onClick={handleAlliemsDirection}
                  className="text-white hover: cursor-pointer"
                >
                  {item}
                </p>
              </>
            ) : (
              <span className="text-gray-300">{item}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface ContextType {
  text: string[]; // Array teks yang akan ditampilkan sebagai item list
  idDirection?: string[]; // Array idDirection, bisa ada atau tidak
}

const ContextMenu = ({
  x,
  y,
  onClose,
}: {
  x: number;
  y: number;
  onClose: () => void;
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [position, setPosition] = useState<{ posX: number; posY: number }>({
    posX: 0,
    posY: 0,
  });

  return (
    <>
      {/* Menu Utama saat di click kanan */}
      <ul
        style={{ top: y, left: x }}
        className="absolute w-48 bg-gray-800 text-white rounded-lg shadow-lg p-2 z-50"
      >
        <MenuItem
          icon={<File size={18} />}
          text="New File"
          thisIndex={0}
          setHoverIndex={setHoverIndex}
          setPosition={setPosition}
          isMenuDirection={false}
        />
        <MenuItem
          icon={<Folder size={18} />}
          text="Open Folder"
          thisIndex={1}
          setHoverIndex={setHoverIndex}
          setPosition={setPosition}
          isMenuDirection={false}
        />
        <MenuItem
          icon={<Wallpaper size={18} />}
          text="wallpaper"
          thisIndex={2} //tidak ada index
          setPosition={setPosition}
          setHoverIndex={setHoverIndex}
          isMenuDirection={true}
        />
        <MenuItem
          icon={<Settings size={18} />}
          text="Setting"
          thisIndex={3}
          setHoverIndex={setHoverIndex}
          setPosition={setPosition}
          isMenuDirection={true}
        />
        <MenuItem
          icon={<Trash2 size={18} />}
          text="Delete"
          thisIndex={4}
          setHoverIndex={setHoverIndex}
          setPosition={setPosition}
          isMenuDirection={false}
        />
        <hr className="border-gray-600 my-1" />
        <MenuItem
          icon={<LogOut size={18} />}
          text="Logout"
          thisIndex={10}
          setHoverIndex={setHoverIndex}
          setPosition={setPosition}
          isMenuDirection={false}
        />
      </ul>

      {/* Menampilkan CardHoverItems saat dihover | letaknya berdasarkan posisi yang di dapat */}
      {hoverIndex !== null && dataItems[hoverIndex] && (
        <div
          className="absolute z-50"
          style={{ top: position.posY, left: position.posX + 16 }}
          //style={{ top : y, left: x +120}}
          onMouseLeave={() => setHoverIndex(null)}
        >
          {/* filder jika text data kosong */}
          {dataItems[hoverIndex].text.length !== 0 && (
            <CardHoverItems context={dataItems[hoverIndex]} />
          )}
        </div>
      )}
    </>
  );
};

export default ContextMenu;
