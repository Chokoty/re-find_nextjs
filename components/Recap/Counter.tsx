'use client';

import CountUp from 'react-countup';

import {
  getFormattedNumber,
  getUnit,
} from '@/hooks/useFormatNumberToCompactString';

export default function Counter({
  total,
  isAuthor,
}: {
  total: number;
  isAuthor: boolean;
}) {
  const num = getFormattedNumber(total);
  const decimals = Number.isInteger(num) ? 0 : 1;
  return (
    <div className="m-auto flex flex-col justify-end">
      <div className="flex items-center justify-center text-center font-sbAggro text-[60px] font-bold leading-tight lg:text-[140px]">
        <CountUp end={num} duration={2} decimals={decimals} />
        <span>{getUnit(total)}</span>
      </div>
      <p className="text-center text-2xl font-semibold lg:text-4xl">
        {isAuthor ? '업로드한 팬아트 수' : '개의 원본을 찾았습니다.'}
      </p>
    </div>
  );
}
