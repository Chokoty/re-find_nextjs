'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback } from 'react';

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
  const [emblaRef] = useEmblaCarousel({
    slidesToScroll: 'auto',
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const handleClick = useCallback(
    (url: string) => () => {
      handleClickImage(url);
    },
    [handleClickImage]
  );

  return (
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex gap-2">
        {urls.map((url, idx) => (
          <div
            key={url}
            className="embla__slide min-w-[calc(33.333%_-_16px)] flex-[0_0_auto]"
          >
            <button
              className="rounded-[16px] border-base border-blackAlpha-200 dark:border-none"
              onClick={handleClick(url)}
            >
              <Image
                className={`rounded-[16px] bg-[#f5f5f5] object-cover ${
                  size === 'small'
                    ? 'size-[100px]'
                    : size === 'base'
                      ? 'size-[130px]'
                      : 'size-[150px]'
                }`}
                onContextMenu={(e: React.MouseEvent<HTMLImageElement>) => {
                  e.preventDefault();
                }}
                priority
                width={sizeMap[size].w}
                height={sizeMap[size].h}
                src={url}
                alt={`${idx + 1}번째 이미지`}
                unoptimized
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
