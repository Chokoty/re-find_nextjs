import CountUp from 'react-countup';

import { useFanartTotalCountStore } from '@/app/album/store/fanartTotalCountStore';

export default function TotalCounter() {
  const { total } = useFanartTotalCountStore((state) => ({
    total: state.total,
  }));

  if (!total) return;

  return (
    <p>
      총 <CountUp end={total} className="font-semibold text-green-highlight" />
      <span className="hidden sm:inline-block">개의 팬아트가 있습니다.</span>
      <span className="sm:hidden">개</span>
    </p>
  );
}
