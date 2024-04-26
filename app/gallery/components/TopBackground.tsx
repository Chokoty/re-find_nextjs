'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { getStaticImage } from '@/app/gallery/lib/getStaticImage';

interface TopBackgroundProps {
  children: ReactNode;
}

const TopBackground = ({ children }: TopBackgroundProps) => {
  const pathname = usePathname().replace('/gallery', '');
  const bgStaticSrc = getStaticImage(pathname.slice(1));

  return (
    <section className="relative flex size-full max-h-[751px] flex-col items-center justify-center">
      <div className="top-0 z-[1] aspect-[1200/675] w-full 2xs:relative 2xs:top-[-60px]">
        <Image
          className="size-full max-h-[751px] object-cover opacity-70 dark:opacity-80"
          src={bgStaticSrc}
          alt="백그라운드 커버 이미지"
          quality={100}
          width={1920}
          height={1080}
          unoptimized
          priority
        />
      </div>
      <div
        // 4k screen으로가면 +1을 해주어 shadow를 아래로 내려줘야 뜨는 현상이 없어진다.
        // #121212 > light-mode | #f8f9fa > dark-mode
        className="absolute top-0 z-[2] size-full bg-[linear-gradient(#f8f9fa00_31.43%,_#f8f9fa_86%),_linear-gradient(91deg,_#f8f9fa_0%,_#f8f9fa00_57.72%)] dark:bg-[linear-gradient(180deg,_#12121280_51.43%,_#121212_100%),_linear-gradient(75deg,_#121212_0%,_#12121200_45.72%)] 2xs:top-[-59px]"
      />
      <div className="absolute bottom-4 z-[2] flex size-full px-4 2xs:bottom-32 2xs:block 2xs:h-auto 2xs:px-8 md:bottom-40 2md:bottom-56 xl:bottom-80">
        {children}
      </div>
    </section>
  );
};

export default TopBackground;
