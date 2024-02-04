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

interface AuthorProfileCardProps {
  writerURL: string;
  profURL: string;
  nickname: string;
  board: string[];
}

const GalleryCard: React.FC<AuthorProfileCardProps> = ({
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

  const member_link = useResponsiveLink(writerURL.split('/').pop(), 'member');

  return (
    <Box h="600px">
      <Box w="415px" h="600px">
       <Image
              src="/static/images/크리스마스커버일러스트_1920x1080.jpg"
              alt="이파리티콘-추워"
              width={600}
              height={600}
              style={{
              objectFit:"cover",
              objectPosition: 'center top',
              width: '100%',
              height: '100%',
              borderRadius: '1rem'
              }}
              unoptimized
            />
        </Box>
        <Text textAlign="left">[2인 이상]안녕하세요</Text>
        <Text textAlign="left">작가: 후히이</Text>
    </Box>
  );
};

export default GalleryCard;
