interface Gallary {
  id: number;
  value: string;
  title: string;
  subTitle: string;
  description?: string;
  keyword?: string;
  query?: string;
}

const gallary: Gallary[] = [
  {
    id: 0,
    value: 'isdPick',
    title: '이세돌이 고른 팬아트',
    subTitle: '이세돌이 고른 팬아트',
    description: '이세돌의 공지사항에 올라온 팬아트를 모아봤습니다.',
    query: 'board=isd_notice&author',
  },
  {
    id: 2,
    value: 'halloween',
    title: '할로윈 팬아트',
    subTitle: '🎃 할로윈 특집 팬아트 🎃',
    keyword: '할로윈',
  },
  {
    id: 3,
    value: 'rewind2year',
    title: '이세돌 2주년 팬아트',
    subTitle: '이세돌 2주년 팬아트',
    keyword: '리와인드&query=rewind&query=re:wind&query=데뷔%202주년',
  },
  {
    id: 4,
    value: 'christmas',
    title: '크리스마스 팬아트',
    subTitle: '🎅🏼 크리스마스 특집 팬아트 🎄',
    keyword: '크리스마스',
  },
];

export default gallary;
