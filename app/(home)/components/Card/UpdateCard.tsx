import Image from 'next/image';
import Link from 'next/link';
import { FaRegClock } from 'react-icons/fa6';
import { LuExternalLink } from 'react-icons/lu';
import { MdArrowForwardIos, MdPerson } from 'react-icons/md';

import BOARD_LIST from '@/app/(home)/lib/const';
import { BOARD_MAP, UPDATED_GALLERY_LIST } from '@/app/gallery/lib/const';
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
  const article_link = `/artwork/${update.id}`;
  const menu_link = useResponsiveLink(
    BOARD_LIST.find(
      (item) => item.board === update.board.replace(/&#\d+;/g, '').trim()
    )?.id ?? '',
    'menu'
  );

  const matchingGallery = UPDATED_GALLERY_LIST.find(
    (gallery) => gallery.title === update.board.replace(/&#\d+;/g, '').trim()
  ) || { id: '' };

  const board_link = `/gallery/${
    matchingGallery.id === 'gomem'
      ? 'gomem'
      : matchingGallery.id === 'wakgood'
        ? 'woowakgood'
        : matchingGallery.id
  }?viewType=masonry&sortType=latest`;

  // const board_link = `/gallery/${BOARD_MAP[update.board]}?viewType=masonry&sortType=latest`;
  // const boardUrl = `/search?board=${BOARD_MAP[update.board]}&category=all&datetype=all&ranktype=latest&sensitive=false&title=false&content=false&author=false&viewType=gallery`;

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
    <div className="flex h-auto w-full flex-row items-center justify-between border-b border-gray-300 bg-white py-4 dark:border-whiteAlpha-300 dark:bg-dark-card  ">
      <Link href={article_link} className="mr-3">
        <div className="flex w-max items-center justify-center">
          <Image
            quality={90}
            width={100}
            height={100}
            src={getImageSrc()}
            alt={update.info.title}
            className="size-20 rounded-lg object-cover"
            unoptimized
          />
        </div>
      </Link>
      <div className="flex h-20 flex-1 flex-col items-start justify-between pt-2 2xs:flex-row ">
        <div className="flex flex-col items-start justify-between gap-1 text-green-highlight dark:text-pink-highlight 2xs:gap-2">
          <Link
            className="flex items-center"
            href={matchingGallery.id !== '' ? board_link : menu_link}
            {...(matchingGallery.id !== '' ? {} : { target: '_blank' })}
          >
            <p className="text-sm ">
              {update.board.replace(/&#\d+;/g, '').trim()}
            </p>
            <MdArrowForwardIos className="ml-2 hidden text-sm 2xs:block" />
          </Link>
          <Link className="flex items-center" href={article_link}>
            <p className="line-clamp-1 text-base font-semibold ">
              {update.info.title}
            </p>
            {/* {matchingGallery.value === '' ? (
              <LuExternalLink className="ml-2 hidden text-lg font-semibold 2xs:block" />
            ) : null} */}
          </Link>
        </div>
        <div className="flex flex-row items-end gap-2  2xs:flex-col">
          <Badge intent="danger" size="lg">
            <Link
              className="link-to-profile flex items-center"
              href={`/artists/${update.info.nickname}`}
            >
              <MdPerson className="mr-0.5 size-4 text-red-800 dark:text-red-200" />
              <p className="line-clamp-1 max-w-16 text-sm text-red-800 dark:text-red-200  ">
                {update.info.nickname}
              </p>
            </Link>
          </Badge>
          <Badge intent="secondary" size="lg">
            <div className="flex items-center">
              <FaRegClock className="mr-0.5 text-sm text-green-800 dark:text-green-200" />
              <p className="line-clamp-1 max-w-16 text-sm text-green-800 dark:text-green-200 ">
                {uploadTimeDiff}
              </p>
            </div>
          </Badge>
        </div>
      </div>
    </div>
  );
}
