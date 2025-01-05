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
    <div className="flex h-[300px] flex-col justify-end">
      <div className="flex items-center justify-center text-center font-sbAggro text-[40px] font-bold leading-tight 2xs:text-[50px] md:text-[80px] lg:text-[140px]">
        <CountUp end={num} duration={2} decimals={decimals} />
        <span>{getUnit(total)}</span>
      </div>
      <p className="text-center text-5xl font-semibold">
        {isAuthor ? '업로드한 팬아트' : '개의 원본을 찾았습니다.'}
      </p>
    </div>
  );
}
