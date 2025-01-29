'use client';

import type { StatisticsData } from '@/app/recap2024/page';
import StatisticCard from '@/components/Recap/StatisticCard';

export default function BottomContent({
  statistics,
}: {
  statistics: StatisticsData;
}) {
  return (
    <div className="mx-auto mb-4 mt-28 flex flex-col justify-center gap-4 lg:w-4/5">
      <div className="flex w-full flex-wrap items-center justify-between gap-4">
        {statistics.slice(0, 3).map((item, index) => (
          <StatisticCard key={index} item={item} isWidthFixed={false} />
        ))}
      </div>
      <div className="flex w-full items-center justify-between gap-4">
        {statistics.slice(3, 5).map((item, index) => (
          <StatisticCard key={index} item={item} isWidthFixed={false} />
        ))}
      </div>
    </div>
  );
}
