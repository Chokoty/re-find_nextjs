import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface DeleteModeStore {
  isDeleteMode: boolean;
  setIsDeleteMode: (value: boolean) => void;
  toggleDeleteMode: () => void;
}

export const useDeleteModeStore = create<DeleteModeStore>()(
  devtools((set) => ({
    isDeleteMode: false,
    setIsDeleteMode: (value: boolean) => set({ isDeleteMode: value }),
    toggleDeleteMode: () =>
      set((state) => ({ isDeleteMode: !state.isDeleteMode })),
  }))
);
