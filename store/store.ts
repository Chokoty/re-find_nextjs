import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const store = (set) => ({
  count: 0,
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
});

export const useStore = create(devtools(store));
