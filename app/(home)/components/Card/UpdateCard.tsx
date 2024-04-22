import Image from 'next/image';
import Link from 'next/link';
import { FaRegClock } from 'react-icons/fa6';
import { LuExternalLink } from 'react-icons/lu';
import { MdArrowForwardIos, MdPerson } from 'react-icons/md';

import BOARD_LIST from '@/app/(home)/lib/const';
import Badge from '@/components/Badge';
import { useModifiedImageUrl } from '@/hooks/useModifiedImageUrl';
import { useResponsiveLink } from '@/hooks/useResponsiveLink';
import { useUploadTimeDiff } from '@/hooks/useUploadTimeDiff';

type Prop = {
  update: RecentBoardData;
};

export default function UpdateCard({ update }: Prop) {
  const modifiedUrl100 = useModifiedImageUrl({
    url: update.info.img_url,
    size: 100,
  });
  const uploadTimeDiff = useUploadTimeDiff(update.date);
  const article_link = useResponsiveLink(update.id, 'article');
  const menu_link = useResponsiveLink(
    BOARD_LIST.find(
      (item) => item.board === update.board.replace(/&#\d+;/g, '').trim()
    )?.id ?? '',
    'menu'
  );

  function getImageSrc() {
    const boardItem = BOARD_LIST.find((item) => item.board === update.board);
    if (boardItem?.state === '-관-') {
      return '/static/images/icons/close.jpeg';
    }
    if (modifiedUrl100 === '') {
      return '/static/images/icons/placeholder_80.png';
    }
    return modifiedUrl100;
  }

  return (
    <div className="flex h-auto w-full flex-row items-center justify-between border-b border-gray-300 bg-white py-4 dark:border-gray-700 dark:bg-dark-card md:h-[144px] ">
      <Link href={article_link} target="_blank" className="mr-3">
        <div className="flex w-max items-center justify-center">
          <Image
            quality={90}
            width={100}
            height={100}
            src={getImageSrc()}
            alt={update.info.title}
            className="size-20 rounded-lg object-cover md:size-24"
            unoptimized
          />
        </div>
      </Link>
      <div className="flex h-20 flex-1 flex-col items-start justify-between 2sm:flex-row md:h-24">
        <div className="flex flex-col items-start justify-between gap-1 text-light-main dark:text-dark-main 2sm:gap-2">
          <Link className="flex items-center" href={menu_link} target="_blank">
            <p className="text-sm 2sm:text-base md:text-lg">
              {update.board.replace(/&#\d+;/g, '').trim()}
            </p>
            <MdArrowForwardIos className="ml-2 hidden text-sm 2sm:block" />
          </Link>
          <Link
            className="flex items-center"
            href={article_link}
            target="_blank"
          >
            <p className="line-clamp-1 text-base font-semibold 2sm:text-lg md:text-xl">
              {update.info.title}
            </p>
            <LuExternalLink className="ml-2 hidden text-lg font-semibold 2sm:block" />
          </Link>
        </div>
        <div className="flex flex-row items-end gap-2 2sm:flex-col">
          <Badge intent="danger" size="lg">
            <Link
              className="flex items-center"
              href={`/artists/${update.info.nickname}`}
            >
              <MdPerson className="mr-0.5 size-4 text-red-800 dark:text-red-200" />
              <p className="line-clamp-1 max-w-16 text-sm text-red-800 dark:text-red-200 2sm:max-w-20 2sm:text-base sm:max-w-32 md:text-lg">
                {update.info.nickname}
              </p>
              <LuExternalLink className="ml-0.5 text-sm text-red-800 dark:text-red-200" />
            </Link>
          </Badge>
          <Badge intent="secondary" size="lg">
            <div className="flex items-center">
              <FaRegClock className="mr-0.5 text-sm text-green-800 dark:text-green-200" />
              <p className="line-clamp-1 max-w-16 text-sm text-green-800 dark:text-green-200 2sm:max-w-20 2sm:text-base sm:max-w-32 md:text-lg">
                {uploadTimeDiff}
              </p>
            </div>
          </Badge>
        </div>
      </div>
    </div>
  );
}
