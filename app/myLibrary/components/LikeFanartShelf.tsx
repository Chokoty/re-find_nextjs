import dynamic from 'next/dynamic';
import Link from 'next/link';

import GalleryAlbumSliderSkeleton from '@/app/gallery/components/Skeleton/GalleryAlbumSliderSkeleton';
import { useGalleryArtworks } from '@/app/album/service/client/useGalleryService';
import Button from '@/components/Button';
import { useUpdateLikedArticles } from '@/app/myLibrary/service/client/useMyService';

const GallerySlider = dynamic(
  () => import('@/app/gallery/components/Slider/GallerySlider'),
  {
    ssr: false,
    loading: () => <GalleryAlbumSliderSkeleton />,
  }
);
export default function LikeFanartShelf() {
  const {
    total,
    status,
    artworks,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
  } = useGalleryArtworks({ sortType: 'recent', galleryType: 'likedFanarts' });

  const { refetch: refetchLikedArticles } = useUpdateLikedArticles();
  const handleUpdateClick = async () => {
    // Refetch liked articles first
    await refetchLikedArticles();
    // After refetching liked articles, refetch artworks
    refetch();
  };
  return (
    <div className="mb-10 flex w-full flex-col p-2 md:px-6">
      <div className="mb-12 flex w-full content-end justify-between gap-4 md:mb-4">
        <Link
          href="/myLibrary/likeFanart"
          className="flex items-center hover:underline"
        >
          <p className="text-left text-xl font-extrabold md:text-2xl">
            좋아요한 팬아트
          </p>
        </Link>
        <Link
          href="/myLibrary/likeFanart"
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
      <Button onClick={handleUpdateClick}>좋아요한 게시글 업데이트</Button>
    </div>
  );
}
