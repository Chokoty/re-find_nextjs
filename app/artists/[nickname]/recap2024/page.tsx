import html2canvas from 'html2canvas';
import { MdOutlineSaveAlt } from 'react-icons/md';

import BestOfTheYear from '@/app/recap2024/components/BestOfTheYear';
import GrowthChart from '@/app/recap2024/components/GrowthChart';
import MonthlyArtShowcase from '@/app/recap2024/components/MonthlyArtShowcase';
import TopContent from '@/app/recap2024/components/TopContent';
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
    <div className="m-auto flex   flex-col items-center   justify-start bg-recap-pattern p-8">
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
    </div>
  );
}
