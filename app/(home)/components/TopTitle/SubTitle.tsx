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
    <div className="flex items-center gap-[10px] font-pop">
      <p className="text-lg text-green-highlight dark:text-pink-highlight md:text-xl">
        {SUB_TITLES[currentIndex]}
      </p>
      <p className="text-lg md:text-xl">팬아트</p>
      <div className="h-[22px] w-[78px] overflow-hidden rounded-2xl shadow-wakdoo md:h-[28px] md:w-[98px]">
        <Image
          src={RealWakGood}
          alt="실사왁굳"
          className="-translate-y-[23%]"
          width={150}
          height={219}
          // unoptimized
          // placeholder="blur"
        />
      </div>
      <p className="text-lg md:text-xl">출처 찾기</p>
    </div>
  );
}
