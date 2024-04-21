import Image from 'next/image';
import { useEffect, useState } from 'react';

import { SUB_TITLES } from '@/app/(home)/lib/const';
import { RealWakGood } from '@/lib/images';

export default function SubTitle() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SUB_TITLES.length);
    }, 3000);

    return () => clearInterval(interval); // 타이머를 정리합니다.
  }, []);

  return (
    <div className="flex items-center gap-[10px]">
      <p className="text-lg font-bold text-hightlight md:text-xl lg:text-2xl xl:text-3xl">
        {SUB_TITLES[currentIndex]}
      </p>
      <p className="text-lg font-bold md:text-xl lg:text-2xl xl:text-3xl">
        팬아트
      </p>
      <div className="relative h-[22px] w-[78px] overflow-hidden rounded-2xl shadow-wakdoo md:h-[28px] md:w-[98px] lg:h-[33px]  lg:w-[116px] xl:h-[40px] xl:w-[140px]">
        <Image
          src={RealWakGood}
          alt="실사왁굳"
          className="absolute mt-[-35%] max-h-fit w-[480px]"
          width={100}
          height={100}
          // unoptimized
          // placeholder="blur"
        />
      </div>
      <p className="text-lg font-bold md:text-xl lg:text-2xl xl:text-3xl">
        출처 찾기
      </p>
    </div>
  );
}
