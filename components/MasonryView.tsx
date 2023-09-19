import React, { useState } from 'react';
import NextImage from 'next/image';
import { Text, Box, Link, useBreakpointValue } from '@chakra-ui/react';

import Masonry from 'react-masonry-css';
import { useResponsiveLink } from '../hook/useResponsiveLink';

const MasonryView = ({ artworks, isDeletedVisible, handleLoading }) => {
  const article_link = useResponsiveLink('', 'article');
  const widthValue = useBreakpointValue({ base: '180px', sm: '236px' });
  const widthValue2 = useBreakpointValue({ base: '188px', sm: '252px' });

  const breakpointColumnsObj = {
    default: 7,
    1792: 6,
    1528: 5,
    1260: 4,
    1008: 3,
    756: 2,
    300: 1,
  };

  const [showButton, setShowButton] = useState(
    Array(artworks?.length).fill(false)
  ); // 각 이미지에 대한 버튼 표시 여부를 배열로 관리

  const [hoveredIndices, setHoveredIndices] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndices((prev) => [...prev, index]);
  };

  const handleMouseLeave = (index) => {
    setHoveredIndices((prev) => prev.filter((i) => i !== index));
  };

  return (
    <Box w="100%" mx="auto" position="relative">
      <Box
        as={Masonry}
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        display="flex"
        justifyContent="center"
        margin="0 -0.5rem"
        // marginLeft="-1rem"
        width="auto"
        sx={{
          '.my-masonry-grid_column': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0 0.5rem',
            // paddingLeft: '1rem',
            backgroundClip: 'padding-box',
            maxW: widthValue2,
          },
        }}
      >
        {isDeletedVisible &&
          artworks.map((artwork, index) => (
            <Box
              w={['180px', '236px']}
              pb="16px"
              display="inline-block"
              position="relative"
              key={artwork.id}
              m="0 1rem"
              p="0 0.5rem"
              // _hover={{ filter: 'brightness(70%)' }}
            >
              <Link
                href={
                  artwork.url === ''
                    ? '#'
                    : article_link + artwork.url.split('/').pop()
                }
                isExternal
                position="relative"
                target="_blank"
                rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
              >
                <Box
                  width={widthValue}
                  overflow="hidden"
                  borderRadius="1rem"
                  position="relative"
                >
                  <NextImage
                    alt={artwork.title}
                    width={236}
                    height={236}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      width: '100%',
                      height: '100%',
                      borderRadius: '1rem',
                      filter: artwork.deleted ? 'blur(6px)' : 'none', // 블러 처리
                    }}
                    src={
                      artwork.img_url === ''
                        ? 'http://via.placeholder.com/236x236'
                        : artwork.deleted
                        ? `/api/blurImage?url=${artwork.img_url}`
                        : artwork.img_url
                    }
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
                  _hover={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)', // 검은색의 30% 투명도
                  }}
                  zIndex={1}
                />
              </Link>
              <Link
                href={
                  artwork.url === ''
                    ? '#'
                    : article_link + artwork.url.split('/').pop()
                }
                isExternal
                _hover={{ textDecoration: 'none' }}
                target="_blank"
                rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
              >
                <Text fontWeight={500} p="0.5rem 0">
                  {artwork.title}
                </Text>
              </Link>
            </Box>
          ))}
        {!isDeletedVisible &&
          artworks?.map((artwork) =>
            !artwork.deleted ? (
              <Box
                w={['180px', '236px']}
                pb="16px"
                display="inline-block"
                key={artwork.id}
                // _hover={{ filter: 'brightness(70%)' }}
              >
                <Link
                  href={
                    artwork.url === ''
                      ? '#'
                      : article_link + artwork.url.split('/').pop()
                  }
                  isExternal
                  position="relative"
                  target="_blank"
                  rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
                >
                  <Box
                    width={widthValue}
                    borderRadius="1rem"
                    backgroundColor="#F5F5F5"
                  >
                    <NextImage
                      alt={artwork.title}
                      width={236}
                      height={236}
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        width: '100%',
                        height: '100%',
                        borderRadius: '1rem',
                      }}
                      src={
                        artwork.img_url === ''
                          ? 'http://via.placeholder.com/236x236'
                          : artwork.img_url
                      }
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
                    _hover={{
                      backgroundColor: 'rgba(0, 0, 0, 0.3)', // 검은색의 30% 투명도
                    }}
                    zIndex={1}
                  />
                </Link>
                <Link
                  href={
                    artwork.url === ''
                      ? '#'
                      : article_link + artwork.url.split('/').pop()
                  }
                  isExternal
                  _hover={{ textDecoration: 'none' }}
                  target="_blank"
                  rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
                >
                  <Text
                    fontWeight={500}
                    p="0.5rem 0"
                    // pt="0.5rem" pb="1rem"
                  >
                    {artwork.title}
                    {/* {artwork.title} - {artwork.date.split(' ')[0].slice(0, -1)} */}
                  </Text>
                </Link>
              </Box>
            ) : null
          )}
      </Box>
    </Box>
  );
};

export default MasonryView;
