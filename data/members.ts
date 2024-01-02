interface Member {
  id: number;
  value: string;
  name: string;
  author?: string;
  query?: string;
}

const members: Member[] = [
  {
    id: 1,
    value: 'woowakgood',
    name: '우왁굳',
    author: '우왁굳',
    query: 'gallery?member=woowakgood',
  },
  // {
  //   id: 2,
  //   value: 'isd',
  //   name: '이세돌',
  //   author: '이세돌',
  //   query: 'gallery?member=isd',
  // },
  {
    id: 3,
    value: 'ine',
    name: '아이네',
    author: '아이네',
    query: 'gallery?member=ine',
  },
  {
    id: 4,
    value: 'jinburger',
    name: '징버거',
    author: '징버거',
    query: 'gallery?member=jingburger',
  },
  {
    id: 5,
    value: 'lilpa',
    name: '릴파',
    author: '릴파 LILPA',
    query: 'gallery?member=lilpa',
  },
  {
    id: 6,
    value: 'jururu',
    name: '주르르',
    author: '주르르',
    query: 'gallery?member=jururu',
  },
  {
    id: 7,
    value: 'gosegu',
    name: '고세구',
    author: '고세구',
    query: 'gallery?member=gosegu',
  },
  {
    id: 8,
    value: 'viichan',
    name: '비챤',
    author: '비챤',
    query: 'gallery?member=viichan',
  },
  { id: 9, value: 'gomem', name: '고멤/교멤', query: 'gallery?member=gomem' },
  // { id: 10, name: '뢴트게늄', value: 'rt' },
];

export default members;
