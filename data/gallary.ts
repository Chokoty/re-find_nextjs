interface Gallary {
  id: number;
  sub?: string;
  option?: string;
  title: string;
  subTitle: string;
  description?: string;
}

const gallary: Gallary[] = [
  {
    id: 0,
    sub: 'isdPick',
    option: 'board=isd_notice&author',
    title: '이세돌이 직접 고른 팬아트',
    subTitle: '이세돌이 고른 팬아트',
    description: '이세돌의 공지사항에 올라온 팬아트를 모아봤습니다.',
  },
  {
    id: 2,
    option: '&title&ranktype=latest&per_page=30',
    title: '할로윈 팬아트',
    subTitle: '🎃 할로윈 특집 팬아트 🎃',
  },
  {
    id: 3,
    option: '&title&ranktype=latest&per_page=30',
    title: '이세돌 2주년 팬아트',
    subTitle: '이세돌 2주년 팬아트',
  },
  {
    id: 4,
    option: '&title&ranktype=latest&per_page=30',
    title: '크리스마스 팬아트',
    subTitle: '🎅🏼 크리스마스 특집 팬아트 🎄',
  },
];

export default gallary;
