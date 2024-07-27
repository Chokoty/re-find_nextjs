import { useReducer } from 'react';

import { MAX_COUNT, MIN_COUNT } from '@/app/search/lib/const';
import type { CountLimit, DateType } from '@/types';

// 타입 정의
// type DateType = {
//   type: 'all' | 'recent' | 'past';
// };

export type SearchFilterState = {
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
};

// 액션 타입 정의
export type SearchFilterAction =
  | { type: 'SELECT_BOARD'; payload: string }
  | { type: 'SELECT_CATEGORY'; payload: string }
  | { type: 'SELECT_DATE_TYPE'; payload: DateType }
  | { type: 'SELECT_RANK_TYPE'; payload: string }
  | { type: 'CHECK_SENSITIVE'; payload: boolean }
  | { type: 'CHECK_TITLE'; payload: boolean }
  | { type: 'CHECK_CONTENT'; payload: boolean }
  | { type: 'CHECK_AUTHOR'; payload: boolean }
  | { type: 'CHECK_VIEW_COUNT_LIMIT'; payload: CountLimit }
  | { type: 'CHECK_LIKE_COUNT_LIMIT'; payload: CountLimit }
  | { type: 'CHECK_COMMENT_COUNT_LIMIT'; payload: CountLimit }
  | { type: 'RESET_FILTER' };

// 초기 상태
const initialState: SearchFilterState = {
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
    min: MIN_COUNT,
    max: MAX_COUNT,
  },
  likeCountLimit: {
    check: false,
    min: MIN_COUNT,
    max: MAX_COUNT,
  },
  commentCountLimit: {
    check: false,
    min: MIN_COUNT,
    max: MAX_COUNT,
  },
};

// 리듀서 함수
function reducer(
  state: SearchFilterState,
  action: SearchFilterAction
): SearchFilterState {
  switch (action.type) {
    case 'SELECT_BOARD':
      return { ...state, board: action.payload };
    case 'SELECT_CATEGORY':
      return { ...state, category: action.payload };
    case 'SELECT_DATE_TYPE':
      return { ...state, dateType: action.payload };
    case 'SELECT_RANK_TYPE':
      return { ...state, rankType: action.payload };
    case 'CHECK_SENSITIVE':
      return { ...state, hasSensitiveCase: action.payload };
    case 'CHECK_TITLE':
      return { ...state, hasTitle: action.payload };
    case 'CHECK_CONTENT':
      return { ...state, hasContent: action.payload };
    case 'CHECK_AUTHOR':
      return { ...state, hasAuthor: action.payload };
    case 'CHECK_VIEW_COUNT_LIMIT':
      return { ...state, viewCountLimit: action.payload };
    case 'CHECK_LIKE_COUNT_LIMIT':
      return { ...state, likeCountLimit: action.payload };
    case 'CHECK_COMMENT_COUNT_LIMIT':
      return { ...state, commentCountLimit: action.payload };
    case 'RESET_FILTER':
      return initialState;
    default:
      return state;
  }
}

// 커스텀 훅 정의
export function useSearchFilter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    selectBoard: (board: string) =>
      dispatch({ type: 'SELECT_BOARD', payload: board }),
    selectCategory: (category: string) =>
      dispatch({ type: 'SELECT_CATEGORY', payload: category }),
    selectDateType: (dateType: DateType) =>
      dispatch({ type: 'SELECT_DATE_TYPE', payload: dateType }),
    selectRankType: (rankType: string) =>
      dispatch({ type: 'SELECT_RANK_TYPE', payload: rankType }),
    checkSensitive: (check: boolean) =>
      dispatch({ type: 'CHECK_SENSITIVE', payload: check }),
    checkTitle: (check: boolean) =>
      dispatch({ type: 'CHECK_TITLE', payload: check }),
    checkContent: (check: boolean) =>
      dispatch({ type: 'CHECK_CONTENT', payload: check }),
    checkAuthor: (check: boolean) =>
      dispatch({ type: 'CHECK_AUTHOR', payload: check }),
    checkViewCountLimit: (limitInfo: CountLimit) =>
      dispatch({ type: 'CHECK_VIEW_COUNT_LIMIT', payload: limitInfo }),
    checkLikeCountLimit: (limitInfo: CountLimit) =>
      dispatch({ type: 'CHECK_LIKE_COUNT_LIMIT', payload: limitInfo }),
    checkCommentCountLimit: (limitInfo: CountLimit) =>
      dispatch({ type: 'CHECK_COMMENT_COUNT_LIMIT', payload: limitInfo }),
    resetFilter: () => dispatch({ type: 'RESET_FILTER' }),
  };

  return [state, actions] as const;
}
