import { useModal } from "../modal";

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
import { text } from "stream/consumers";

//data items yang di tampilkan berdasarkan urutan index nya di menu card halama
const dataItems = [
  {
    text: ["word", "txt"],
    idDirection: ["word"],
  },
  {
    text: ["new folder", "create folder"],
    idDirection: [""],
  },
  {
    text: ["show walpaper"],
    idDirection: ["show-walpaper"],
  },
];

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
      {/* Menu Utama */}
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
        />
        <MenuItem
          icon={<Folder size={18} />}
          text="Open Folder"
          thisIndex={1}
          setHoverIndex={setHoverIndex}
          setPosition={setPosition}
        />
        <MenuItem
          icon={<Wallpaper size={18} />}
          text="Wallpaper"
          thisIndex={2} //tidak ada index
          setPosition={setPosition}
          setHoverIndex={setHoverIndex}
        />
        <MenuItem
          icon={<Settings size={18} />}
          text="Settings"
          thisIndex={3}
          setHoverIndex={setHoverIndex}
          setPosition={setPosition}
        />
        <MenuItem
          icon={<Trash2 size={18} />}
          text="Delete"
          thisIndex={4}
          setHoverIndex={setHoverIndex}
          setPosition={setPosition}
        />
        <hr className="border-gray-600 my-1" />
        <MenuItem
          icon={<LogOut size={18} />}
          text="Logout"
          thisIndex={10}
          setHoverIndex={setHoverIndex}
          setPosition={setPosition}
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
          <CardHoverItems context={dataItems[hoverIndex]} />
        </div>
      )}
    </>
  );
};
const MenuItem = ({
  icon,
  text,
  thisIndex,
  setHoverIndex,
  setPosition,
}: {
  icon: React.ReactNode;
  text: string;
  thisIndex: number;
  setHoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setPosition: React.Dispatch<
    React.SetStateAction<{ posX: number; posY: number }>
  >;
}) => {
  const [isRotate, setIsrotate] = useState(false);

  return (
    <li
      className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-700 rounded-md relative"
      onMouseEnter={(e) => {
        setHoverIndex(thisIndex);
        const rect = e.currentTarget.getBoundingClientRect();
        const maxX = window.innerWidth - 150; // Batas kanan menu item
        const maxY = window.innerHeight - 10; // Batas bawah menu item

        setIsrotate(!isRotate);
        setPosition({
          posX: Math.min(rect.right, maxX),
          posY: Math.min(rect.top, maxY),
        });
      }}
    >
      <span className="flex items-center gap-2">
        {icon} {text}
      </span>
      {dataItems[thisIndex] ? (
        <span
          className="text-gray-400 transition-transform duration-200"
          style={{
            transform: `rotate(${isRotate ? "90deg" : "0deg"}) scale(${
              isRotate ? "1.4" : "1"
            })`,
          }}
        >
          <ArrowBigRightDash size={18} />
        </span>
      ) : (
        ""
      )}
    </li>
  );
};

interface ContextType {
  text: string[]; // Array teks yang akan ditampilkan sebagai item list
  idDirection?: string[]; // Array idDirection, bisa ada atau tidak
}

//list card yang akan menampung items yang di dapat dari Array of object
const CardHoverItems = ({ context }: { context: ContextType }) => {
  const { togleItemsDirection } = useModal();

  const handleAlliemsDirection = () => {
    if (context.idDirection && context.idDirection.length > 0) {
      context.idDirection.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          //nantik pilih items yang di click dengan katagori id
          togleItemsDirection(id); // Panggil fungsi untuk toggle arah
          //  element.scrollIntoView({ behavior: "smooth" });
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
            {context.idDirection && context.idDirection[index] ? (
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

export default ContextMenu;
