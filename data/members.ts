interface Member {
  id: number;
  name: string;
  value: string;
  keyword?: string;
}

const members: Member[] = [
  { id: 1, name: '우왁굳', value: 'woowakgood' },
  { id: 3, name: '이세돌', value: 'isd' },
  { id: 4, name: '아이네', value: 'ine' },
  { id: 5, name: '징버거', value: 'jinburger' },
  { id: 6, name: '릴파', value: 'lilpa' },
  { id: 7, name: '주르르', value: 'jururu' },
  { id: 8, name: '고세구', value: 'gosegu' },
  { id: 9, name: '비챤', value: 'viichan' },
  { id: 2, name: '고멤/교멤', value: 'gomem', keyword: '고멤' },
  // { id: 10, name: '뢴트게늄', value: 'rt' },
];

export default members;
