import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaThumbsUp } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import { FiClock } from 'react-icons/fi';

import { formatArtistValue } from '@/hooks/useFormatArtistValue';
import { useModifiedImageUrl } from '@/hooks/useModifiedImageUrl';
import { useResponsiveLink } from '@/hooks/useResponsiveLink';

type Props = {
  data: ArtworkList | GalleryArtworkList;
};

export default function CardImage({ data }: Props) {
  const { img_url, img_url_list, title, board, view, like, date, deleted, id } =
    data;
  const modifiedUrl300 = useModifiedImageUrl({
    url: img_url_list[0],
    size: 300,
  });
  const article_link = useResponsiveLink('', 'article');

  return (
    <div className="group relative w-full rounded-[20px] border-base border-blackAlpha-200 dark:border-none">
      <Image
        width={236}
        height={236}
        src={
          img_url === '' ? 'http://via.placeholder.com/236x236' : modifiedUrl300
        }
        alt={title}
        className={clsx(
          'max-h-[430px] rounded-[20px] bg-[#f5f5f5] object-cover ',
          {
            'blur-[6px]': deleted,
          }
        )}
        unoptimized
      />
      <div className="absolute inset-0 z-[1] hidden rounded-[20px] bg-blackAlpha-500 group-hover:block" />
      <div className="absolute inset-0 z-[2] hidden size-full flex-col rounded-[20px] border-base border-whiteAlpha-700 bg-blackAlpha-600 text-white group-hover:flex">
        <div className="flex h-4/5 w-full flex-col items-center justify-end gap-2 overflow-hidden text-ellipsis border-b-base border-whiteAlpha-700 px-4 pb-2 text-whiteAlpha-700">
          <p className="line-clamp-1 text-left text-lg font-semibold text-whiteAlpha-900">
            {board.replace(/&#\d+;/g, '').trim()}
          </p>
          <div className="flex w-full flex-row items-center justify-start gap-2 text-whiteAlpha-700">
            <div className="flex max-w-full items-center justify-center gap-1 truncate">
              <FiClock size="14px" />
              <p className="text-center text-base font-normal">
                {date?.split(' ')[0].slice(2, -1)}
              </p>
            </div>
            <div className="flex items-center justify-center gap-1">
              <FaEye size="14px" />
              <p className="text-center text-base font-normal">
                {formatArtistValue(view)}
              </p>
            </div>
            <div className="flex items-center justify-center gap-1">
              <FaThumbsUp size="14px" />
              <p className="text-center text-base font-normal">
                {formatArtistValue(like)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex h-[50px] w-full flex-1 items-center justify-between gap-2 p-2 md:px-4">
          <Link className="w-full" href={`/artwork/${id}`}>
            <div
              // className={styles.textBox}
              className="flex h-[34px] w-full items-center justify-center rounded-xl bg-gradient-to-tl from-pink-500 to-pink-300 px-2.5 py-2 text-xs font-semibold text-white transition hover:from-pink-400 hover:to-pink-200"
              // rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
            >
              자세히
              <FaArrowRightLong className="ml-1 hidden 2xs:block" />
            </div>
          </Link>
          <Link className="w-full" href={article_link + id} target="_blank">
            <div
              // className={styles.textBox}
              className="flex h-[34px] w-full items-center justify-center rounded-xl bg-gradient-to-tl from-green-500 to-green-300 px-2.5 py-2 text-xs font-semibold text-white transition hover:from-green-400 hover:to-green-200"
              // rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
            >
              왁물원
              <FaArrowRightLong className="ml-1 hidden 2xs:block" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
