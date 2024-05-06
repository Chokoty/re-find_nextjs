import type { Sort, View } from '@/types';

export const VIEW_TYPES: View[] = [
  { name: '베스트', value: 'best_cnt', colorScheme: 'purple' },
  { name: '금손 작가', value: 'goldhand_cnt', colorScheme: 'yellow' },
  { name: '우왁굳', value: 'wak_cnt', colorScheme: 'green' },
  { name: '고멤/교멤', value: 'gomem_cnt', colorScheme: 'teal' },
  { name: '이세돌', value: 'isd_cnt', colorScheme: 'pink' }, // 추천
];

export const SORT_TYPES: Sort[] = [
  { name: '총 조회', value: 'total_views' },
  { name: '총 댓글', value: 'total_comments' },
  { name: '총 좋아요', value: 'total_likes' },
  { name: '총 작품', value: 'total_articles' },
  { name: '총 구독', value: 'total_subscribers' },
];

export const MENU_ITEMS = [
  { id: 'alzaltak', label: '알잘딱순', isdPick: false },
  { id: 'random', label: '랜덤순', isdPick: false },
  { id: 'latest', label: '최신순', isdPick: true },
  { id: 'oldest', label: '업로드순', isdPick: true },
  { id: 'view', label: '조회수순', isdPick: true },
  { id: 'like', label: '좋아요순', isdPick: true },
  { id: 'comment', label: '댓글순', isdPick: true },
];
