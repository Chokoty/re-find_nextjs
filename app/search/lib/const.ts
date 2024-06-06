export const ROWS_PER_PAGE = 10; // 한 페이지당 불러올 아이템 개수

export const delayArr = Array.from(
  { length: ROWS_PER_PAGE },
  (_, i) => `delay-[${i * 100}ms]`
);
