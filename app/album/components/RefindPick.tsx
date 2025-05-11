'use client';

import dynamic from 'next/dynamic';

import GalleryAlbumSliderSkeleton from '@/app/album/components/Skeleton/GalleryAlbumSliderSkeleton';
import { useGalleryList } from '@/app/album/service/client/useGalleryService';

const GallerySlider = dynamic(
  () => import('@/app/album/components/Slider/GallerySlider'),
  {
    ssr: false,
    loading: () => <GalleryAlbumSliderSkeleton />,
  }
);

export default function RefindPick() {
  const { data: gallery, isLoading, isError } = useGalleryList();
  return (
    <div
      className="mb:mt-10 mt-4 flex w-full flex-col"
      style={{ userSelect: 'none' }}
    >
      <div className="mb-2 w-full md:mb-4 md:px-8">
        <p className="pl-2 text-left text-xl font-extrabold md:p-0 md:text-2xl">
          리파인드 추천 앨범
        </p>
      </div>
      {isError && <div className="pl-2 md:pl-8">에러가 발생했습니다.</div>}
      {/* {isLoading && <div className="pl-2 md:pl-8">로딩 중...</div>} */}
      {isLoading && <GalleryAlbumSliderSkeleton />}
      {gallery && (
        <GallerySlider
          data={{
            type: 'album',
            list: gallery.albums,
          }}
          customSwiperOptions={{
            spaceBetween: 8,
            // breakpoints: {
            //   768: {
            //     slidesPerView: 2.5,
            //     spaceBetween: 2,
            //   },
            //   1200: {
            //     slidesPerView: 3.5,
            //   },
            //   1400: {
            //     slidesPerView: 4.5,
            //   },
            //   1600: {
            //     slidesPerView: 5.5,
            //   },
            //   1800: {
            //     slidesPerView: 6.5,
            //   },
            // },
          }}
        />
      )}
    </div>
  );
}
