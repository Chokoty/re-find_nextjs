import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaThumbsUp } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import { FiClock } from 'react-icons/fi';
import { MdPerson } from 'react-icons/md';

import RankingBadge from '@/app/gallery/components/Badge/RankingBadge';
import { formatArtistValue } from '@/hooks/useFormatArtistValue';
import { useResponsiveLink } from '@/hooks/useResponsiveLink';

type Props = {
  artwork: ArtworkList | GalleryArtworkList;
  num: number;
};

export default function GalleryFanartCard({ artwork, num }: Props) {
  const article_link = useResponsiveLink('', 'article');
  const authorName = 'author' in artwork ? artwork.author : '';

  return (
    <div className="w-full">
      <div className="group relative inline-block w-full">
        <div className="relative h-[200px] w-full 2xs:h-[230px] md:h-[280px] 2md:h-[350px] xl:h-[400px] 2xl:h-[530px]">
          <Image
            src={artwork.img_url}
            alt={artwork.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-[16px] object-cover"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 z-[1] hidden rounded-[16px] bg-blackAlpha-500 group-hover:block" />
        <div className="absolute inset-0 z-[2] hidden size-full flex-col rounded-[16px] border-base border-whiteAlpha-700 bg-blackAlpha-600 text-white group-hover:flex md:py-2">
          <p className="flex h-4/5 flex-1 flex-col items-center justify-center gap-1.5 border-b-base border-whiteAlpha-700 py-4 min-[875px]:flex-auto min-[875px]:justify-end min-[875px]:px-4">
            <p className="w-full truncate text-center text-base font-semibold 2xs:text-lg min-[875px]:text-left">
              {artwork.board.replace(/&#\d+;/g, '').trim()}
            </p>
            <div className="flex w-full flex-col items-center justify-start gap-0.5 text-whiteAlpha-700 md:gap-2 min-[875px]:items-start xl:flex-row xl:items-center xl:justify-start">
              <div className="flex max-w-full items-center justify-center gap-1.5 truncate">
                <FiClock className="size-4" />
                <p className="text-center text-sm font-normal">
                  {artwork?.date?.split(' ')[0].slice(2, -1)}
                </p>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <FaEye className="size-4" />
                <p className="text-center text-sm font-normal">
                  {formatArtistValue(artwork.view)}
                </p>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <FaThumbsUp className="size-4" />
                <p className="text-center text-sm font-normal">
                  {formatArtistValue(artwork.like)}
                </p>
              </div>
            </div>
          </p>
          <div className="flex h-14 w-full shrink-0 grow-0 items-center justify-center gap-2 p-2 md:px-4 md:pb-0">
            <Link
              className="w-full flex-1"
              href={`/artists/${authorName}`}
              prefetch={false}
            >
              <div
                className="flex h-10 w-full items-center justify-center gap-1 rounded-full bg-white text-gray-900 transition hover:bg-gray-900 hover:text-white xl:h-11"
                // rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
              >
                <MdPerson className="hidden xl:block" />
                작가
              </div>
            </Link>
            <Link
              className="link-to-wakzoo w-full flex-[2]"
              href={article_link + artwork.id}
              target="_blank"
            >
              <div
                className="flex h-10 w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-tl from-pink-500 to-pink-300 text-white transition hover:bg-pink-highlight hover:text-blackAlpha-700 active:bg-pink-500 xl:h-11"
                // rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
              >
                왁물원<span className="hidden xl:contents">에서 보기</span>
                <FaArrowRightLong className="hidden xl:block" />
              </div>
            </Link>
          </div>
        </div>
        {num !== -1 && <RankingBadge num={num} />}
      </div>
      <div className="mt-2 flex h-auto flex-col items-start justify-center">
        <p className="line-clamp-1 w-full text-left font-medium">
          {artwork?.title}
        </p>
        <Link href={`/artists/${authorName}`}>
          <p className="cursor-pointer text-left text-sm font-medium text-blackAlpha-700 hover:text-green-highlight dark:text-whiteAlpha-700 dark:hover:text-pink-highlight">
            작가: {authorName}
          </p>
        </Link>
      </div>
    </div>
  );
}
