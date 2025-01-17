import { create } from 'zustand';

type SearchFilterStore = {
  searchValue: string;
  isFetching: boolean;
  setSearchValue: (searchValue: string) => void;
  setIsFetching: (isFetching: boolean) => void;
};

export const useSearchFilterStore = create<
  SearchFilterStore,
  [['zustand/devtools', SearchFilterStore]]
>((set) => ({
  searchValue: '',
  setSearchValue: (searchValue) => set({ searchValue }),
  isFetching: false,
  setIsFetching: (isFetching) => set({ isFetching }),
}));
