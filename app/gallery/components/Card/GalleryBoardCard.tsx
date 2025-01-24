import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';

import { getStaticImage } from '@/app/gallery/lib/getStaticImage';
import type { Gallery } from '@/types';

type Prop = {
  album: Gallery;
};

const PASTEL_COLORS = {
  best: 'bg-red-200',
  goldhand: 'bg-orange-200',
  isd: 'bg-yellow-200',
  gomem: 'bg-green-200',
  wakgood: 'bg-blue-200',
  wallpaper: 'bg-purple-200',
  isdPhoto: 'bg-pink-200',
};

export default function GalleryBoardCard({
  album: { title, id, description, type, author, query },
}: Prop) {
  const boardUrl = query || '';

  // const boardUrl = `/search?board=${value}&category=all&datetype=all&ranktype=latest&sensitive=false&title=false&content=false&author=false&viewType=gallery`;

  const transformedValue =
    id === 'gomem' ? 'gomem' : id === 'wakgood' ? 'woowakgood' : id;
  const bgColor =
    PASTEL_COLORS[id as keyof typeof PASTEL_COLORS] || 'bg-teal-200';
  return (
    <Link
      href={`/gallery/${transformedValue}?viewType=masonry&sortType=latest`}
      prefetch={false}
      className="m-auto flex h-[280px] w-full flex-col items-center justify-start  gap-2 rounded-md p-3 transition hover:bg-gray-200 active:bg-whiteAlpha-400 dark:hover:bg-whiteAlpha-300 dark:active:bg-black-200"
    >
      <div
        className={`relative flex size-[180px] min-h-[180px] w-full rounded-lg ${bgColor}`}
      />
      <div className="absolute right-6 top-6 flex items-center justify-center rounded-[16px] bg-blackAlpha-500 px-2.5 py-1.5 md:px-3 md:py-2 min-[840px]:px-3.5 min-[840px]:py-2.5">
        <p className="text-xs font-normal text-white md:text-sm">게시판</p>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start gap-1 pr-0 min-[840px]:pr-2 min-[1055px]:pr-5 min-[1400px]:pr-[25px] min-[1600px]:pr-[30px]">
          <p className="text-base font-bold text-white ">{title}</p>
          <p className="line-clamp-2 text-sm font-normal text-blackAlpha-600 dark:text-whiteAlpha-600 min-[1055px]:text-sm">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
