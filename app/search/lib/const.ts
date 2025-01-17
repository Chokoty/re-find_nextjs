export const ROWS_PER_PAGE = 30; // 한 페이지당 불러올 아이템 개수

export const MIN_COUNT = 0;
export const MAX_COUNT = 20000;

export const delayArr = Array.from(
  { length: ROWS_PER_PAGE },
  (_, i) => `delay-[${i * 100}ms]`
);

export const boardMap: Record<string, string[]> = {
  all: [],
  isd: [
    '아이네',
    '징버거',
    '릴파',
    '주르르',
    '고세구',
    '비챤',
    '기타',
    '2인 이상',
    '월페이퍼2차창작',
  ],
  best: [],
  goldhand: [],
  wak: [
    '팬아트',
    '이모티콘',
    '도네이션효과',
    '우왁끼메인',
    '방송컨텐츠용',
    '합성짤',
    '썸네일삽입용',
    '10주년기념',
  ],
  gomem: ['고멤 팬아트', '기타', '아카데미 팬아트'],
  isd_behind: [],
  gomem_behind: [],
  notice: [],
  ai: ['우왁굳', '고멤', '이세돌', '그 외 혹은 종합'],
};
