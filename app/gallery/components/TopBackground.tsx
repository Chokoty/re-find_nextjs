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
    <section className="relative top-[-60px] flex size-full max-h-[1180px] flex-col items-center justify-center">
      <div className="z-[1] aspect-[1200/675] min-h-[355px] w-full 2xs:min-h-[440px] sm:min-h-[586px]">
        <Image
          className="size-full max-h-[1180px] object-cover opacity-70 dark:opacity-80"
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
        // shadow를 아래로 내려줘야 그림자가 뜨는 현상이 없어진다.
        // #121212 > light-mode | #f8f9fa > dark-mode
        className="absolute top-[1px] z-[2] size-full bg-[linear-gradient(#f8f9fa00_31.43%,_#f8f9fa_86%),_linear-gradient(91deg,_#f8f9fa_0%,_#f8f9fa00_57.72%)] dark:bg-[linear-gradient(180deg,_#12121280_51.43%,_#121212_100%),_linear-gradient(75deg,_#121212_0%,_#12121200_45.72%)]"
      />
      <div className="absolute bottom-8 z-[2] block w-full px-8 2xs:bottom-20 md:bottom-1/2 md:translate-y-[80%]">
        {children}
      </div>
    </section>
  );
};

export default TopBackground;
