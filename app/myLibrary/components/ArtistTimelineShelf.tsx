import dynamic from 'next/dynamic';
import Link from 'next/link';

import GalleryAlbumSliderSkeleton from '@/app/album/components/Skeleton/GalleryAlbumSliderSkeleton';
import { useGalleryArtworks } from '@/app/album/service/client/useGalleryService';

const GallerySlider = dynamic(
  () => import('@/app/album/components/Slider/GallerySlider'),
  {
    ssr: false,
    loading: () => <GalleryAlbumSliderSkeleton />,
  }
);
export default function ArtistTimelineShelf() {
  const {
    total,
    status,
    artworks,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
  } = useGalleryArtworks({ sortType: 'recent', galleryType: 'artistTimeline' });
  console.log('artistTimeline', artworks);
  return (
    <div className="mb-10 flex w-full flex-col p-2 md:px-6">
      <div className="mb-12 flex w-full content-end justify-between gap-4 md:mb-4">
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
        <GallerySlider
          data={{
            type: 'liked',
            list: artworks,
          }}
          customSwiperOptions={{
            style: {
              // padding: '0 2rem',
            },
            spaceBetween: 8,
            breakpoints: {
              480: {
                slidesPerView: 2.5,
                spaceBetween: 10,
              },
              1055: {
                slidesPerView: 3.5,
                spaceBetween: 16,
              },
              // 1024: {
              //   slidesPerView: 3.5,
              // },
            },
          }}
        />
      )}
    </div>
  );
}
