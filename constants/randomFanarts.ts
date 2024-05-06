export type RandomFanartType = {
  id: number;
  key: string;
  title: string;
  color: string;
  url: string;
};

export const RANDOM_FANARTS: RandomFanartType[] = [
  {
    id: 1,
    key: 'IsegyeDol2Y',
    title: '🎉 이세돌 2주년 특집 🎉',
    color: 'pink',
    url: `/keyword_rand?query=%EB%A6%AC%EC%99%80%EC%9D%B8%EB%93%9C&query=rewind&query=re:wind&query=%EB%8D%B0%EB%B7%94%202%EC%A3%BC%EB%85%84&case_sensitive=false&title&board=isd&board=best&board=goldhand`,
  },
  {
    id: 2,
    key: 'third_album',
    title: '🌼 KIDDING 특집 🌼',
    color: 'green',
    url: `/third_album`,
  },
  {
    id: 3,
    key: 'isegye_festival',
    title: '❤️‍🔥 이세계 페스티벌 특집 ❤️‍🔥',
    color: 'purple',
    url: `/isegye_festival`,
  },
  {
    id: 4,
    key: 'christmas',
    title: '🎅🏼 크리스마스 특집 🎄',
    color: 'red',
    url: `/keyword_rand?query=크리스마스&query=christmas&case_sensitive=false&title&board=isd&board=best&board=goldhand`,
  },
];
