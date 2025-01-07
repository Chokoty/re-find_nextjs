'use client';

import clsx from 'clsx';

import type { StatisticItem } from '@/app/recap2024/page';

interface StatisticCardProps {
  item: StatisticItem;
  isWidthFixed?: boolean;
}

export default function StatisticCard({
  item: { title, value, unit },
  isWidthFixed = true,
}: StatisticCardProps) {
  return (
    <div
      className={clsx(
        'flex h-[120px] min-w-[170px] flex-1 flex-col items-center justify-center bg-whiteAlpha-300 p-4 transition-all  duration-300 lg:h-[200px]',
        {
          'w-[312px]': isWidthFixed, // 기본 너비
        }
      )}
    >
      <p
        // // className={`font-sbAggro font-bold ${value.toString().length > 3 ? 'text-6xl' : 'text-7xl'}`}
        className={` mt-4 font-sbAggro text-4xl font-bold lg:mt-7 lg:text-7xl`}
      >
        {value}
        <span className="font-sbAggro">{unit}</span>
      </p>
      <p className="mt-2 text-lg lg:mt-8 lg:text-3xl">{title}</p>
    </div>
  );
}
