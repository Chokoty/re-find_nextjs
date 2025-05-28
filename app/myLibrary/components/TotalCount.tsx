'use client';

import CountUp from 'react-countup';

interface TotalCountProps {
  total: number;
}

const TotalCount = ({ total }: TotalCountProps) => {
  return (
    <p className="flex items-center">
      <span>총</span>
      <CountUp end={total} className="pl-1 pr-0.5 text-green-highlight" />명
    </p>
  );
};

export default TotalCount;
