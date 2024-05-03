import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { SortRankCriteria, SortTotalCriteria } from '@/types';

interface ArtistSearchInfoStore {
  debounceValue: string;
  total?: number;
  setTotal: (total?: number) => void;
  setDebounceValue: (debounceValue: string) => void;
  rankCriteria: SortRankCriteria | null;
  sortRankCriteria: (value: SortRankCriteria) => void;
  totalCountCriteria: SortTotalCriteria;
  sortTotalCountCriteria: (field: SortTotalCriteria) => void;
}

export const useArtistSearchInfoStore = create<ArtistSearchInfoStore>()(
  devtools((set) => ({
    total: undefined,
    debounceValue: '',
    setTotal: (total) => set({ total }),
    setDebounceValue: (debounceValue) => set({ debounceValue }),
    rankCriteria: null,
    sortRankCriteria: (value: SortRankCriteria) =>
      set((state) => ({
        rankCriteria: state.rankCriteria === value ? null : value,
      })),
    totalCountCriteria: 'total_likes',
    sortTotalCountCriteria: (field: SortTotalCriteria) =>
      set((state) => {
        if (state.totalCountCriteria === field) {
          // 이미 선택된 필드를 클릭했을 때
          return {};
        }
        return { totalCountCriteria: field };
      }),
  }))
);
