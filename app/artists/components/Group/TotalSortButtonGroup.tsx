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
    <div className="flex w-full flex-col items-center rounded-2xl bg-white p-4 shadow-cardBox dark:bg-dark-card">
      <ul className="flex list-none flex-wrap justify-center gap-4">
        {SORT_TYPES.map((sortType, index) => (
          <li key={index}>
            <Button
              onClick={() => sortTotalCountCriteria(sortType.value)}
              additionalClass={
                totalCountCriteria === sortType.value
                  ? 'bg-green-highlight hover:bg-green-highlight dark:bg-green-highlight dark:hover:bg-green-highlight dark:text-gray-900 text-gray-900'
                  : 'dark:bg-whiteAlpha-200 dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-400 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 dark:text-white text-gray-900'
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
