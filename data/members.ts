interface Member {
  id: number;
  name: string;
  value: string;
  keyword?: string;
}

const members: Member[] = [
  { id: 1, name: '우왁굳', value: 'woowakgood', keyword: '우왁굳' },
  { id: 2, name: '이세돌', value: 'isd', keyword: '이세돌' },
  { id: 3, name: '아이네', value: 'ine', keyword: '아이네&query=이네' },
  { id: 4, name: '징버거', value: 'jinburger', keyword: '징버거&query=버거' },
  { id: 5, name: '릴파', value: 'lilpa', keyword: '릴파' },
  { id: 6, name: '주르르', value: 'jururu', keyword: '주르르&query=르르' },
  { id: 7, name: '고세구', value: 'gosegu', keyword: '고세구&query=세구' },
  { id: 8, name: '비챤', value: 'viichan', keyword: '비챤' },
  { id: 9, name: '고멤/교멤', value: 'gomem', keyword: '고멤' },
  // { id: 10, name: '뢴트게늄', value: 'rt' },
];

export default members;
