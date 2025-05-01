import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface EditModeStore {
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  toggleEdit: () => void;
}

export const useEditModeStore = create<EditModeStore>()(
  devtools((set) => ({
    isEdit: false,
    setIsEdit: (value: boolean) => set({ isEdit: value }),
    toggleEdit: () => set((state) => ({ isEdit: !state.isEdit })),
  }))
);
