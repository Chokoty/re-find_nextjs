import dynamic from 'next/dynamic';

import GalleryAlbumSliderSkeleton from '@/app/gallery/components/Skeleton/GalleryAlbumSliderSkeleton';
import { UPDATED_GALLERY_LIST } from '@/app/gallery/lib/const';

const GallerySlider = dynamic(
  () => import('@/app/gallery/components/Slider/GallerySlider'),
  {
    ssr: false,
    loading: () => <GalleryAlbumSliderSkeleton />,
  }
);

export default function BoardList() {
  return (
    <div className="mt-20 flex w-full flex-col">
      <div className="mb-2 w-full px-8 md:mb-4">
        <p className="text-left text-xl font-extrabold md:text-2xl">
          게시판 업데이트 현황
        </p>
      </div>
      <GallerySlider
        data={{
          type: 'board',
          list: UPDATED_GALLERY_LIST,
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
    </div>
  );
}
