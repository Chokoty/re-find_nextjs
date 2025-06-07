'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';

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

  const { refetch: refetchLikedArticles, isRefetching } =
    useUpdateLikedArticles();
  const handleUpdateClick = async () => {
    await refetchLikedArticles();
    refetch();
  };

  return (
    <div className="mt-7 flex w-full flex-col md:mt-10">
      <div className="mb-2 flex w-full content-end justify-between gap-4 px-2 md:mb-4 md:px-8">
        <Link
          href="/myLibrary/likedFanarts"
          className="flex items-center hover:underline"
        >
          <p className="text-left text-xl font-extrabold md:text-2xl">
            좋아요한 팬아트
          </p>
        </Link>
        <div className="flex items-center gap-4">
          {isRefetching ? (
            <div className="flex w-[55px] items-center justify-center">
              <ClipLoader
                size={20} // 사이즈 조절
                color="#3B82F6" // tailwind blue-500
                speedMultiplier={0.75} // 회전 속도 조절
              />
            </div>
          ) : (
            <button
              className="flex items-center text-blackAlpha-700 hover:underline dark:text-whiteAlpha-700"
              onClick={handleUpdateClick}
            >
              <p className="text-blackAlpha-700 dark:text-whiteAlpha-700">
                업데이트
              </p>
            </button>
          )}
          {artworks && artworks.length > 1 && (
            <Link
              href="/myLibrary/likedFanarts"
              className="flex items-center text-blackAlpha-700 hover:underline dark:text-whiteAlpha-700"
            >
              <p className="text-blackAlpha-700 dark:text-whiteAlpha-700">
                모두보기
              </p>
            </Link>
          )}
        </div>
      </div>
      {artworks &&
        (artworks.length > 1 ? (
          <EmblaCarousel
            data={{
              type: 'liked',
              list: Object.values(
                // FIX: 업데이트 쪽 게시글 겹치는 현상으로 인한 임시방편
                artworks.reduce(
                  (acc: Record<number, AlbumArtworkList>, artwork) => {
                    acc[artwork.id] = artwork; // 같은 id가 있으면 덮어쓰기
                    return acc;
                  },
                  {}
                )
              ),
            }}
          />
        ) : (
          <p className="my-6 w-full px-2 text-center text-sm text-gray-500 dark:text-gray-400">
            왁물원에서 마음에 드는 팬아트에 좋아요를 누른 뒤, 위의{' '}
            <strong>업데이트 버튼</strong>을 눌러 리스트를 불러와보세요
          </p>
        ))}
    </div>
  );
}
