import { create } from 'zustand';

interface isdPickStore {
  artworks: IsdArtworkList[];
  setArtworks: (data: IsdArtworkList[]) => void;
}

const useIsdPickStore = create<isdPickStore>((set) => ({
  artworks: [],
  setArtworks: (data) => set(() => ({ artworks: data })),
}));

export default useIsdPickStore;
