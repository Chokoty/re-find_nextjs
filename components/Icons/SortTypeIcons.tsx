'use client';

import clsx from 'clsx';
import {
  FaBookmark,
  FaComment,
  FaEye,
  FaImage,
  FaThumbsUp,
} from 'react-icons/fa';

import { SORT_TYPES } from '@/constants/artists';
import { formatArtistValue } from '@/hooks/useFormatArtistValue';
import type { SortCriteria } from '@/types';

const iconClassName = 'w-4 h-4';

const IconComponent = ({ sortTypeName }: { sortTypeName: string }) => {
  switch (sortTypeName) {
    case '총 작품':
      return <FaImage className={iconClassName} />;
    case '총 조회':
      return <FaEye className={iconClassName} />;
    case '총 댓글':
      return <FaComment className={iconClassName} />;
    case '총 좋아요':
      return <FaThumbsUp className={iconClassName} />;
    case '총 구독':
      return <FaBookmark className={iconClassName} />;
    default:
      return null;
  }
};

type Props = {
  sortCriteria: SortCriteria | null;
  artist: AuthorCommon;
  component?: string;
};

export default function SortTypeIcons({ sortCriteria, artist }: Props) {
  if (!artist) {
    // artist가 null인 경우 예외 처리
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-2 2xs:flex-row">
      <div className="mr-2 flex flex-row gap-4">
        {SORT_TYPES.slice(0, 3).map(
          (sortType, index2) =>
            artist[sortType.value] !== 0 && (
              <div
                key={index2}
                className={clsx(
                  'flex flex-row gap-2',
                  !sortCriteria || sortCriteria?.field !== sortType.value
                    ? 'text-gray-800 dark:text-gray-300'
                    : 'text-pink-500'
                )}
              >
                <IconComponent sortTypeName={sortType.name} />
                <p className="text-xs">
                  {formatArtistValue(artist[sortType.value])}
                </p>
              </div>
            )
        )}
      </div>
      <div className="flex items-center justify-center gap-2">
        {SORT_TYPES.slice(3, 5).map(
          (sortType, index2) =>
            artist[sortType.value] !== 0 && (
              <div
                key={index2}
                className={clsx(
                  'flex flex-row gap-2',
                  sortCriteria?.field === sortType.value
                    ? 'text-pink-500'
                    : 'text-gray-800 dark:text-gray-300'
                )}
              >
                <IconComponent sortTypeName={sortType.name} />
                <p className="text-xs">
                  {formatArtistValue(artist[sortType.value])}
                </p>
              </div>
            )
        )}
      </div>
    </div>
  );
}
