import BackToArtistButton from '@/components/Recap/BackToArtistButton';
import BestOfTheYear from '@/components/Recap/BestOfTheYear';
import { CaptureButton } from '@/components/Recap/CaptureButton';
import GrowthChart from '@/components/Recap/GrowthChart';
import MonthlyArtShowcase from '@/components/Recap/MonthlyArtShowcase';
import TopContent from '@/components/Recap/TopContent';
import { convertBestArticleToMonthlyArray } from '@/app/recap2024/lib/convertBestArticleToMonthlyArray';
import type { StatisticsData } from '@/app/recap2024/page';
import {
  getAuthorRecapResults,
  getBestOfYearFanartInfo,
} from '@/app/recap2024/service/server';
import {
  getFormattedNumber,
  getUnit,
} from '@/hooks/useFormatNumberToCompactString';

type Params = {
  params: { nickname: string };
};

export default async function Recap2024({ params: { nickname } }: Params) {
  const { statistics, best_article } = await getAuthorRecapResults(nickname);
  const bestOfYearInfo = await getBestOfYearFanartInfo(nickname);
  /**
     "statistics": {
      "total": 148,
      "2023": 324,
      "best": 30,
      "art_total": 319,
      "best_art_total": 40,
      "views": 1063349,
      "likes": 147195,
      "comments": 26339,
      "growth": -54.3
    },
     */

  const data = [
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
    <div>
      <BackToArtistButton />
      <div
        id="recap2024"
        className="flex flex-col items-center justify-start bg-recap-pattern p-8  pb-16  text-whiteAlpha-900"
      >
        <TopContent
          artist={decodeURIComponent(nickname)}
          total={statistics.total}
          statistics={data}
        />
        <BestOfTheYear
          artist={decodeURIComponent(nickname)}
          data={bestOfYearInfo}
        />
        <GrowthChart
          growth={statistics.growth}
          data={{ value1: statistics.total, value2: statistics[2023] }}
        />
        <MonthlyArtShowcase imageUrls={monthlyInfos} />
        <CaptureButton
          sectionId="recap2024"
          fileName={`${decodeURIComponent(nickname)}님의 2024 리캡`}
        />
      </div>
    </div>
  );
}
