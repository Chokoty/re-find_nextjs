import dynamic from 'next/dynamic';

import GalleryAlbumSliderSkeleton from '@/app/gallery/components/Skeleton/GalleryAlbumSliderSkeleton';

const GallerySlider = dynamic(
  () => import('@/app/gallery/components/Slider/GallerySlider'),
  {
    ssr: false,
    loading: () => <GalleryAlbumSliderSkeleton />,
  }
);

export default function RefindPick() {
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
      <GallerySlider
        type="album"
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
