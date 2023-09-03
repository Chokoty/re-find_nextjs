interface Board {
  board: string;
  id: string;
  mlink: string;
  link: string;
  state?: string;
}

const data: Board[] = [
  {
    board: '이세돌 팬아트',
    id: '344',
    mlink: 'https://m.cafe.naver.com/ca-fe/web/cafes/27842958/menus/344',
    link: 'https://cafe.naver.com/steamindiegame?iframe_url=/ArticleList.nhn%3Fsearch.clubid=27842958%26search.menuid=344%26search.boardtype=I',
    //https://cafe.naver.com/steamindiegame?iframe_url=/ArticleList.nhn%3Fsearch.clubid=27842958%26search.menuid=344%26search.boardtype=I
  },
  {
    board: '통합 BEST 팬아트',
    id: '551',
    mlink: 'https://m.cafe.naver.com/ca-fe/web/cafes/27842958/menus/551',
    link: 'https://cafe.naver.com/steamindiegame?iframe_url=/ArticleList.nhn%3Fsearch.clubid=27842958%26search.menuid=551%26search.boardtype=I',
  },
  {
    board: '금손 작가들의 방',
    id: '552',
    mlink: 'https://m.cafe.naver.com/ca-fe/web/cafes/27842958/menus/552',
    link: 'https://cafe.naver.com/steamindiegame?iframe_url=/ArticleList.nhn%3Fsearch.clubid=27842958%26search.menuid=552%26search.boardtype=I',
  },
  {
    board: '이세돌 작업후기',
    id: '553',
    mlink: 'https://m.cafe.naver.com/ca-fe/web/cafes/27842958/menus/467',
    link: 'https://cafe.naver.com/steamindiegame?iframe_url=/ArticleList.nhn%3Fsearch.clubid=27842958%26search.menuid=467%26search.boardtype=I',
  },
  {
    board: '고멤 팬아트',
    id: '299',
    mlink: 'https://m.cafe.naver.com/ca-fe/web/cafes/27842958/menus/299',
    link: 'https://cafe.naver.com/steamindiegame?iframe_url=/ArticleList.nhn%3Fsearch.clubid=27842958%26search.menuid=299%26search.boardtype=I',
  },
  {
    board: '고멤 작업후기',
    id: '530',
    mlink: 'https://m.cafe.naver.com/ca-fe/web/cafes/27842958/menus/530',
    link: 'https://cafe.naver.com/steamindiegame?iframe_url=/ArticleList.nhn%3Fsearch.clubid=27842958%26search.menuid=530%26search.boardtype=I',
  },
  {
    board: '우왁굳 팬아트',
    id: '59',
    mlink: 'https://m.cafe.naver.com/ca-fe/web/cafes/27842958/menus/59',
    link: 'https://cafe.naver.com/steamindiegame?iframe_url=/ArticleList.nhn%3Fsearch.clubid=27842958%26search.menuid=59%26search.boardtype=I',
  },
  {
    board: '카페 공지사항',
    id: '24',
    mlink: 'https://m.cafe.naver.com/ca-fe/web/cafes/27842958/menus/24',
    link: 'https://cafe.naver.com/steamindiegame?iframe_url=/ArticleList.nhn%3Fsearch.clubid=27842958%26search.menuid=24%26search.boardtype=I',
  },
  {
    board: '왁타버스 불법 AI 팬아트',
    id: '604',
    mlink: 'https://m.cafe.naver.com/ca-fe/web/cafes/27842958/menus/604',
    link: 'https://cafe.naver.com/steamindiegame?iframe_url=/ArticleList.nhn%3Fsearch.clubid=27842958%26search.menuid=604%26search.boardtype=I',
    state: '-관-',
  },
];

export default data;
