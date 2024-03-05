import type { Gallery } from '@/types';

const gallery: Gallery[] = [
  {
    id: 0,
    value: 'isdPick',
    type: 'special',
    title: '이세돌픽 팬아트',
    subTitle: '이세돌이 고른 팬아트',
    description: '이세돌의 공지사항에 올라온 팬아트를 모아봤습니다.',
    query: 'artworks?board=isd_notice&author&case_sensitive=false&title',
  },
  {
    id: 2,
    value: 'halloween',
    type: 'keyword',
    title: '할로윈 팬아트',
    subTitle: '🎃 할로윈 특집 🎃',
    query:
      'artworks?board=isd&board=gomem&board=wak&board=best&board=goldhand&case_sensitive=false&title&query=할로윈',
  },
  {
    id: 3,
    value: 'rewind2year',
    type: 'special',
    title: '이세돌 2주년 팬아트',
    subTitle: ' ❤️‍🔥 이세돌 2주년 ❤️‍🔥',
    query:
      'artworks?board=isd&board=gomem&board=wak&board=best&board=goldhand&case_sensitive=false&title&query=리와인드&query=rewind&query=re:wind&query=데뷔%202주년',
  },
  {
    id: 4,
    value: 'christmas',
    type: 'keyword',
    title: '크리스마스 팬아트',
    subTitle: '🎅🏼 크리스마스 특집 🎄',
    query:
      'artworks?board=isd&board=gomem&board=wak&board=best&board=goldhand&case_sensitive=false&title&query=크리스마스',
  },
  {
    id: 5,
    value: 'viichanBirthday',
    type: 'special',
    title: '비챤님 생일 팬아트',
    subTitle: '🎂 비챤님 생일 팬아트 🎂',
    query: 'gallery?member=viichan&since=20240116&until=20240116',
  },
];

// https://re-find.reruru.com/

export default gallery;
