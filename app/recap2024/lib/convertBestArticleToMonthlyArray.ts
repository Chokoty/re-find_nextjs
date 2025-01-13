import type { BestArticle } from '@/types';

export type MonthlyResult = {
  month: number;
  id: number;
  img_url: string;
  // view: number;
  // likes: number;
  // comments: number;
};

export function convertBestArticleToMonthlyArray(
  data: BestArticle
): MonthlyResult[] {
  return Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const result = data[month.toString() as keyof BestArticle];

    return {
      month,
      id: result?.id || 0, // result가 없을 경우 기본값 설정
      img_url: result?.img_url || '', // result가 없을 경우 기본값 설정
    };
  });
}
