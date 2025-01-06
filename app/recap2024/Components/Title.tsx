'use client';

import Image from 'next/image';

import { RefindLogo } from '@/lib/images';

export default function Title({ artist }: { artist?: string }) {
  return (
    <div className="flex h-40 flex-col  items-start justify-end xl:h-72">
      {artist ? (
        <div className="items-top flex justify-center gap-4">
          <h2 className="flex flex-col items-start justify-center text-center font-sbAggro text-[10px] font-bold leading-tight text-pink-highlight 2xs:text-[20px] md:text-[30px] lg:text-[40px]">
            {artist}님의
          </h2>
        </div>
      ) : null}
      <h2 className="flex flex-col items-start justify-end text-center font-sbAggro text-[40px] font-bold leading-tight 2xs:text-[50px] md:text-[60px] lg:text-[80px]">
        <div className="flex items-start justify-center gap-4">
          <span>2024년</span>
          <Image
            src={RefindLogo}
            alt="리파인드 로고"
            width={80}
            height={80}
            priority
            unoptimized
            className="size-12 xl:size-20 "
          />
        </div>
        <span>
          <span className="text-green-highlight">리파인드</span> 돌아보기
        </span>
      </h2>
    </div>
  );
}
