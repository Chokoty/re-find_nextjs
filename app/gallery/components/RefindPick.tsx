import dynamic from 'next/dynamic';

import GalleryAlbumSliderSkeleton from '@/app/gallery/components/Skeleton/GalleryAlbumSliderSkeleton';
import { useGalleryList } from '@/app/gallery/service/client/useGalleryService';

const GallerySlider = dynamic(
  () => import('@/app/gallery/components/Slider/GallerySlider'),
  {
    ssr: false,
    loading: () => <GalleryAlbumSliderSkeleton />,
  }
);

export default function RefindPick() {
  const { data: gallery, isLoading, isError } = useGalleryList();
  return (
    <div className="flex w-full flex-col">
      <div className="mb-2 w-full px-8 md:mb-4">
        <p className="text-left text-xl font-extrabold md:text-2xl">
          리파인드 추천 앨범
        </p>
      </div>
      {isError && <div>에러가 발생했습니다.</div>}
      {isLoading && <div>로딩 중...</div>}
      {gallery && (
        <GallerySlider
          data={{
            type: 'album',
            list: gallery.albums,
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
