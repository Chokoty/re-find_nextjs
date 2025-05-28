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
      <div className="mb-2 flex w-full content-end justify-between gap-4 pl-2 pr-1 md:mb-4 md:pl-8 md:pr-2">
        <Link
          href="/myLibrary/artistTimeline"
          className="flex items-center hover:underline"
        >
          <p className="text-left text-xl font-extrabold md:text-2xl">
            구독중인 작가 팬아트 타임라인
          </p>
        </Link>
        <Link
          href="/myLibrary/artistTimeline"
          className="flex items-center text-blackAlpha-700 hover:underline dark:text-whiteAlpha-700"
        >
          <p className="text-blackAlpha-700 dark:text-whiteAlpha-700">
            모두보기
          </p>
        </Link>
      </div>
      {artworks && (
        <EmblaCarousel
          data={{
            type: 'liked',
            list: artworks,
          }}
        />
      )}
    </div>
  );
}
