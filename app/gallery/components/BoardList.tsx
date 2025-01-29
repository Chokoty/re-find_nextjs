import dynamic from 'next/dynamic';

import GalleryAlbumSliderSkeleton from '@/app/gallery/components/Skeleton/GalleryAlbumSliderSkeleton';

const GallerySlider = dynamic(
  () => import('@/app/gallery/components/Slider/GallerySlider'),
  {
    ssr: false,
    loading: () => <GalleryAlbumSliderSkeleton />,
  }
);

export default function BoardList() {
  return (
    <div className="mt-10 flex w-full flex-col" style={{ userSelect: 'none' }}>
      <div className="mb-2 w-full pl-2 md:mb-4 md:p-0 md:px-8">
        <p className="text-left text-xl font-extrabold md:text-2xl">
          왁물원 게시판 앨범
        </p>
      </div>
      <GallerySlider
        type="board"
        customSwiperOptions={{
          style: {
            // padding: '0 2rem',
          },
          spaceBetween: 8,
          breakpoints: {
            768: {
              slidesPerView: 2.5,
              spaceBetween: 2,
            },
            1200: {
              slidesPerView: 3.5,
            },
            1400: {
              slidesPerView: 4.5,
            },
            1600: {
              slidesPerView: 5.5,
            },
            1800: {
              slidesPerView: 6.5,
            },
          },
        }}
      />
    </div>
  );
}
