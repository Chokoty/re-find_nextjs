'use client';

import Counter from '@/app/recap2024/components/Counter';
import StatisticCard from '@/app/recap2024/components/StatisticCard';
import Title from '@/app/recap2024/components/Title';
import type { StatisticsData } from '@/app/recap2024/page';

export default function TopContent({
  artist,
  total,
  statistics,
}: {
  artist?: string;
  total: number;
  statistics: StatisticsData;
}) {
  return (
    <div className="flex flex-col items-center justify-between ">
      <div className="flex w-full items-center justify-between gap-4">
        <Title artist={artist} />
        <Counter total={total} isAuthor={!!artist} />
      </div>
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2"> */}
      <div className="mb-4 mt-28 flex flex-wrap justify-center gap-4">
        {statistics.map((item, index) => (
          <StatisticCard key={index} item={item} />
        ))}
      </div>
      <div className="flex w-full items-center justify-center gap-16 text-green-highlight">
        <p className="w-2/5 text-center text-3xl font-semibold text-green-highlight ">
          10명 중 7명은 왁물원 접속
        </p>
        <p className="w-2/5 text-center text-3xl font-semibold">
          10명 중 3명은 리파인드 단골 (감사합니다!)
        </p>
      </div>
    </div>
  );
}
