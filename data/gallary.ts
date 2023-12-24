interface Gallary {
  id: number;
  option?: string;
  title: string;
  subTitle: string;
}

const gallary: Gallary[] = [
  {
    id: 1,
    option: '&title&ranktype=latest&per_page=30',
    title: '이세돌이 고른 팬아트',
    subTitle: '이세돌이 고른 팬아트',
  },
  {
    id: 2,
    option: '&title&ranktype=latest&per_page=30',
    title: '할로윈 팬아트',
    subTitle: '🎃 할로윈 특집 🎃',
  },
  {
    id: 3,
    option: '&title&ranktype=latest&per_page=30',
    title: '이세돌 2주년 팬아트',
    subTitle: '이세돌 2주년 팬아트',
  },
];

export default gallary;
