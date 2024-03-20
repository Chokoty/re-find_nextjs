import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { FaComment, FaEye, FaImage, FaThumbsUp } from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { MdPerson } from 'react-icons/md';

import { formatArtistValue } from '@/hook/useFormatArtistValue';
import { useModifiedImageUrl } from '@/hook/useModifiedImageUrl';
import { useResponsiveLink } from '@/hook/useResponsiveLink';
import { darkMode, lightMode } from '@/styles/theme';

const iconStyle = {
  width: '1rem',
  height: '1rem',
};
const iconStyleMobile = {
  width: '0.6rem',
  height: '0.6rem',
};

type Props = {
  artwork: ArtworkList | GalleryArtworkList;
  isFocused: boolean;
  onToggleFocus: (id: number | null) => void;
  num: number;
};

export default function GalleryCard1({
  artwork,
  isFocused,
  onToggleFocus,
  num,
}: Props) {
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  // const isMobile = useResponsive();
  const article_link = useResponsiveLink('', 'article');
  const widthValue = useBreakpointValue({ base: '200px', sm: '249px' });
  const width = useBreakpointValue({ base: 200, sm: 249 });
  const modifiedUrl300 = useModifiedImageUrl({
    url: artwork.img_url_list[0],
    size: 300,
  });

  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setImageHeight((e.target as HTMLImageElement).height);
  };

  const authorName = 'author' in artwork ? artwork.author : '';

  return (
    <Box key={artwork?.id} m="0 1rem" w={widthValue}>
      <Box position="relative">
        <Box
          width={widthValue}
          maxHeight="800px"
          h="360px"
          overflow="hidden"
          borderRadius="1rem"
          position="relative"
        >
          <NextImage
            alt={artwork?.title}
            width={width}
            height={236}
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
              width: '100%',
              height: '100%',
              borderRadius: '1rem',
              filter: artwork?.deleted ? 'blur(6px)' : 'none', // 블러 처리
            }}
            src={
              artwork?.img_url === ''
                ? 'http://via.placeholder.com/236x236'
                : modifiedUrl300
            }
            onLoad={handleImageLoad}
            unoptimized
          />
        </Box>
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          borderRadius="1rem"
          zIndex={1}
          background={isFocused ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.0)'}
          // onClick={() => onToggleFocus(artwork.id)}
          onMouseEnter={() => onToggleFocus(artwork.id)}
        />
        {isFocused && (
          <Flex
            w="100%"
            h="100%"
            position="absolute"
            flexDir="column"
            top={0}
            right={0}
            bottom={0}
            left={0}
            zIndex={2}
            borderRadius="1rem"
            border="0.5px solid #FFFFFF"
            background="rgba(0, 0, 0, 0.3)"
            color="white"
            cursor="pointer"
            p={['0.5rem 0', '1rem 0']}
            onMouseLeave={() => onToggleFocus(null)}
          >
            <Box
              display="flex"
              flexDir="column"
              justifyContent="flex-end"
              alignItems="center"
              h="80%"
              borderBottom="0.5px solid #FFFFFF"
              p="1rem"
            >
              <Text
                w="100%"
                textAlign="left"
                fontSize={['sm', 'lg']}
                fontWeight="600"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {artwork.board.split(' ')[1]}
              </Text>
              <Flex
                flexDir="row"
                w="100%"
                justifyContent="flex-start"
                alignItems="center"
                gap="0.5rem"
              >
                <Box w="1rem" h="1rem">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Box>
                <Text
                  fontSize={['sm', 'md']}
                  fontWeight="400"
                  whiteSpace="nowrap"
                  color="#FFFFFFB3"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  maxWidth="100%"
                  textAlign="center"
                >
                  {artwork?.date?.split(' ')[0].slice(2, -1)}
                </Text>
                <Box
                  display="flex"
                  flexDir="row"
                  justifyContent="center"
                  alignItems="center"
                  gap="0.3rem"
                >
                  <FaEye
                    style={widthValue === '180px' ? iconStyleMobile : iconStyle}
                    color="#FFFFFFB3"
                  />
                  <Text
                    fontSize={['sm', 'md']}
                    fontWeight="400"
                    color="#FFFFFFB3"
                  >
                    {formatArtistValue(artwork.view)}
                  </Text>
                </Box>
                <Box
                  display="flex"
                  flexDir="row"
                  justifyContent="center"
                  alignItems="center"
                  gap="0.3rem"
                >
                  <FaThumbsUp
                    style={widthValue === '180px' ? iconStyleMobile : iconStyle}
                    color="#FFFFFFB3"
                  />
                  <Text
                    fontSize={['sm', 'md']}
                    fontWeight="400"
                    color="#FFFFFFB3"
                  >
                    {formatArtistValue(artwork.like)}
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box
              display="flex"
              flexDir="row"
              gap="0.5rem"
              justifyContent="center"
              alignItems="center"
              w="100%"
              h="20%"
              p="2rem 0 1rem 0"
            >
              <Button
                as={Link}
                className="link_to_wakzoo"
                href={article_link + artwork.id}
                isExternal
                _hover={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  backgroundColor: 'yellow.400',
                  color: 'white',
                }}
                target="_blank"
                rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
                colorScheme="yellow"
                borderRadius="2rem"
              >
                <MdPerson />
                <Text fontSize={['xs', 'md']} ml="0.2rem">
                  작가
                </Text>{' '}
                &nbsp;
              </Button>
              <Button
                as={Link}
                className="link_to_wakzoo"
                href={article_link + artwork.id}
                isExternal
                _hover={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  backgroundColor: 'pink.400',
                  color: 'white',
                }}
                target="_blank"
                rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
                borderRadius="2rem"
                colorScheme="pink"
                color="black"
              >
                <Text fontSize={['xs', 'md']}>왁물원</Text> &nbsp;
                <HiOutlineExternalLink />
              </Button>
            </Box>
          </Flex>
        )}
        {num !== -1 && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            w="2rem"
            h="2rem"
            position="absolute"
            top={2}
            left={2}
            borderRadius="2rem"
            zIndex={3}
            background="rgba(0, 0, 0, 0.3)"
          >
            {num}
          </Box>
        )}
      </Box>
      <Box
        h="auto"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="start"
        mt="0.5rem"
      >
        <Text
          fontSize="md"
          textAlign="left"
          fontWeight={500}
          noOfLines={1}
          w="100%"
        >
          {artwork?.title}
        </Text>
        <NextLink href={`/artists/${authorName}`} passHref>
          <Text
            fontSize="sm"
            textAlign="left"
            color="#FFFFFFB3"
            fontWeight={500}
          >
            작가: {authorName}
          </Text>
        </NextLink>
      </Box>
    </Box>
  );
}
