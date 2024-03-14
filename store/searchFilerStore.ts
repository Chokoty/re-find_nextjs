import { create } from 'zustand';

import type { CountLimit } from '@/types';

type CountLimitWithoutCheck = Omit<CountLimit, 'check'>;

type SearchFilterStore = {
  board: string;
  category: string;
  dateType: string;
  rankType: string;
  hasSensitiveCase: boolean;
  hasTitle: boolean;
  hasContent: boolean;
  hasAuthor: boolean;
  viewCountLimit: CountLimit;
  likeCountLimit: CountLimit;
  commentCountLimit: CountLimit;
  // set methods
  selectBoard: (board: string) => void;
  selectCategory: (category: string) => void;
  selectDateType: (dateType: string) => void;
  selectRankType: (rankType: string) => void;
  checkSensitive: (check: boolean) => void;
  checkTitle: (check: boolean) => void;
  checkContent: (check: boolean) => void;
  checkAuthor: (check: boolean) => void;
  checkViewCountLimit: (check: boolean) => void;
  checkLikeCountLimit: (check: boolean) => void;
  checkCommentCountLimit: (check: boolean) => void;
  setViewCountLimit: (limit: CountLimitWithoutCheck) => void;
  setLikeCountLimit: (limit: CountLimitWithoutCheck) => void;
  setCommentCountLimit: (limit: CountLimitWithoutCheck) => void;
  resetFilter: () => void;
};

export const useSearchFilterStore = create<
  SearchFilterStore,
  [['zustand/devtools', SearchFilterStore]]
>((set) => ({
  board: 'all',
  category: 'all',
  dateType: 'all',
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
  selectBoard: (board) => set({ board }),
  selectCategory: (category) => set({ category }),
  selectDateType: (dateType) => set({ dateType }),
  selectRankType: (rankType) => set({ rankType }),
  checkSensitive: (check) => set({ hasSensitiveCase: check }),
  checkTitle: (check) => set({ hasTitle: check }),
  checkContent: (check) => set({ hasContent: check }),
  checkAuthor: (check) => set({ hasAuthor: check }),
  checkViewCountLimit: (check) =>
    set((state) => ({
      viewCountLimit: { ...state.viewCountLimit, check },
    })),
  checkLikeCountLimit: (check) =>
    set((state) => ({
      likeCountLimit: { ...state.likeCountLimit, check },
    })),
  checkCommentCountLimit: (check) =>
    set((state) => ({
      commentCountLimit: { ...state.commentCountLimit, check },
    })),
  setViewCountLimit: (limit) =>
    set((state) => ({ viewCountLimit: { ...state.viewCountLimit, ...limit } })),
  setLikeCountLimit: (limit) =>
    set((state) => ({ likeCountLimit: { ...state.likeCountLimit, ...limit } })),
  setCommentCountLimit: (limit) =>
    set((state) => ({
      commentCountLimit: { ...state.commentCountLimit, ...limit },
    })),
  resetFilter: () =>
    set({
      board: 'all',
      category: 'all',
      dateType: 'all',
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
}));
