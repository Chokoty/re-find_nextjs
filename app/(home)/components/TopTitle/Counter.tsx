import CountUp from 'react-countup';

import { useCounts } from '@/app/(home)/service/client/useHomeService';
import Badge from '@/components/Badge';
import Tooltip from '@/components/Tooltip';

export default function Counter() {
  const { data: counts, isLoading } = useCounts();
  const content = () => {
    if (isLoading) {
      return (
        <div role="status" className="w-[230px] animate-pulse md:w-[280px]">
          <div className="h-5 w-full rounded-full bg-gray-125 dark:bg-gray-700" />
        </div>
      );
    }
    if (!counts) {
      return (
        <p className="text-xs 2sm:text-sm md:text-base lg:text-lg">
          현재 서버와의 연결이 불안정합니다.
        </p>
      );
    }
    const { total_counter, today_counter } = counts;
    return (
      <div className="flex flex-row items-center justify-center gap-1">
        <p className="text-xs 2sm:text-sm md:text-base lg:text-lg">
          <CountUp end={parseInt(total_counter)} duration={2} />
        </p>
        <Tooltip
          hasArrow
          label="오늘 발견한 이미지 출처 수"
          bg="gray-150"
          color="black"
        >
          <Badge>
            +
            <CountUp end={parseInt(today_counter)} duration={5} />
          </Badge>
        </Tooltip>
        <p className="text-xs 2sm:text-sm md:text-base lg:text-lg">
          개의 출처를 찾았습니다.
        </p>
      </div>
    );
  };
  return (
    <div className="mb-2 flex h-10 max-w-[360px] items-center justify-center rounded-3xl border-2 border-gray-150 px-3.5 py-1.5">
      {content()}
    </div>
  );
}
