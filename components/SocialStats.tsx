import {
  FaBookmark,
  FaComment,
  FaEye,
  FaImage,
  FaThumbsUp,
} from 'react-icons/fa';

import { formatArtistValue } from '@/hooks/useFormatArtistValue';

const IconComponent = {
  article: <FaImage className="size-4" />,
  view: <FaEye className="size-4" />,
  comment: <FaComment className="size-4" />,
  like: <FaThumbsUp className="size-4" />,
  subscriber: <FaBookmark className="size-4" />,
};

type Props = {
  view?: number;
  like?: number;
  comment?: number;
  article?: number;
  subscriber?: number;
};

// TODO: 해당 컴포넌트 AuthorList > SortTypeIcons 에서 사용되는 것과 유사하다.따라서 해당 컴포넌트를 잘 작성하여 이를 적용한다.
export default function SocialStats(props: Props) {
  const stats = Object.entries(props).filter(([_, n]) => n !== undefined);

  return (
    <div className="mr-2 flex gap-4">
      {stats.map(([s, n]) => (
        <p
          key={s}
          // color={
          //   !sortCriteria || sortCriteria?.field !== sortType.value
          //     ? 'gray.500'
          //     : 'pink.500'
          // }
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-whiteAlpha-700"
        >
          {IconComponent[s as keyof typeof IconComponent]}
          <p className="text-sm">{formatArtistValue(n)}</p>
        </p>
      ))}
    </div>
  );
}
