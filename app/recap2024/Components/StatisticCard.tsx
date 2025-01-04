'use client';

import clsx from 'clsx';

interface StatisticCardProps {
  title: string;
  value: string;
  isWidthFixed?: boolean;
}

export default function StatisticCard({
  title,
  value,
  isWidthFixed = true,
}: StatisticCardProps) {
  return (
    <div
      className={clsx(
        'flex h-[200px] flex-1 flex-col items-center justify-center bg-whiteAlpha-300 px-6 py-8 transition-all  duration-300',
        {
          'w-[312px]': isWidthFixed, // 기본 너비
        }
      )}
    >
      <h2 className="font-sbAggro text-[80px] font-bold">{value}</h2>
      <p className="text-3xl">{title}</p>
    </div>
  );
}
