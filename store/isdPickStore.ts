import { create } from 'zustand';
import type { Artwork } from '@/types/artwork';

interface isdPickStore {
  artworks: Artwork[];
  setArtworks: (data: Artwork[]) => void;
}

const useIsdPickStore = create<isdPickStore>((set) => ({
  artworks: [],
  setArtworks: (data) => set(() => ({ artworks: data })),
}));

export default useIsdPickStore;
