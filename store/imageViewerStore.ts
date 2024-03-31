import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ImageViewerStore {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  fanart: DoorBehindFanart | null;
  setFanart: (value: DoorBehindFanart | null) => void;
}

export const useImageViewerStore = create<
  ImageViewerStore,
  [['zustand/devtools', ImageViewerStore]]
>(
  devtools((set) => ({
    isOpen: false,
    setIsOpen: (value) => set({ isOpen: value }),
    fanart: null,
    setFanart: (value) => set({ fanart: value }),
  }))
);
