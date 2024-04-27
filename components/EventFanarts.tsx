import Link from 'next/link';
import { useState } from 'react';

import RandomFanartButton from '@/components/Button/RandomFanartButton';
import { RANDOM_FANARTS } from '@/constants/randomFanarts';
import { cn } from '@/lib/common';

type Props = {
  type?: 'all' | 'more';
};

const commonButtonClassName =
  'mt-2 inline-flex h-12 min-h-12 w-full select-none items-center justify-center whitespace-nowrap rounded-xl bg-gray-100 pe-4 ps-4 align-middle text-base font-bold leading-tight text-gray-800 outline-none outline-offset-2 transition hover:bg-gray-200 dark:bg-whiteAlpha-200 dark:text-white dark:hover:bg-whiteAlpha-300';

export default function EventFanarts({ type = 'all' }: Props) {
  const [selectedEventKey, setSelectedEventKey] = useState('');

  const handleEventClick = (key: string) => {
    setSelectedEventKey(key);
  };

  const randomFanartArr =
    type === 'more' ? RANDOM_FANARTS.slice(0, 2) : RANDOM_FANARTS;

  // console.log(selectedEventKey, randomFanartArr);
  return (
    <div className="mt-4 flex w-full max-w-[540px] flex-col items-center justify-start rounded-2xl bg-white px-6 pb-4 pt-6 shadow-cardBox dark:bg-dark-card">
      <div className="flex w-full flex-row items-center justify-between">
        <p className="text-lg font-bold">특집 팬아트 가챠</p>
        <p className="text-lg font-bold">총 {RANDOM_FANARTS.length} 개</p>
      </div>
      <div className="mt-5 flex w-full flex-col items-center justify-center rounded-2xl border border-green-highlight px-2 pb-2 dark:border-pink-highlight">
        {randomFanartArr.map((item, index) => (
          <button
            key={index}
            onClick={() => handleEventClick(item.key)}
            className={cn(
              commonButtonClassName,
              selectedEventKey === item.key && item.backgroundColor
            )}
          >
            {item.title}
          </button>
        ))}
        {type === 'more' && (
          <Link href="/events" className="w-full">
            <div className={commonButtonClassName}>랜덤가챠 더보기</div>
          </Link>
        )}
      </div>

      <RandomFanartButton selectedEventKey={selectedEventKey} />
    </div>
  );
}
