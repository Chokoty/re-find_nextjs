'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';

const ImageSlider = dynamic(
  () => import('@/app/artwork/components/ImageSlider'),
  {
    ssr: false,
  }
);

export default function ImageSection({
  imgSrc,
  imgUrlList,
  title,
}: {
  title: string;
  imgSrc: string;
  imgUrlList: string[];
}) {
  const [imgUrl, setImageUrl] = useState(imgSrc);
  const handleClickOtherImage = (src: string) => {
    setImageUrl(src);
  };

  return (
    <div className="flex w-full flex-col items-center md:w-[508px]">
      <div className="size-full max-w-[350px] rounded-[20px] border-base border-blackAlpha-200 bg-[#f5f5f5] dark:border-none">
        <Image
          className="pointer-events-none max-h-[350px] rounded-[20px] bg-[#f5f5f5] object-cover"
          priority
          quality={100}
          width={360}
          height={360}
          src={imgUrl}
          alt={title}
          onContextMenu={(e: React.MouseEvent<HTMLImageElement>) => {
            e.preventDefault();
          }}
          unoptimized
        />
      </div>
      <div className="w-full max-w-[350px]">
        {imgUrlList.length > 0 && (
          <div className="mt-2 w-full">
            <ImageSlider
              urls={imgUrlList}
              handleClickImage={handleClickOtherImage}
              size="small"
            />
          </div>
        )}
      </div>
    </div>
  );
}
