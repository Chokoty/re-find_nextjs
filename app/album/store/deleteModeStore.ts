import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface DeleteModeStore {
  isDelete: boolean;
  setIsDelete: (value: boolean) => void;
  toggleDelete: () => void;
}

export const useDeleteModeStore = create<DeleteModeStore>()(
  devtools((set) => ({
    isDelete: false,
    setIsDelete: (value: boolean) => set({ isDelete: value }),
    toggleDelete: () => set((state) => ({ isDelete: !state.isDelete })),
  }))
);
