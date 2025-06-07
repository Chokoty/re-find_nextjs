'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import EmblaCarouselSkeletonLoading from '@/app/album/components/Skeleton/EmblaCarouselSkeletonLoading';
import { useGalleryArtworks } from '@/app/album/service/client/useGalleryService';

const EmblaCarousel = dynamic(
  () => import('@/app/album/components/Slider/EmblaCarousel'),
  {
    ssr: false,
    loading: () => <EmblaCarouselSkeletonLoading type="liked" />,
  }
);

export default function ArtistTimelineShelf() {
  const { artworks } = useGalleryArtworks({
    sortType: 'recent',
    galleryType: 'artistTimeline',
  });
  return (
    <div className="mt-7 flex w-full flex-col md:mt-10">
      <div className="mb-2 flex w-full content-end justify-between gap-4 px-2 md:mb-4 md:px-8">
        <Link
          href="/myLibrary/artistTimeline"
          className="flex items-center hover:underline"
        >
          <p className="text-left text-xl font-extrabold md:text-2xl">
            구독중인 작가 팬아트 타임라인
          </p>
        </Link>
        {artworks && artworks.length > 1 && (
          <Link
            href="/myLibrary/artistTimeline"
            className="flex items-center text-blackAlpha-700 hover:underline dark:text-whiteAlpha-700"
          >
            <p className="text-blackAlpha-700 dark:text-whiteAlpha-700">
              모두보기
            </p>
          </Link>
        )}
      </div>
      {artworks &&
        (artworks.length > 1 ? (
          <EmblaCarousel
            data={{
              type: 'liked',
              list: artworks,
            }}
          />
        ) : (
          <p className="my-6 w-full px-2 text-center text-sm text-gray-500 dark:text-gray-400">
            아직 구독 중인 작가가 없어요. 마음에 드는 작가를 구독하면 최신
            팬아트를 이곳에서 볼 수 있어요!
          </p>
        ))}
    </div>
  );
}
