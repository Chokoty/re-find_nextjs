import { create } from 'zustand';

import type { CountLimit, DateType } from '@/types';

type SearchFilterStore = {
  board: string;
  category: string;
  dateType: DateType;
  rankType: string;
  hasSensitiveCase: boolean;
  hasTitle: boolean;
  hasContent: boolean;
  hasAuthor: boolean;
  viewCountLimit: CountLimit;
  likeCountLimit: CountLimit;
  commentCountLimit: CountLimit;
  isFetching: boolean;
  // set methods
  selectBoard: (board: string) => void;
  selectCategory: (category: string) => void;
  selectDateType: (dateType: DateType) => void;
  selectRankType: (rankType: string) => void;
  checkSensitive: (check: boolean) => void;
  checkTitle: (check: boolean) => void;
  checkContent: (check: boolean) => void;
  checkAuthor: (check: boolean) => void;
  checkViewCountLimit: (limitInfo: CountLimit) => void;
  checkLikeCountLimit: (limitInfo: CountLimit) => void;
  checkCommentCountLimit: (limitInfo: CountLimit) => void;
  resetFilter: () => void;
  setIsFetching: (isFetching: boolean) => void;
};

export const useSearchFilterStore = create<
  SearchFilterStore,
  [['zustand/devtools', SearchFilterStore]]
>((set) => ({
  board: 'all',
  category: 'all',
  dateType: {
    type: 'all',
  },
  rankType: 'latest',
  hasSensitiveCase: false,
  hasTitle: false,
  hasContent: false,
  hasAuthor: false,
  viewCountLimit: {
    check: false,
    min: 0,
    max: 100,
  },
  likeCountLimit: {
    check: false,
    min: 0,
    max: 100,
  },
  commentCountLimit: {
    check: false,
    min: 0,
    max: 100,
  },
  isFetching: false,
  selectBoard: (board) => set({ board }),
  selectCategory: (category) => set({ category }),
  selectDateType: (dateType) => set({ dateType }),
  selectRankType: (rankType) => set({ rankType }),
  checkSensitive: (check) => set({ hasSensitiveCase: check }),
  checkTitle: (check) => set({ hasTitle: check }),
  checkContent: (check) => set({ hasContent: check }),
  checkAuthor: (check) => set({ hasAuthor: check }),
  checkViewCountLimit: (limitInfo) => set({ viewCountLimit: { ...limitInfo } }),
  checkLikeCountLimit: (limitInfo) => set({ likeCountLimit: { ...limitInfo } }),
  checkCommentCountLimit: (limitInfo) =>
    set({ commentCountLimit: { ...limitInfo } }),
  resetFilter: () =>
    set({
      board: 'all',
      category: 'all',
      dateType: {
        type: 'all',
      },
      rankType: 'latest',
      hasSensitiveCase: false,
      hasTitle: false,
      hasContent: false,
      hasAuthor: false,
      viewCountLimit: {
        check: false,
        min: 0,
        max: 100,
      },
      likeCountLimit: {
        check: false,
        min: 0,
        max: 100,
      },
      commentCountLimit: {
        check: false,
        min: 0,
        max: 100,
      },
    }),
  setIsFetching: (isFetching) => set({ isFetching }),
}));
