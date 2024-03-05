import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface DrawerStore {
  count: number;
  increaseCount: () => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const useDrawerStore = create<
  DrawerStore,
  [['zustand/devtools', DrawerStore]]
>(
  devtools((set) => ({
    count: 0,
    increaseCount: () => set((state) => ({ count: state.count + 1 })),
    isOpen: false,
    setIsOpen: (value) => set({ isOpen: value }),
  }))
);
