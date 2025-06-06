'use client';

import clsx from 'clsx';
import { FaCaretUp } from 'react-icons/fa';
import { useShallow } from 'zustand/react/shallow';

import { useArtistSearchInfoStore } from '@/app/artists/store/artistSearchInfoStore';
import Button from '@/components/Button';
import { SORT_TYPES } from '@/constants/artists';

// 총 조회, 총 댓글, 총 좋아요, 총 구독, 총 작품 순 정렬 버튼 그룹
export default function TotalSortButtonGroup() {
  const { totalCountCriteria, sortTotalCountCriteria } =
    useArtistSearchInfoStore(
      useShallow((state) => ({
        totalCountCriteria: state.totalCountCriteria,
        sortTotalCountCriteria: state.sortTotalCountCriteria,
      }))
    );

  return (
    <div className="flex w-full flex-col items-center rounded-2xl bg-light-button p-4 dark:border-whiteAlpha-300 dark:bg-dark-card-2 dark:shadow-[rgba(0,_0,_0,_0.1)_-3px_4px_14px_0px]">
      <ul className="flex list-none flex-wrap justify-center gap-4">
        {SORT_TYPES.map((sortType, index) => (
          <li key={index}>
            <Button
              onClick={() => sortTotalCountCriteria(sortType.value)}
              additionalClass={
                totalCountCriteria === sortType.value
                  ? 'bg-green-highlight hover:bg-green-highlight dark:bg-green-highlight dark:hover:bg-green-highlight dark:text-gray-900 text-gray-900'
                  : 'dark:bg-whiteAlpha-200 dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-400 bg-light-button hover:bg-light-card-3 active:bg-gray-300 dark:text-white text-gray-900 border border-blackAlpha-200 border-light-card-3 dark:border-none'
              }
            >
              <p>{sortType.name}</p>
              <FaCaretUp
                className={clsx('ml-1 size-4', {
                  'rotate-180': totalCountCriteria === sortType.value,
                })}
              />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
