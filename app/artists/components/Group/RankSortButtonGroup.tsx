'use client';

import CountUp from 'react-countup';
import { useShallow } from 'zustand/react/shallow';

import { useArtistSearchInfoStore } from '@/app/artists/store/artistSearchInfoStore';
import type { CustomVariantProps } from '@/components/Button';
import Button from '@/components/Button';
import { VIEW_TYPES } from '@/constants/artists';

// 베스트, 금손작가, 우왁굳, 고멤/교멤, 이세돌 순 정렬 버튼 그룹
export default function RankSortButtonGroup() {
  const { total, rankCriteria, sortRankCriteria } = useArtistSearchInfoStore(
    useShallow((state) => ({
      total: state.total,
      rankCriteria: state.rankCriteria,
      sortRankCriteria: state.sortRankCriteria,
    }))
  );

  return (
    <div className=" flex w-full flex-col items-center rounded-2xl bg-white  p-4 shadow-cardBox dark:bg-dark-card-2">
      <p className="mb-4">
        총&nbsp;
        {total ? (
          <CountUp end={total ?? 0} className="text-green-highlight" />
        ) : (
          ''
        )}
        명의 작가님들이 있어요.
      </p>
      <ul className="flex list-none flex-wrap justify-center gap-4">
        {VIEW_TYPES.map((viewType, index) => (
          <li key={index}>
            <Button
              onClick={() => sortRankCriteria(viewType.value)}
              intent={
                (rankCriteria === viewType.value
                  ? `solid-${viewType.colorScheme}`
                  : 'solid-gray') as CustomVariantProps['intent']
              }
              additionalClass={
                rankCriteria !== viewType.value
                  ? 'dark:bg-whiteAlpha-200 dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-400 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 dark:text-white text-gray-900'
                  : ''
              }
            >
              {viewType.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
