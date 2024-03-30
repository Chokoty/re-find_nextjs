import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PromptStore {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const usePromptStore = create<
  PromptStore,
  [['zustand/devtools', PromptStore]]
>(
  devtools((set) => ({
    isOpen: false,
    setIsOpen: (value) => set({ isOpen: value }),
  }))
);
