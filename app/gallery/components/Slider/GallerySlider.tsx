'use client';

import 'swiper/css';

import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';

import MoreButton from '@/app/gallery/components/Button/MoreButton';
import GalleryAlbumCard from '@/app/gallery/components/Card/GalleryAlbumCard';
import GalleryFanartCard from '@/app/gallery/components/Card/GalleryFanartCard';
import GALLERY_LIST from '@/app/gallery/lib/const';
import { test } from '@/constants/test';

interface CustomSwiperParams extends SwiperOptions {
  // 다른 타입을 추가하거나 필요에 따라 수정
  style: Record<string, string>;
}

type SliderType = 'fanart' | 'album';
// type isFanartData = (data: FanartData | AlbumData) => data is FanartData;

type Props = {
  type: SliderType;
  customSwiperOptions?: CustomSwiperParams;
};

export default function GallerySlider({ customSwiperOptions, type }: Props) {
  const { style: customStyle, ...customOptions } = customSwiperOptions || {};

  const swiperParams = {
    // centerInsufficientSlides
    style: {
      width: '100%',
      padding: '0 2rem',
      ...(customStyle || {}),
    },
    allowTouchMove: true,
    className: 'mySwiper2',
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
  return (
    <Swiper {...swiperParams}>
      {type === 'fanart' ? (
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
      ) : (
        GALLERY_LIST.map((data) => (
          <SwiperSlide key={data.id} className="overflow-hidden">
            <GalleryAlbumCard album={data} />
          </SwiperSlide>
        ))
      )}
      <SlideNavButtons />
    </Swiper>
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
    'absolute top-1/2 z-10 hidden h-full -translate-y-1/2 cursor-pointer border-none bg-blackAlpha-200 p-2.5 text-white transition hover:bg-blackAlpha-300 active:bg-blackAlpha-400 dark:bg-blackAlpha-300 dark:hover:bg-blackAlpha-400 dark:active:bg-blackAlpha-500 md:block';

  return (
    <div>
      <button
        className={`left-0 ${commonClassName}`}
        type="button"
        onClick={handlePrevClick}
      >
        <GrFormPrevious size="22px" className="mb-8" />
      </button>
      <button
        className={`right-0 ${commonClassName}`}
        onClick={handleNextClick}
      >
        <GrFormNext size="22px" className="mb-8" />
      </button>
    </div>
  );
};
