import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { FaBookmark } from 'react-icons/fa';

type Prop = {
  num: number;
};

const connectUrl = (num: number) => {
  switch (num) {
    case 1:
      return 'first-gradient';
    case 2:
      return 'second-gradient';
    case 3:
      return 'third-gradient';
    default:
      return 'first-gradient';
  }
};

export default function RankingBadge({ num }: Prop) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top="-1"
      left="2"
      zIndex={3}
      filter="drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.20))"
      // w="0px"
      // h="200px"
    >
      {/* for gradient */}
      <svg width="0" height="0">
        <linearGradient id="first-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop stopColor="#FEE140" offset="0%" />
          <stop stopColor="#FA709A" offset="100%" />
        </linearGradient>
      </svg>
      <svg width="0" height="0">
        <linearGradient
          id="second-gradient"
          x1="100%"
          y1="100%"
          x2="0%"
          y2="0%"
        >
          <stop stopColor="#00F2FE" offset="0%" />
          <stop stopColor="#4FACFE" offset="100%" />
        </linearGradient>
      </svg>
      <svg width="0" height="0">
        <linearGradient id="third-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop stopColor="#38F9D7" offset="0%" />
          <stop stopColor="#43E97B" offset="100%" />
        </linearGradient>
      </svg>
      <FaBookmark size="40" style={{ fill: `url(#${connectUrl(num)})` }} />
      <Text
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        {num}
      </Text>
    </Box>
  );
}
