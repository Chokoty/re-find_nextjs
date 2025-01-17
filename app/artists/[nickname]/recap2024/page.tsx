// import MonthlyArtShowcase from '@/app/recap2024/components/MonthlyArtShowcase';

import TopContent from '@/app/recap2024/components/TopContent';
import { convertBestArticleToMonthlyArray } from '@/app/recap2024/lib/convertBestArticleToMonthlyArray';
import type { StatisticsData } from '@/app/recap2024/page';
import {
  getAuthorRecapResults,
  // getBestOfYearFanartInfo,
} from '@/app/recap2024/service/server';
import BackToArtistButton from '@/components/Recap/BackToArtistButton';
import BestOfTheYear from '@/components/Recap/BestOfTheYear';
import { CaptureButton } from '@/components/Recap/CaptureButton';
import { CopyRecapLinkButton } from '@/components/Recap/CopyRecapLinkButton';
import GrowthChart from '@/components/Recap/GrowthChart';
import MonthlyArtShowcase from '@/components/Recap/MonthlyArtShowcase';
import {
  getFormattedNumber,
  getUnit,
} from '@/hooks/useFormatNumberToCompactString';

type Params = {
  params: { nickname: string };
};

export default async function Recap2024({ params: { nickname } }: Params) {
  const { statistics, best_article, monthly_top_articles } =
    await getAuthorRecapResults(nickname);
  // const bestOfYearInfo = await getBestOfYearFanartInfo(nickname);

  // statistics가 없을 경우 메시지 표시
  if (!statistics) {
    return (
      <div className="flex size-full h-screen w-full flex-col items-center justify-start bg-recap-pattern p-8 py-16 text-whiteAlpha-900">
        <BackToArtistButton />

        <p className="my-10 text-2xl font-semibold text-white  2xs:text-4xl">
          {`${decodeURIComponent(nickname)} 작가님은 2024년에 팬아트를 올리지 않았습니다.`}
        </p>
      </div>
    );
  }

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
      unit: getUnit(statistics.comments),
    },
  ] as StatisticsData;
  const monthlyInfos = convertBestArticleToMonthlyArray(best_article);

  return (
    <div>
      <BackToArtistButton />
      <div
        id="recap2024"
        className="flex flex-col items-center justify-start bg-recap-pattern p-8 py-16 text-whiteAlpha-900"
      >
        <TopContent
          artist={decodeURIComponent(nickname)}
          total={statistics.total}
          statistics={data}
        />
        <BestOfTheYear
          artist={decodeURIComponent(nickname)}
          data={best_article.overall}
        />
        <GrowthChart
          growth={statistics.growth}
          data={{ value1: statistics.total, value2: statistics[2023] }}
        />
        <MonthlyArtShowcase
          artist={decodeURIComponent(nickname)}
          imageUrls={monthlyInfos}
          isMonth={monthly_top_articles}
        />
        <div className="my-9 flex items-center justify-center gap-4 md:my-12">
          <CaptureButton
            sectionId="recap2024"
            fileName={`${decodeURIComponent(nickname)}님의 2024 리캡`}
          />
          <CopyRecapLinkButton />
        </div>
        <p className="mt-2 text-start text-base text-whiteAlpha-600 lg:text-xl">
          ※ 현재 사진저장 기능이 사파리 등 일부 브라우저에서 작동하지 않습니다.
        </p>
        <p className="mb-20 mt-2 text-start text-base text-whiteAlpha-600 md:mb-0 lg:text-xl">
          ※ 모바일에서는 기본 스크롤 캡쳐를 이용해주세요!
        </p>
      </div>
    </div>
  );
}
