import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ModalStore {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const useModalStore = create<
  ModalStore,
  [['zustand/devtools', ModalStore]]
>(
  devtools((set) => ({
    isOpen: false,
    setIsOpen: (value) => set({ isOpen: value }),
  }))
);
