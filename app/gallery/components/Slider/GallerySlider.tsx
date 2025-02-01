'use client';

import 'swiper/css';

import { useRouter } from 'next/navigation';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';

import MoreButton from '@/app/gallery/components/Button/MoreButton';
import GalleryAlbumCard from '@/app/gallery/components/Card/GalleryAlbumCard';
import GalleryBoardCard from '@/app/gallery/components/Card/GalleryBoardCard';
import GalleryCustomCard from '@/app/gallery/components/Card/GalleryCustomCard';
import GalleryFanartCard from '@/app/gallery/components/Card/GalleryFanartCard';
import GalleryLikedAlbumCard from '@/app/gallery/components/Card/GalleryLikedAlbumCard';
import AddButton from '@/app/myLibrary/components/AddButton';
import { useCreateCustomAlbum } from '@/app/myLibrary/service/client/useMyService';

interface CustomSwiperParams extends SwiperOptions {
  // 다른 타입을 추가하거나 필요에 따라 수정
  style: Record<string, string>;
}

type SliderType = 'fanart' | 'album' | 'board' | 'liked' | 'custom';
// type isFanartData = (data: FanartData | AlbumData) => data is FanartData;

type Props = {
  data: {
    type: SliderType;
    list: any[];
  };
  customSwiperOptions?: CustomSwiperParams;
};

export default function GallerySlider({ customSwiperOptions, data }: Props) {
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

  const router = useRouter();
  const handleOnSuccess = (albumId: string) => {
    router.push(`/album/${albumId}`);
  };
  const { mutate: createCustomAlbum, status } = useCreateCustomAlbum(
    [],
    handleOnSuccess
  );
  const handleAddCustomAlbum = () => {
    createCustomAlbum();
  };

  const renderSlides = () => {
    switch (data.type) {
      case 'fanart':
        return (
          <>
            {data.list.map((item, index) => (
              <SwiperSlide key={item.id}>
                <GalleryFanartCard
                  key={index}
                  artwork={item}
                  num={index < 3 ? index + 1 : -1}
                />
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <MoreButton type="link" url="/album/weekRanking" />
            </SwiperSlide>
          </>
        );
      case 'board':
        return (
          <>
            {data.list.map((d) => (
              <SwiperSlide key={d.id} className="overflow-hidden">
                <GalleryBoardCard album={d} />
              </SwiperSlide>
            ))}
          </>
        );
      case 'album': {
        return data.list.map((d) => (
          <SwiperSlide key={d.id} className="overflow-hidden">
            <GalleryAlbumCard album={d} />
          </SwiperSlide>
        ));
      }
      case 'liked': {
        return data.list.map((d) => (
          <SwiperSlide key={d.id} className="overflow-hidden">
            <GalleryLikedAlbumCard album={d} />
          </SwiperSlide>
        ));
      }
      case 'custom': {
        return (
          <>
            <SwiperSlide>
              <AddButton handleClick={handleAddCustomAlbum} />
            </SwiperSlide>
            {data.list.map((d) => (
              <SwiperSlide key={d.name} className="overflow-hidden">
                <GalleryCustomCard info={d} />
              </SwiperSlide>
            ))}
          </>
        );
      }
      default:
        return null;
    }
  };

  return (
    <Swiper {...swiperParams}>
      {renderSlides()}
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
