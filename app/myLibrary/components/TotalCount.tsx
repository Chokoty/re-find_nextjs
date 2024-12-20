'use client';

import CountUp from 'react-countup';

interface TotalCountProps {
  total: number;
}

const TotalCount = ({ total }: TotalCountProps) => {
  return (
    <p className="flex items-center">
      총&nbsp;
      <CountUp end={total} className="text-green-highlight" />명
    </p>
  );
};

export default TotalCount;
