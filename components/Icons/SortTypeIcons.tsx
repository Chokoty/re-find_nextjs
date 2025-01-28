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
import { formatNumberToEnglishUnit } from '@/hooks/useFormatNumberToCompactString';
import type { SortTotalCriteria } from '@/types';

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
  artist: AuthorCommon;
  totalCountCriteria?: SortTotalCriteria;
};

// 작가가 보유하고 있는 총 조회, 총 댓글, 총 좋아요, 총 구독 수를 보여주는 컴포넌트
export default function SortTypeIcons({ artist, totalCountCriteria }: Props) {
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
                  totalCountCriteria !== sortType.value
                    ? 'text-gray-700 dark:text-whiteAlpha-700'
                    : 'text-green-highlight'
                )}
              >
                <IconComponent sortTypeName={sortType.name} />
                <p className="text-xs">
                  {formatNumberToEnglishUnit(artist[sortType.value])}
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
                  totalCountCriteria !== sortType.value
                    ? 'text-gray-700 dark:text-whiteAlpha-700'
                    : 'text-green-highlight'
                )}
              >
                <IconComponent sortTypeName={sortType.name} />
                <p className="text-xs">
                  {formatNumberToEnglishUnit(artist[sortType.value])}
                </p>
              </div>
            )
        )}
      </div>
    </div>
  );
}
