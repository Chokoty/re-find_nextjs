interface Member {
  id: number;
  value: string;
  name: string;
  author?: string;
  query?: string[];
}

const members: Member[] = [
  {
    id: 1,
    value: 'woowakgood',
    name: '우왁굳',
    author: '우왁굳',
    query: ['board=wak&query=두'],
  },
  {
    id: 2,
    value: 'isd',
    name: '이세돌',
    author: '이세돌',
    query: ['board=isd'],
  },
  {
    id: 3,
    value: 'ine',
    name: '아이네',
    author: '아이네',
    query: [
      'board=isd&category=아이네',
      'board=best&board=goldhand&query=아이네&query=이네',
    ],
  },
  {
    id: 4,
    value: 'jinburger',
    name: '징버거',
    author: '징버거',
    query: [
      'board=isd&category=징버거',
      'board=best&board=goldhand&query=징버거&query=버거',
    ],
  },
  {
    id: 5,
    value: 'lilpa',
    name: '릴파',
    author: '릴파 LILPA',
    query: [
      'board=isd&category=릴파',
      'board=best&board=goldhand&query=릴파&query=파',
    ],
  },
  {
    id: 6,
    value: 'jururu',
    name: '주르르',
    author: '주르르',
    query: [
      'board=isd&category=주르르',
      'board=best&board=goldhand&query=주르르&query=르르',
    ],
  },
  {
    id: 7,
    value: 'gosegu',
    name: '고세구',
    author: '고세구',
    query: [
      'board=isd&category=고세구',
      'board=best&board=goldhand&query=고세구&query=세구',
    ],
  },
  {
    id: 8,
    value: 'viichan',
    name: '비챤',
    author: '비챤',
    query: [
      'board=isd&category=비챤',
      'board=best&board=goldhand&query=챤&query=챠니',
    ],
  },
  { id: 9, value: 'gomem', name: '고멤/교멤', query: ['고멤'] },
  // { id: 10, name: '뢴트게늄', value: 'rt' },
];

export default members;
