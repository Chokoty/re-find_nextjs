'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import EmblaCarouselSkeletonLoading from '@/app/album/components/Skeleton/EmblaCarouselSkeletonLoading';
import { useGalleryArtworks } from '@/app/album/service/client/useGalleryService';
import { useUpdateLikedArticles } from '@/app/myLibrary/service/client/useMyService';

const EmblaCarousel = dynamic(
  () => import('@/app/album/components/Slider/EmblaCarousel'),
  {
    ssr: false,
    loading: () => <EmblaCarouselSkeletonLoading type="liked" />,
  }
);

export default function LikeFanartShelf() {
  const { artworks, refetch } = useGalleryArtworks({
    sortType: 'recent',
    galleryType: 'likedFanarts',
  });

  const { refetch: refetchLikedArticles } = useUpdateLikedArticles();
  const handleUpdateClick = async () => {
    await refetchLikedArticles();
    refetch();
  };
  return (
    <div className="mt-7 flex w-full flex-col md:mt-10">
      <div className="mb-2 flex w-full content-end justify-between gap-4 pl-2 pr-1 md:mb-4 md:pl-8 md:pr-2">
        <Link
          href="/myLibrary/likedFanarts"
          className="flex items-center hover:underline"
        >
          <p className="text-left text-xl font-extrabold md:text-2xl">
            좋아요한 팬아트
          </p>
        </Link>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center text-blackAlpha-700 hover:underline dark:text-whiteAlpha-700"
            onClick={handleUpdateClick}
          >
            <p className="text-blackAlpha-700 dark:text-whiteAlpha-700">
              업데이트
            </p>
          </button>
          <Link
            href="/myLibrary/likedFanarts"
            className="flex items-center text-blackAlpha-700 hover:underline dark:text-whiteAlpha-700"
          >
            <p className="text-blackAlpha-700 dark:text-whiteAlpha-700">
              모두보기
            </p>
          </Link>
        </div>
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
