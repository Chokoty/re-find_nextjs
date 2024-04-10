import 'swiper/css';

import { useColorMode } from '@chakra-ui/react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  urls: string[];
  w?: number;
  h?: number;
  handleClickImage: (imgUrl: string) => void;
}

export default function ImageSlider({
  urls,
  w = 130,
  h = 130,
  handleClickImage,
}: Props) {
  const { colorMode } = useColorMode();
  return (
    <Swiper slidesPerView={3.5} spaceBetween={8} centerInsufficientSlides>
      {urls.map((url, idx) => (
        <SwiperSlide key={url}>
          <button onClick={() => handleClickImage(url)}>
            <Image
              // fill
              priority
              width={w}
              height={h}
              src={url}
              alt={`${idx + 1}번째 이미지`}
              style={{
                width: `${w}px`,
                height: `${h}px`,
                borderRadius: '20px',
                objectFit: 'cover',
                background: '#f5f5f5',
                border:
                  colorMode === 'dark' ? 'none' : '1px solid rgba(0,0,0,.102)',
              }}
              unoptimized
            />
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
