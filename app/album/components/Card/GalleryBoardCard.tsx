import Link from 'next/link';

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
  // const boardUrl = query || '';
  // const boardUrl = `/search?board=${value}&category=all&datetype=all&ranktype=latest&sensitive=false&title=false&content=false&author=false&viewType=gallery`;

  const transformedValue = id === 'wakgood' ? 'woowakgood' : id;
  const bgColor =
    PASTEL_COLORS[id as keyof typeof PASTEL_COLORS] || 'bg-teal-200';
  return (
    <Link
      href={`/album/${transformedValue}?viewType=masonry&sortType=latest`}
      prefetch={false}
      className="m-auto flex h-[205px] w-full flex-col items-center justify-start gap-2 rounded-md p-3 transition hover:bg-light-button-hover active:bg-whiteAlpha-400 dark:hover:bg-whiteAlpha-300 dark:active:bg-black-200 md:h-[240px]"
    >
      <div
        className={`relative flex size-[120px] w-full rounded-lg md:size-[156px] ${bgColor}`}
      >
        <div className="absolute right-2 top-2 flex items-center justify-center rounded-2xl bg-blackAlpha-500 px-2.5 py-1.5 md:px-3 md:py-2">
          <p className="text-xs font-normal text-white md:text-sm">게시판</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start gap-1 pr-0 md:pr-3">
          <p className="line-clamp-2 text-base font-bold dark:text-white">
            {title}
          </p>
          <p className="line-clamp-2 text-sm font-normal text-blackAlpha-700 dark:text-whiteAlpha-600">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
