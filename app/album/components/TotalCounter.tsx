import CountUp from 'react-countup';

import { useFanartTotalCountStore } from '@/app/gallery/store/fanartTotalCountStore';

export default function TotalCounter() {
  const { total } = useFanartTotalCountStore((state) => ({
    total: state.total,
  }));
  return (
    <p>
      총{' '}
      {total ? (
        <CountUp end={total} className="font-semibold text-green-highlight" />
      ) : (
        ''
      )}
      <span className="hidden sm:inline-block">개의 팬아트가 있습니다.</span>
      <span className="sm:hidden">개</span>
    </p>
  );
}
