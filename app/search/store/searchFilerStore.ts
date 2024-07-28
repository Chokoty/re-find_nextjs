import { create } from 'zustand';

type SearchFilterStore = {
  isFetching: boolean;
  setIsFetching: (isFetching: boolean) => void;
};

export const useSearchFilterStore = create<
  SearchFilterStore,
  [['zustand/devtools', SearchFilterStore]]
>((set) => ({
  isFetching: false,
  setIsFetching: (isFetching) => set({ isFetching }),
}));
