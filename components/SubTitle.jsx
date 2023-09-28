import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Heading, useColorModeValue } from '@chakra-ui/react';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

import { lightMode, darkMode } from '@/styles/theme';

const data = ['왁타버스', '우왁굳', '이세계아이돌', '고멤/교멤'];
const SubTitle = () => {
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
          src="/real-wakgood.jpg"
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
};

export default SubTitle;
