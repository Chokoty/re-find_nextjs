import { Heading, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

import { darkMode, lightMode } from '@/styles/theme';

const Title = ({ onTitleClick }) => {
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  // const color = useColorModeValue(lightMode.color, darkMode.color);

  const handleTitleClick = () => {
    window.location.href = '/';
  };

  return (
    <div className="title" onClick={onTitleClick}>
      <Link href="/" className="content">
        {/* <Heading className="title-main" fontFamily={'ONE-Mobile-POP'}> */}
        <Heading className="title-main">
          <span style={{ color: highlightColor }}>RE:</span>
          FIND
          {/* <span style={{ color: color }}>FIND</span> */}
        </Heading>
        {/* <Image
                    src="/refind-title.png"
                    alt="refind-title"
                    class="logo-img"
                    width={400}
                    height={100}
                    unoptimized
                /> */}
      </Link>
    </div>
  );
};

export default Title;
