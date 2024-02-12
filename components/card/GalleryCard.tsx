import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

import { useResponsiveLink } from '@/hook/useResponsiveLink';
import { darkMode, lightMode } from '@/styles/theme';

interface CardProps {
  writerURL: string;
  profURL: string;
  nickname: string;
  board: string[];
}

const GalleryCard: React.FC<CardProps> = ({
  writerURL,
  profURL,
  nickname,
  board,
}) => {
  const color2 = useColorModeValue(lightMode.color2, darkMode.color2);
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  const highlightColor2 = useColorModeValue(
    lightMode.highlight2,
    darkMode.highlight2
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
      textAlign="center"
      gap="0.4rem"
      _hover={{
        cursor: 'pointer',
      }}
    >
      <Box w="300px" h="430px">
        <Image
          src="/static/images/크리스마스커버일러스트_1920x1080.jpg"
          alt="이파리티콘-추워"
          width={600}
          height={600}
          style={{
            objectFit: 'cover',
            objectPosition: 'center top',
            width: '100%',
            height: '100%',
            borderRadius: '1rem',
          }}
          unoptimized
        />
      </Box>
      <Text fontSize="md" fontWeight="bold" style={{ cursor: 'pointer' }}>
        [2인 이상]안녕하세요
      </Text>
      <Text fontSize="sm">작가: 후히이</Text>
    </Box>
  );
};

export default GalleryCard;
