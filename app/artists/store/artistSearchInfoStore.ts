import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ArtistSearchInfoStore {
  debounceValue: string;
  total?: number;
  setTotal: (total?: number) => void;
  setDebounceValue: (debounceValue: string) => void;
}

export const useArtistSearchInfoStore = create<ArtistSearchInfoStore>()(
  devtools((set) => ({
    total: undefined,
    debounceValue: '',
    setTotal: (total) => set({ total }),
    setDebounceValue: (debounceValue) => set({ debounceValue }),
  }))
);
