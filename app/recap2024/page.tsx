import BottomContent from '@/app/recap2024/components/BottomContent';
import TopContent from '@/app/recap2024/components/TopContent';
import { convertBestArticleToMonthlyArray } from '@/app/recap2024/lib/convertBestArticleToMonthlyArray';
import { getReFindRecapResults } from '@/app/recap2024/service/server';
import { CopyRecapLinkButton } from '@/components/Recap/CopyRecapLinkButton';
import MonthlyArtShowcase from '@/components/Recap/MonthlyArtShowcase';
import {
  getFormattedNumber,
  getUnit,
} from '@/hooks/useFormatNumberToCompactString';

// 개별 통계 항목에 대한 타입
export type StatisticItem = {
  title: string;
  value: number;
  unit: string;
};

// 전체 통계 배열에 대한 타입
export type StatisticsData = StatisticItem[];

export default async function RefindRecap() {
  const { statistics, best_article } = await getReFindRecapResults();

  const refindData = [
    {
      title: '전체 페이지뷰',
      value: getFormattedNumber(330000),
      unit: getUnit(330000),
    },
    {
      title: '왁물원 유입 수',
      value: getFormattedNumber(218000),
      unit: getUnit(218000),
    },
    {
      title: '리파인드 방문 수',
      value: getFormattedNumber(33000),
      unit: getUnit(33000),
    },
    {
      title: '재방문 수',
      value: getFormattedNumber(8400),
      unit: getUnit(8400),
    },
  ] as StatisticsData;

  const data = [
    {
      title: '전체 팬아트 작가 수',
      value: getFormattedNumber(21669),
      unit: getUnit(21669),
    },
    {
      title: '왁물원 총 팬아트 수',
      value: getFormattedNumber(statistics.total),
      unit: getUnit(statistics.total),
    },
    {
      title: '총 조회 수',
      value: getFormattedNumber(statistics.views),
      unit: getUnit(statistics.views),
    },
    {
      title: '총 좋아요 수',
      value: getFormattedNumber(statistics.likes),
      unit: getUnit(statistics.likes),
    },
    {
      title: '총 댓글 수',
      value: getFormattedNumber(statistics.comments),
      unit: getUnit(statistics.likes),
    },
  ] as StatisticsData;

  const monthlyInfos = convertBestArticleToMonthlyArray(best_article);

  return (
    <div className="flex w-full max-w-[1440px] flex-col gap-4 p-4 text-whiteAlpha-900 xl:p-8">
      <TopContent total={53000} statistics={refindData} />
      <MonthlyArtShowcase imageUrls={monthlyInfos} />
      <BottomContent statistics={data} />
      <div className="my-9 flex items-center justify-center gap-4 md:my-12">
        <CopyRecapLinkButton />
      </div>
    </div>
  );
}
