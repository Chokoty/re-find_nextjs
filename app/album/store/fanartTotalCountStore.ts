import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface FanartTotalCountStore {
  total?: number;
  setTotal: (total?: number) => void;
}

export const useFanartTotalCountStore = create<FanartTotalCountStore>()(
  devtools((set) => ({
    total: undefined,
    setTotal: (total) => set({ total }),
  }))
);
