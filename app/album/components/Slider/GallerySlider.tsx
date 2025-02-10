'use client';

import 'swiper/css';

import { useRouter } from 'next/navigation';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';

import MoreButton from '@/app/album/components/Button/MoreButton';
import GalleryAlbumCard from '@/app/album/components/Card/GalleryAlbumCard';
import GalleryBoardCard from '@/app/album/components/Card/GalleryBoardCard';
import GalleryCustomCard from '@/app/album/components/Card/GalleryCustomCard';
import GalleryFanartCard from '@/app/album/components/Card/GalleryFanartCard';
import GalleryLikedAlbumCard from '@/app/album/components/Card/GalleryLikedAlbumCard';
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
              <SwiperSlide
                key={d.id}
                className="max-w-[144px] overflow-hidden md:max-w-[204px]"
              >
                <GalleryBoardCard album={d} />
              </SwiperSlide>
            ))}
          </>
        );
      case 'album': {
        return data.list.map((d) => (
          <SwiperSlide
            key={d.id}
            className="max-w-[144px] overflow-hidden md:max-w-[204px]"
          >
            <GalleryAlbumCard album={d} />
          </SwiperSlide>
        ));
      }
      case 'liked': {
        return data.list.map((d) => (
          <SwiperSlide
            key={d.id}
            className="max-w-[144px] overflow-hidden md:max-w-[204px]"
          >
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
              <SwiperSlide
                key={d.name}
                className="max-w-[144px] overflow-hidden md:max-w-[204px]"
              >
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
