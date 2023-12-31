interface Member {
  id: number;
  value: string;
  name: string;
  author?: string;
  keyword?: string;
}

const members: Member[] = [
  {
    id: 1,
    value: 'woowakgood',
    name: '우왁굳',
    author: '우왁굳',
    keyword: '우왁굳',
  },
  { id: 2, name: '이세돌', value: 'isd', keyword: '이세돌' },
  {
    id: 3,
    value: 'ine',
    name: '아이네',
    author: '아이네',
    keyword: '아이네&query=이네',
  },
  {
    id: 4,
    value: 'jinburger',
    name: '징버거',
    author: '징버거',
    keyword: '징버거&query=버거',
  },
  {
    id: 5,
    value: 'lilpa',
    name: '릴파',
    author: '릴파 LILPA',
    keyword: '릴파',
  },
  {
    id: 6,
    value: 'jururu',
    name: '주르르',
    author: '주르르',
    keyword: '주르르&query=르르',
  },
  {
    id: 7,
    value: 'gosegu',
    name: '고세구',
    author: '고세구',
    keyword: '고세구&query=세구',
  },
  { id: 8, value: 'viichan', name: '비챤', author: '비챤', keyword: '비챤' },
  { id: 9, value: 'gomem', name: '고멤/교멤', keyword: '고멤' },
  // { id: 10, name: '뢴트게늄', value: 'rt' },
];

export default members;
