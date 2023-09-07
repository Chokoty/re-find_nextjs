import React, { useEffect, useRef } from 'react';
import NextImage from 'next/image';
import { Text, Box, Link } from '@chakra-ui/react';
import Bricks from 'bricks.js';

import { useResponsiveLink } from '../hook/useResponsiveLink';

const MasonryView = ({ artworks }) => {
  const article_link = useResponsiveLink('', 'article');
  const containerRef = useRef(null);

  useEffect(() => {
    const instance = Bricks({
      container: containerRef.current,
      packed: 'data-packed',
      sizes: [
        { columns: 2, gutter: 16 },
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
  }, [artworks]);
  // useEffect(() => {
  //   const calculateColumns = () => {
  //     const containerWidth = containerRef.current.offsetWidth;
  //     return Math.floor(containerWidth / 236);
  //   };

  //   // const instance = Bricks({
  //   //   container: containerRef.current,
  //   //   packed: 'data-packed',
  //   //   sizes: [
  //   //     { columns: 2, gutter: 10 },
  //   //     { mq: '768px', columns: 3, gutter: 16 },
  //   //     { mq: '1024px', columns: 4, gutter: 16 },
  //   //   ],
  //   // });
  //   const instance = Bricks({
  //     container: containerRef.current,
  //     packed: 'data-packed',
  //     sizes: [{ columns: calculateColumns(), gutter: 16 }],
  //   });

  //   instance.resize(true).pack();

  //   return () => {
  //     instance.resize(false);
  //   };
  // }, [artworks]);

  return (
    <Box ref={containerRef} w="100%" mx="auto">
      {artworks.map((artwork) =>
        !artwork.deleted ? (
          <Box
            w="236px"
            // borderRadius="xl"
            pb="16px"
            display="inline-block"
            key={artwork.id}
            // position="relative"
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
                src={artwork.img_url}
                unoptimized
              />
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
              <Text fontWeight={500} pt="0.5rem" pb="1rem">
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
