import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SelectModeStore {
  isSelectMode: boolean;
  setSelectMode: (value: boolean) => void;
  toggleSelectMode: () => void;
}

export const useSelectModeStore = create<SelectModeStore>()(
  devtools((set) => ({
    isSelectMode: false,
    setSelectMode: (value: boolean) => set({ isSelectMode: value }),
    toggleSelectMode: () =>
      set((state) => ({ isSelectMode: !state.isSelectMode })),
  }))
);
