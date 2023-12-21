import create from 'zustand';

import type { Artist } from '@/types/artist';

interface ArtistsStore {
  artistsList: Artist[];
  setArtistsList: (data: Artist[]) => void;
}

const useArtistsStore = create<ArtistsStore>((set) => ({
  artistsList: [],
  setArtistsList: (data) => set(() => ({ artistsList: data })),
}));

export default useArtistsStore;
