import type { Board } from '@/types';

export const TARGET_COUNT = 60000; // 이벤트 타겟 카운트
export const SUB_TITLES = ['왁타버스', '우왁굳', '이세돌', '고멤/교멤'];
export const RANDOM_TEXTS = ['과연', '어떤', '팬아트가', '나올까요?', '🤔'];

const BOARD_LIST: Board[] = [
  {
    board: '이세돌┃팬아트',
    id: '344',
    // mlink: 'https://m.cafe.naver.com/ca-fe/web/cafes/27842958/menus/344',
    // link: 'https://cafe.naver.com/steamindiegame?iframe_url=/ArticleList.nhn%3Fsearch.clubid=27842958%26search.menuid=344%26search.boardtype=I',
    // https://cafe.naver.com/steamindiegame?iframe_url=/ArticleList.nhn%3Fsearch.clubid=27842958%26search.menuid=344%26search.boardtype=I
  },
  {
    board: '통합 BEST 팬아트 게시판',
    id: '551',
  },
  {
    board: '금손 작가들의 방',
    id: '552',
  },
  {
    board: '이세돌┃작업후기',
    id: '467',
  },
  {
    board: '고멤┃팬아트',
    id: '299',
  },
  {
    board: '고멤┃작업 후기',
    id: '530',
  },
  {
    board: '우왁굳 팬아트',
    id: '59',
  },
  {
    board: '왁타버스 불법 굿즈',
    id: '506',
  },
  {
    board: '왁타버스 불법 배경',
    id: '504',
  },
  {
    board: '▶ 카페 공지사항',
    id: '24',
  },
  {
    board: '왁타버스 불법 AI 팬아트',
    id: '604',
    state: '-관-',
  },
];

export default BOARD_LIST;
