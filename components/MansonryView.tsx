import React, { useState, useEffect, useRef } from 'react';
import NextImage from 'next/image';
import { Button, Text, Box, Link, useBreakpointValue } from '@chakra-ui/react';

import Bricks from 'bricks.js';
import imagesLoaded from 'imagesloaded';
import { useResponsiveLink } from '../hook/useResponsiveLink';

const MasonryView = ({
  artworks,
  isDeletedVisible,
  // loadingImage,
  handleLoading,
}) => {
  const article_link = useResponsiveLink('', 'article');
  const containerRef = useRef(null);
  const widthValue = useBreakpointValue({ base: '180px', sm: '236px' });

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

  useEffect(() => {
    window.onload = () => {
      // Bricks.js 초기화 코드
    };
    handleLoading(true);
    // 1초 지연
    setTimeout(() => {
      handleLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    // 이미지 로딩 완료를 확인
    handleLoading(true);
    imagesLoaded(containerRef.current, function () {
      const instance = Bricks({
        container: containerRef.current,
        packed: 'data-packed',
        sizes: [
          { columns: 2, gutter: 8 },
          { mq: '756px', columns: 3, gutter: 16 }, // 252*3 +4
          { mq: '1008px', columns: 4, gutter: 16 }, // 252*4=1008
          { mq: '1260px', columns: 5, gutter: 16 }, // 252*5=1260
          { mq: '1528px', columns: 6, gutter: 16 }, // 252*6=1512
          { mq: '1792px', columns: 7, gutter: 16 }, // 252*7=1764
        ],
      });

      const handleResize = () => {
        instance.resize(true).pack();
      };

      window.addEventListener('resize', handleResize);

      instance.resize(true).pack();

      return () => {
        instance.resize(false);
        window.removeEventListener('resize', handleResize);
      };
    });
    // 화면 크기를 강제로 조절하는 코드
    setTimeout(() => {
      window.innerWidth += 0.001;
      window.dispatchEvent(new Event('resize'));
      window.innerWidth -= 0.001;
      window.dispatchEvent(new Event('resize'));
    }, 0);

    // 1초 지연
    setTimeout(() => {
      handleLoading(false);
    }, 1200);
  }, [
    // artworks,
    isDeletedVisible,
  ]);

  return (
    <Box ref={containerRef} w="100%" mx="auto" position="relative">
      {isDeletedVisible &&
        artworks.map((artwork, index) => (
          <Box
            w={['180px', '236px']}
            pb="16px"
            display="inline-block"
            position="relative"
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
                <Box width={widthValue}>
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
  );
};

export default MasonryView;
