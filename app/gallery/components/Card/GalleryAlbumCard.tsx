import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { LuExternalLink } from 'react-icons/lu';

import { getStaticImage } from '@/app/gallery/lib/getStaticImage';
import Popover, {
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@/components/Popover';

type Prop = {
  album: AlbumInfo;
};

const getBadgeText = ({
  badgeValue,
  badgeType,
}: {
  badgeValue: string;
  badgeType: string;
}) => {
  if (badgeType === 'special') {
    if (badgeValue === 'isdPick') {
      return '이세돌픽';
    }
    return '특집 팬아트';
  }
  return '추천 키워드';
};

export default function GalleryAlbumCard({
  album: { title, id, description, author, cover_image },
}: Prop) {
  return (
    <Link
      href={`/album/${id}?viewType=masonry`}
      prefetch={false}
      className="m-auto flex h-[220px] max-w-[144px] flex-col items-center justify-start gap-2 rounded-md p-3 transition hover:bg-gray-200 active:bg-whiteAlpha-400 dark:hover:bg-whiteAlpha-300 dark:active:bg-black-200 md:h-[280px] md:w-full md:max-w-[204px]"
    >
      <div className="relative flex size-[120px] min-h-[120px] w-full max-w-[120px] md:size-[180px] md:min-h-[180px] md:max-w-[180px]">
        <Image
          className="rounded-lg object-cover"
          src={cover_image}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start gap-1 pr-0 min-[840px]:pr-2 min-[1055px]:pr-5 min-[1400px]:pr-[25px] min-[1600px]:pr-[30px]">
          <p className="line-clamp-1 text-base font-bold dark:text-white">
            {title}
          </p>
          <p className="line-clamp-2 text-sm font-normal text-blackAlpha-700 dark:text-whiteAlpha-600 min-[1055px]:text-sm">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
