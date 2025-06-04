"use client";

import React, { createContext, useState, useContext } from "react";

type ModalType = {
  thisItemDirection: itemsDirectionType;
  togleItemsDirection: (id: string) => void; // Fungsi untuk toggle arah wallpaper
};

type itemsDirectionType = {
  id: string;
};

const Modal = createContext<ModalType | undefined>(undefined);

// 3. Buat provider
export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [thisItemDirection, sethisItemDirection] = useState<itemsDirectionType>(
    { id: "" }
  );

  /** fungsi yg akan mengatur card yang di render berdasarkan __id__ yg di dapat */
  /**__id__ nya sesauiakan dari  */
  const togleItemsDirection = (id: string) => {
    sethisItemDirection((prev) => {
      // Jika id yang diberikan sama dengan id yang ada, maka toggle ke arah lain
      if (prev.id === id) {
        return { id: "" }; // Reset ke arah default
      }
      // Jika id berbeda, set ke id baru
      return { id };
    });
  };

  return (
    <Modal.Provider value={{ thisItemDirection, togleItemsDirection }}>
      {children}
    </Modal.Provider>
  );
};

/**Global context menyimpan modal App yang muncul  */
export const useModal = () => {
  const context = useContext(Modal);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
