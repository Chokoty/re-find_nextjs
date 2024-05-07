import 'swiper/css';

import clsx from 'clsx';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  urls: string[];
  size?: 'small' | 'base' | 'large';
  handleClickImage: (imgUrl: string) => void;
}

const sizeMap = {
  small: { w: 100, h: 100 },
  base: { w: 130, h: 130 },
  large: { w: 150, h: 150 },
};

export default function ImageSlider({
  urls,
  size = 'base',
  handleClickImage,
}: Props) {
  return (
    <Swiper slidesPerView={3.5} spaceBetween={8} centerInsufficientSlides>
      {urls.map((url, idx) => (
        <SwiperSlide key={url}>
          <button
            className="rounded-[20px] border-base border-blackAlpha-200 dark:border-none"
            onClick={() => handleClickImage(url)}
          >
            <Image
              // fill
              className={clsx('rounded-[20px] bg-[#f5f5f5] object-cover', {
                'size-[100px]': size === 'small',
                'size-[130px]': size === 'base',
                'size-[150px]': size === 'large',
              })}
              priority
              width={sizeMap[size].w}
              height={sizeMap[size].h}
              src={url}
              alt={`${idx + 1}번째 이미지`}
              unoptimized
            />
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
