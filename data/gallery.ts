import type { Gallery } from '@/types';

const gallery: Gallery[] = [
  {
    id: 0,
    value: 'isdPick',
    type: 'special',
    title: '이세돌픽 팬아트',
    subTitle: '이세돌이 고른 팬아트',
    description: '이세계아이돌이 고른 공지사항 팬아트',
    query: 'artworks?board=isd_notice&author&case_sensitive=false&title',
  },
  {
    id: 1,
    value: 'kissingYou',
    type: 'special',
    title: '이세돌 키싱유 팬아트',
    description: '오랜만에 돌아온 이세계아이돌 단체 커버곡 키싱유!',
    subTitle: '🍭 이세돌 키싱유 팬아트 🍭',
    query:
      'artworks?query=kissing&query=키싱&query=키씽&query=뚜뚜뚜&query=뚜두루&query=고마워 사랑해&query=사랑해 한마디&query=너만을 사랑해&case_sensitive=false&board=isd&board=best&title=',
  },
  {
    id: 2,
    value: 'lilpaBirthday',
    type: 'special',
    title: '릴파님 생일 팬아트',
    subTitle: '🎂 릴파님 생일 팬아트 🎂',
    description: '릴파님의 탄신일을 진심으로 축하드립니다!',
    query: 'gallery?member=lilpa&since=20240309&until=20240309',
  },
  {
    id: 3,
    value: 'viichanBirthday',
    type: 'special',
    title: '비챤님 생일 팬아트',
    subTitle: '🎂 비챤님 생일 팬아트 🎂',
    description: '비챤님의 탄신일을 진심으로 축하드립니다!',
    query: 'gallery?member=viichan&since=20240116&until=20240116',
  },
  {
    id: 4,
    value: 'rewind2year',
    type: 'special',
    title: '이세돌 2주년 팬아트',
    subTitle: ' ❤️‍🔥 이세돌 2주년 ❤️‍🔥',
    description: '이세계아이돌과 함께한 2년간의 추억들',
    query:
      'artworks?board=isd&board=gomem&board=wak&board=best&board=goldhand&case_sensitive=false&title&query=리와인드&query=rewind&query=re:wind&query=데뷔%202주년',
  },
  {
    id: 5,
    value: 'christmas',
    type: 'keyword',
    title: '크리스마스 팬아트',
    subTitle: '🎅🏼 크리스마스 특집 🎄',
    description: '이세돌과 함께 메리 크리스마스!',
    query:
      'artworks?board=isd&board=gomem&board=wak&board=best&board=goldhand&case_sensitive=false&title&query=크리스마스',
  },
  {
    id: 6,
    value: 'halloween',
    type: 'keyword',
    title: '할로윈 팬아트',
    subTitle: '🎃 할로윈 특집 🎃',
    description: 'Trick or Treat! 해피 할로윈',
    query:
      'artworks?board=isd&board=gomem&board=wak&board=best&board=goldhand&case_sensitive=false&title&query=할로윈',
  },
  // {
  //   id: 8,
  //   value: 'Shuko',
  //   type: 'special',
  //   title: '기간한정 슛코☆팬아트',
  //   subTitle: '기간한정 슛코☆팬아트', // '😉 응 없어~ 😉',
  //   query: 'wakdu_list?',
  // },
  // {
  //   id: 9,
  //   value: 'AprilFool',
  //   type: 'special',
  //   title: '진짜 만우절 팬아트',
  //   subTitle: '😉 진짜 만우절 팬아트 😉',
  //   query: 'april_fools?',
  //   isHidden: true,
  // },
];

export default gallery;
