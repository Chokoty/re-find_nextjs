import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ImageViewerStore {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  imageSrc: string;
}

export const useImageViewerStore = create<
  ImageViewerStore,
  [['zustand/devtools', ImageViewerStore]]
>(
  devtools((set) => ({
    isOpen: false,
    setIsOpen: (value) => set({ isOpen: value }),
    imageSrc: '',
  }))
);
