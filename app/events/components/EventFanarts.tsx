'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { FaDice } from 'react-icons/fa';

import Fanart from '@/app/events/components/Fanart';
import { useUrlInfo } from '@/app/events/service/client/useEventService';
import Button from '@/components/Button';
import {
  RANDOM_FANARTS,
  type RandomFanartType,
} from '@/constants/randomFanarts';

export default function EventFanarts() {
  const [selectedEvent, setSelectedEvent] = useState<RandomFanartType | null>(
    null
  );
  const { data, isLoading, isFetching, refetch, status } = useUrlInfo(
    selectedEvent?.url ?? ''
  );

  const handleEventClick = (key: string) => {
    const eventObj = RANDOM_FANARTS.find((event) => event.key === key);
    if (!eventObj) return;
    setSelectedEvent(eventObj);
  };

  const showRandomFanart = async () => {
    // disabled에서 막혀야하지만 이렇게도 막을 수 있음
    if (isFetching || !selectedEvent) return;
    await refetch();
  };

  return (
    <div className="mt-4 flex w-full max-w-[540px] flex-col items-center justify-start rounded-2xl bg-white px-6 pb-4 pt-6 shadow-cardBox dark:bg-dark-card">
      <div className="flex w-full flex-row items-center justify-between">
        <p className="text-lg font-bold">특집 팬아트 가챠</p>
        <p className="text-lg font-bold">총 {RANDOM_FANARTS.length} 개</p>
      </div>
      <div className="mt-5 flex w-full flex-col items-center justify-center rounded-2xl border border-green-highlight px-2 pb-2 dark:border-pink-highlight">
        {RANDOM_FANARTS.map((item, index) => (
          <button
            key={index}
            onClick={() => handleEventClick(item.key)}
            className={clsx(
              'mt-2 inline-flex h-12 min-h-12 w-full select-none items-center justify-center whitespace-nowrap rounded-xl pe-4 ps-4 align-middle text-base font-bold leading-tight outline-none outline-offset-2 transition',
              {
                'bg-red-300 dark:bg-red-500':
                  selectedEvent?.key === item.key && item.color === 'red',
                'bg-purple-300 dark:bg-purple-500':
                  selectedEvent?.key === item.key && item.color === 'purple',
                'bg-green-300 dark:bg-green-500':
                  selectedEvent?.key === item.key && item.color === 'green',
                'bg-pink-300 dark:bg-pink-500':
                  selectedEvent?.key === item.key && item.color === 'pink',
                'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-whiteAlpha-200 dark:text-white dark:hover:bg-whiteAlpha-300':
                  selectedEvent?.key !== item.key,
              }
            )}
          >
            {item.title}
          </button>
        ))}
      </div>
      <Fanart
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={status === 'error'}
        loadingContent={<p>먼저 위 버튼을 눌러 특집을 선택해주세요.</p>}
      />
      <Button
        additionalClass="rounded-full pe-8 ps-8"
        onClick={showRandomFanart}
        disabled={isFetching || !selectedEvent} // 여러 번 클릭시 중복 요청 방지
      >
        <FaDice className="mr-2 size-5" />
        특집 랜덤가챠 굴리기
      </Button>
    </div>
  );
}
