import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CheckFanartStore {
  fanarts: number[];
  setFanarts: (fanarts: number[]) => void;
}

export const useCheckFanartStore = create<CheckFanartStore>()(
  devtools((set) => ({
    fanarts: [],
    setFanarts: (fanarts) => set({ fanarts }),
  }))
);
