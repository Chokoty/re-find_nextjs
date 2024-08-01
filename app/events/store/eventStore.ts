import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface EventStore {
  isSkipped: boolean;
  toggleSkip: () => void;
  resetSkip: () => void;
}

export const useEventStore = create<EventStore>()(
  devtools((set) => ({
    isSkipped: false,
    toggleSkip: () => set((state) => ({ isSkipped: !state.isSkipped })),
    resetSkip: () => set({ isSkipped: false }),
  }))
);
