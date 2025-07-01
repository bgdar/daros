"use client";

import { useModalApk } from "../aplikasi-modal";
import DraggableWindow from "./DragtableWindow";

const WrappingApps = () => {
  const { windows, closeWindow, focusWindow, handleDragWindow } = useModalApk();
  return (
    <div>
      {windows.map((win) => (
        <DraggableWindow
          key={win.id}
          win={win}
          onClose={closeWindow}
          onDrag={handleDragWindow}
          onFocus={focusWindow}
        />
      ))}
    </div>
  );
};

export default WrappingApps;
