'use client';

import 'swiper/css';

import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';

import MoreButton from '@/app/gallery/components/Button/MoreButton';
import GalleryAlbumCard from '@/app/gallery/components/Card/GalleryAlbumCard';
import GalleryBoardCard from '@/app/gallery/components/Card/GalleryBoardCard';
import GalleryFanartCard from '@/app/gallery/components/Card/GalleryFanartCard';
import { UPDATED_GALLERY_LIST } from '@/app/gallery/lib/const';
import { useGalleryList } from '@/app/gallery/service/client/useGalleryService';
import { test } from '@/constants/test';

interface CustomSwiperParams extends SwiperOptions {
  // 다른 타입을 추가하거나 필요에 따라 수정
  style: Record<string, string>;
}

type SliderType = 'fanart' | 'album' | 'board';
// type isFanartData = (data: FanartData | AlbumData) => data is FanartData;

type Props = {
  type: SliderType;
  customSwiperOptions?: CustomSwiperParams;
};

export default function GallerySlider({ customSwiperOptions, type }: Props) {
  const { style: customStyle, ...customOptions } = customSwiperOptions || {};
  const { data: gallery, isLoading, isError } = useGalleryList();
  const swiperParams = {
    // centerInsufficientSlides
    style: {
      width: '100%',
      padding: '0',
      ...(customStyle || {}),
    },
    allowTouchMove: true,
    className: 'mySwiper2 md:!px-8',
    slidesPerView: 1.5,
    spaceBetween: 8,
    breakpoints: {
      480: {
        slidesPerView: 2.5,
        spaceBetween: 8,
      },
      653: {
        slidesPerView: 3.5,
        spaceBetween: 8,
      },
      960: {
        slidesPerView: 4.5,
        spaceBetween: 20,
      },
    },
    ...customOptions,
  };

  const renderSlides = () => {
    switch (type) {
      case 'fanart':
        return (
          <>
            {test.map((data, index) => (
              <SwiperSlide key={data.id}>
                <GalleryFanartCard
                  key={index}
                  artwork={data}
                  num={index < 3 ? index + 1 : -1}
                />
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <MoreButton />
            </SwiperSlide>
          </>
        );
      case 'board':
        return (
          <>
            {UPDATED_GALLERY_LIST.map((data) => (
              <SwiperSlide
                key={data.id}
                className="max-w-[144px] overflow-hidden md:max-w-[204px]"
              >
                <GalleryBoardCard album={data} />
              </SwiperSlide>
            ))}
          </>
        );
      case 'album': {
        if (isError) {
          return <div>error</div>;
        }
        if (isLoading) {
          return null;
          // return <div>isLoading</div>
        }
        if (!gallery) {
          return null;
        }

        return gallery.albums.map((data) => (
          <SwiperSlide
            key={data.id}
            className="max-w-[144px] overflow-hidden md:max-w-[204px]"
          >
            <GalleryAlbumCard album={data} />
          </SwiperSlide>
        ));
      }
      default:
        return null;
    }
  };

  return (
    <div className="group relative">
      <Swiper {...swiperParams}>
        {renderSlides()}
        <SlideNavButtons />
      </Swiper>
    </div>
  );
}

const SlideNavButtons = () => {
  const swiper = useSwiper();

  const handlePrevClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation(); // 이벤트 전파 방지
    swiper.slidePrev();
  };

  const handleNextClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation(); // 이벤트 전파 방지
    swiper.slideNext();
  };

  const commonClassName =
    'absolute top-1/2 z-10 hidden  -translate-y-1/2 cursor-pointer border-none bg-blackAlpha-200 p-2.5 hover:text-white text-whiteAlpha-600 transition hover:bg-blackAlpha-600  dark:bg-dark-card-2  dark:hover:bg-dark-card-3 md:block rounded-full opacity-0 group-hover:opacity-100';

  return (
    <div className="size-full justify-between">
      <button
        className={`left-4 m-auto ${commonClassName}`}
        type="button"
        onClick={handlePrevClick}
      >
        <GrFormPrevious size="22px" className="" />
      </button>
      <button
        className={`right-4 ${commonClassName}`}
        onClick={handleNextClick}
      >
        <GrFormNext size="22px" className="" />
      </button>
    </div>
  );
};
