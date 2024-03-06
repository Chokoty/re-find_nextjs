import { create } from 'zustand';

interface ArtistsStore {
  artistsList: AuthorList;
  setArtistsList: (data: AuthorList) => void;
}

const useArtistsStore = create<ArtistsStore>((set) => ({
  artistsList: {},
  setArtistsList: (data) => set((state) => ({ ...state, artistsList: data })),
}));

export default useArtistsStore;
