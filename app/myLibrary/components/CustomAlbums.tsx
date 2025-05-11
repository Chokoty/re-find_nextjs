import dynamic from 'next/dynamic';
import Link from 'next/link';

import GalleryAlbumSliderSkeleton from '@/app/album/components/Skeleton/GalleryAlbumSliderSkeleton';
import { useMyInfo } from '@/service/client/useCommonService';

const GallerySlider = dynamic(
  () => import('@/app/album/components/Slider/GallerySlider'),
  {
    ssr: false,
    loading: () => <GalleryAlbumSliderSkeleton />,
  }
);

export default function CustomAlbums() {
  const { data: user } = useMyInfo();
  return (
    <div className="mb-10 flex w-full flex-col p-2 md:px-6">
      <div className="mb-12 flex w-full content-end justify-between gap-4 md:mb-4">
        <Link
          href="/myLibrary/customAlbums"
          className="flex items-center hover:underline"
        >
          <p className="text-left text-xl font-extrabold md:text-2xl">
            나만의 팬아트 앨범
          </p>
        </Link>
        <Link
          href="/myLibrary/customAlbums"
          className="flex items-center text-blackAlpha-700 hover:underline dark:text-whiteAlpha-700"
        >
          <p className="text-blackAlpha-700 dark:text-whiteAlpha-700">
            모두보기
          </p>
        </Link>
      </div>
      {user && (
        <GallerySlider
          data={{
            type: 'custom',
            list: user.albums,
          }}
          customSwiperOptions={{
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
