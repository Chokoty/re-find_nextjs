import { useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import WakGood from '@/public/real-wakgood.webp';
import { darkMode, lightMode } from '@/styles/theme';

const data = ['왁타버스', '우왁굳', '이세돌', '고멤/교멤'];

export default function SubTitle() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000);

    return () => clearInterval(interval); // 타이머를 정리합니다.
  }, []);

  return (
    <div className="sub-title">
      <p className="title-text" style={{ color: highlightColor }}>
        {data[currentIndex]}
      </p>
      <p className="title-text">팬아트</p>
      <div className="bg-crop">
        <Image
          src={WakGood}
          alt="실사왁굳"
          className="bg-wakdoo"
          width={100}
          height={100}
          // unoptimized
          // placeholder="blur"
        />
      </div>
      <p className="title-text">출처 찾기</p>
    </div>
  );
}
