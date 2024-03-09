import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface EventStore {
  isMelonVoteModalOpen: boolean;
  setIsMelonVoteModalOpen: (value: boolean) => void;
}

export const useEventStore = create<
  EventStore,
  [['zustand/devtools', EventStore]]
>(
  devtools((set) => ({
    isMelonVoteModalOpen: true,
    setIsMelonVoteModalOpen: (value) => set({ isMelonVoteModalOpen: value }),
  }))
);
