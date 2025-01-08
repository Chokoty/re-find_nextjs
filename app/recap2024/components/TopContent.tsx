'use client';

import type { StatisticsData } from '@/app/recap2024/page';
import Counter from '@/components/Recap/Counter';
import StatisticCard from '@/components/Recap/StatisticCard';
import Title from '@/components/Recap/Title';

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
    <div className="m-auto flex w-full max-w-screen-xl flex-col items-center justify-between lg:w-[90%]">
      <div className="mt-8 flex w-full flex-col items-start justify-between gap-16 lg:gap-4 xl:flex-row xl:items-center">
        <Title artist={artist} />
        <Counter total={total} isAuthor={!!artist} />
      </div>
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2"> */}
      <div className="mb-4 mt-14 flex flex-wrap justify-center gap-4 lg:mt-28">
        {statistics.map((item, index) => (
          <StatisticCard key={index} item={item} />
        ))}
      </div>
      {!artist && (
        <div className="flex w-full flex-col items-center justify-center gap-4 text-2xl text-green-highlight lg:flex-row lg:gap-16 lg:text-3xl ">
          <p className="w-full text-center  font-semibold text-green-highlight lg:w-2/5 ">
            10명 중 7명은 왁물원 접속
          </p>
          <p className="w-full text-center  font-semibold lg:w-2/5">
            10명 중 3명은 리파인드 단골
          </p>
        </div>
      )}
    </div>
  );
}
