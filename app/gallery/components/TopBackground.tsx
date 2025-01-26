'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';

import { Isd } from '@/lib/images';

interface TopBackgroundProps {
  children: ReactNode;
  coverImageUrl?: string;
}

const TopBackground = ({ children, coverImageUrl }: TopBackgroundProps) => {
  return (
    <section className="relative top-[3px] flex size-full max-h-[600px] flex-col items-center justify-center 2xs:top-[-80px] md:max-h-[800px]">
      <div className="relative z-[1]  aspect-[474/600] w-full  sm:aspect-[1920/1080]">
        {/* aspect-[474/600]  2xs:aspect-[1920/1080] */}
        <Image
          className="size-full object-cover object-top opacity-70 dark:opacity-80"
          src={coverImageUrl ?? Isd}
          alt="백그라운드 커버 이미지"
          quality={100}
          width={1920}
          height={1080}
          unoptimized
          priority
        />
        <div
          // shadow를 아래로 내려줘야 그림자가 뜨는 현상이 없어진다.
          // #121212 > light-mode | #f8f9fa > dark-mode
          className="pointer-events-none absolute top-px z-[2] size-full  bg-[linear-gradient(#f8f9fa00_31.43%,_#f8f9fa_86%),_linear-gradient(91deg,_#f8f9fa_0%,_#f8f9fa00_57.72%)] dark:bg-[linear-gradient(180deg,_#12121280_51.43%,_#000000_100%),_linear-gradient(75deg,_#121212_0%,_#12121200_45.72%)]"
        />
      </div>
      <div className="absolute top-10p  z-10 w-full p-8 2xs:top-[15%]">
        {children}
      </div>
    </section>
  );
};

export default TopBackground;
