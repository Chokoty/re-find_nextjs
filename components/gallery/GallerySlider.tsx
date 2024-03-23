'use client';

import 'swiper/css';

import React, { useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';

import styles from '@/styles/GallerySlider.module.scss';

import GalleryAlbumCard from '../card/GalleryAlbumCard';
import GalleryFanartCard from '../card/GalleryFanartCard';

type List = {
  id: number;
  url: string;
  img_url: string;
  img_url_list: string[];
  board: string;
  category: string;
  title: string;
  author: string;
  date: string;
  view: number;
  like: number;
  comment: number;
  is_shukkou: boolean;
  deleted: boolean;
  is_hyum: boolean;
}[];

interface CustomSwiperParams extends SwiperOptions {
  // 다른 타입을 추가하거나 필요에 따라 수정
  style: Record<string, string>;
}

type SliderType = 'fanart' | 'album';

type Props = {
  dataList: List;
  customSwiperOptions?: CustomSwiperParams;
  type?: SliderType;
};

export default function GallerySlider({
  dataList,
  customSwiperOptions,
  type = 'fanart',
}: Props) {
  const [focusedArtworkId, setFocusedArtworkId] = useState<number | null>(null);

  const handleToggleFocus = (id: number | null) => {
    if (id === focusedArtworkId) {
      setFocusedArtworkId(null); // Deselect the artwork if it's already focused
    } else {
      setFocusedArtworkId(id); // Set the focused artwork ID
    }
  };
  const { style: customStyle, ...customOptions } = customSwiperOptions || {};

  const swiperParams = {
    // centerInsufficientSlides
    style: {
      width: '100%',
      padding: '0 1rem',
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
      {dataList.map((data, index) => (
        <SwiperSlide key={data.id}>
          {type === 'fanart' ? (
            <GalleryFanartCard
              key={index}
              artwork={data}
              isFocused={data.id === focusedArtworkId}
              onToggleFocus={handleToggleFocus}
              num={index < 3 ? index + 1 : -1}
            />
          ) : (
            <GalleryAlbumCard artwork={data} />
          )}
        </SwiperSlide>
      ))}
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

  return (
    <div className={styles.swiper_nav_btns}>
      <button
        className={styles.swiper_prev_btn}
        type="button"
        onClick={handlePrevClick}
      >
        <GrFormPrevious size="22px" />
      </button>
      <button
        className={styles.swiper_next_btn}
        type="button"
        onClick={handleNextClick}
      >
        <GrFormNext size="22px" />
      </button>
    </div>
  );
};
