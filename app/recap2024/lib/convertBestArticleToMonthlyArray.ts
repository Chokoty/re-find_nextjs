import type { BestArticle } from '@/types';

export type MonthlyResult = {
  month: number;
  result: number;
};

export function convertBestArticleToMonthlyArray(
  data: BestArticle
): MonthlyResult[] {
  return Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    return {
      month,
      result: data[month.toString() as keyof BestArticle],
    };
  });
}
