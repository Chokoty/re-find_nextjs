'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import styles from '@/styles/GallerySlider.module.scss';
import { darkMode, lightMode } from '@/styles/theme';

import GalleryCard1 from '../card/GalleryCard1';

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
  comments: number;
  is_shukkou: boolean;
  deleted: boolean;
  is_hyum: boolean;
}[];

type Props = {
  dataList: List;
};

export default function GallerySlider({ dataList }: Props) {
  const [focusedArtworkId, setFocusedArtworkId] = useState<number | null>(null);

  const handleToggleFocus = (id: number | null) => {
    if (id === focusedArtworkId) {
      setFocusedArtworkId(null); // Deselect the artwork if it's already focused
    } else {
      setFocusedArtworkId(id); // Set the focused artwork ID
    }
  };

  const swiperParams = {
    style: {
      width: '100%',
      padding: '0 2rem',
    },
    allowTouchMove: true,
    className: 'mySwiper2',
    // direction: 'horizontal',
    // navigation={true}
    modules: [Navigation, Pagination, A11y],
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
  };
  return (
    <Swiper
      {...swiperParams}
      // centerInsufficientSlides
    >
      {dataList.map((data, index) => (
        <SwiperSlide key={data.id}>
          <GalleryCard1
            key={index}
            artwork={data}
            isFocused={data.id === focusedArtworkId}
            onToggleFocus={handleToggleFocus}
            num={index < 3 ? index + 1 : -1}
          />
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
