import { Box, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
// import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { darkMode, lightMode } from '@/styles/theme';

const data = ['왁타버스', '우왁굳', '이세돌', '고멤/교멤'];
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
      <Box
        className="bg-crop"
        position="relative"
        overflow="hidden"
        borderRadius="20px"
        boxShadow="0 2px 4px rgba(105, 80, 48, 0.2)"
        border="1px solid #695030"
      >
        {/* <Image
          src="/쿵야굳.jpg"
          alt="실사왁굳"
          className="bg-wakdoo"
          width={100}
          height={100}
          // unoptimized
          // placeholder="blur"
        /> */}
        <Image
          src="/real-wakgood.jpg"
          alt="실사왁굳"
          className="bg-wakdoo"
          width={100}
          height={100}
          // unoptimized
          // placeholder="blur"
        />
      </Box>
      <p className="title-text">출처 찾기</p>
    </div>
  );
};

export default SubTitle;
