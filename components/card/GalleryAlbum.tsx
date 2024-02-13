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
import { HiOutlineArrowRight, HiArrowNarrowRight } from "react-icons/hi";
import { FaArrowRightLong } from 'react-icons/fa6';
import { BsArrowRight } from "react-icons/bs";
import { useResponsiveLink } from '@/hook/useResponsiveLink';
import { darkMode, lightMode } from '@/styles/theme';

interface AuthorProfileCardProps {
  writerURL: string;
  profURL: string;
  nickname: string;
  board: string[];
}

const GalleryAlbum: React.FC<AuthorProfileCardProps> = ({
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
    <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        textAlign="center"
    >
      <Box 
      w="560px" 
      h="400px" 
      position="relative"
      >
       <Image
              src="/static/images/크리스마스커버일러스트_1920x1080.jpg"
              alt="이파리티콘-추워"
              width={560}
              height={400}
              style={{
                objectFit:"cover",
                objectPosition: 'center top',
                width: '100%',
                height: '100%',
                borderRadius: '1rem',
              }}
              unoptimized
        />
        <Box
          position="absolute"
          alignItems="center"
          top="1rem"
          right="1rem"
          w="7rem"
          h="2.5rem"
          borderRadius="1rem"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          display="flex"
          justifyContent="center"
        >
          <Text textAlign="center">
            리파인드 추천
          </Text>
        </Box>
        <Box alignItems="center">
          <Text
            position="absolute"
            bottom="3rem"
            left="2rem"
            fontWeight="bold"
            fontSize="28px"
          >
            이세계아이돌 크리스마스 팬아트
          </Text>
          <BsArrowRight
            style={{
              width:"3rem",
              height:"3rem",
              position: "absolute",
              bottom: "2rem",
              right: "2rem",
              cursor: 'pointer'
            }}
          />
          <Text
            position="absolute"
            bottom="1.5rem"
            left="2rem"
            fontWeight="bold"
            fontSize="1rem"
          >
            이세돌과 함께 메리 크리스마스!
          </Text>
          </Box> 
      </Box>
    </Box>
  );
};

export default GalleryAlbum;
