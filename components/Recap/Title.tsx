'use client';

import Image from 'next/image';

import { RefindLogo } from '@/lib/images';

export default function Title({ artist }: { artist?: string }) {
  return (
    <div className="flex flex-col  items-start justify-end">
      {artist ? (
        <div className="flex items-start justify-center gap-4">
          <h2 className="flex flex-col items-start justify-center text-center font-sbAggro  text-2xl font-medium leading-tight text-pink-highlight lg:text-[40px]">
            {artist}님의
          </h2>
        </div>
      ) : null}
      <h2 className="flex flex-col items-start justify-end  text-center font-sbAggro text-[40px] font-medium leading-tight 2xs:text-[50px]  md:text-[60px] lg:text-[80px]">
        <div className="flex items-start justify-center gap-4">
          <span>2024년</span>
          <Image
            src={RefindLogo}
            alt="리파인드 로고"
            width={72}
            height={72}
            priority
            unoptimized
            className="size-12 xl:size-20"
          />
        </div>
        <span>
          <span className="text-green-highlight">리파인드</span> 돌아보기
        </span>
      </h2>
    </div>
  );
}
