import { useEffect, useState } from "react";
import { useModalApk } from "../aplikasi-modal";
import { ArrowBigRightDash } from "lucide-react";

interface dataItemsType {
  text: string[];
  idDirection: string[];
}
//pastikan sama dengan yg ada di induk __contextItems.text__
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
  {
    text: [""],
    idDirection: ["walpaper"],
  },
];

/** ini adalah Menu menu yg di dalam __ul__ */
const MenuItem = ({
  icon,
  text,
  thisIndex,
  setHoverIndex,
  isMenuDirection,
  setPosition,
}: {
  icon: React.ReactNode;
  text: string;
  thisIndex: number;
  isMenuDirection: boolean;
  setHoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setPosition: React.Dispatch<
    React.SetStateAction<{ posX: number; posY: number }>
  >;
}) => {
  const { addWindow } = useModalApk();

  const [isRotate, setIsrotate] = useState(false);
  console.log("id li", text);
  const addContextWindow = () => {
    if (text && isMenuDirection != false) {
      addWindow(text.toLocaleLowerCase().trim());
    }
  };

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
      onClick={addContextWindow}
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

export default MenuItem;
