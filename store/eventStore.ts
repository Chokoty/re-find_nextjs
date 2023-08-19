import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const eventStore = (set) => ({
  isMelonVoteModalOpen: true,
  setIsMelonVoteModalOpen: (value) => set({ isMelonVoteModalOpen: value }),
});

export const useEventStore = create(devtools(eventStore));
