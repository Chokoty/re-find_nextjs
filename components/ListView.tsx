import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import React, { useState } from 'react';
import { TbDownload, TbPhotoSearch } from 'react-icons/tb';

import { useResponsiveLink } from '@/hook/useResponsiveLink';

const ListView = ({ artworks }) => {
  const article_link = useResponsiveLink('', 'article');
  const isTabletOrSmaller = useBreakpointValue({ base: true, md: false });
  // console.log(artworks);

  const [hoveredIndices, setHoveredIndices] = useState([]);
  // const [clickedIndices, setClickedIndices] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleButtonClick = (index) => {
    if (clickedIndex === index) {
      // 이미 클릭된 버튼을 다시 클릭하면 null로 설정하여 끕니다.
      setClickedIndex(null);
    } else {
      // 다른 버튼을 클릭하면 해당 버튼의 인덱스로 설정합니다.
      setClickedIndex(index);
    }
  };
  const handleMouseEnter = (index) => {
    setHoveredIndices((prev) => [...prev, index]);
  };

  const handleMouseLeave = (index) => {
    setHoveredIndices((prev) => prev.filter((i) => i !== index));
  };
  return (
    <Flex
      flexDirection="column"
      w="100%"
      justifyContent="center"
      alignItems="center"
    >
      {artworks?.map((artwork, index) =>
        !artwork.deleted ? (
          <Box
            key={artwork.id}
            m={['8rem 1rem', '6rem 1rem']}
            maxW="756px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Link
              // key={artwork.id}
              className="link_to_wakzoo"
              href={
                artwork.url === ''
                  ? '#'
                  : article_link + artwork.url.split('/').pop()
              }
              isExternal
              _hover={{ textDecoration: 'none' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Box w="100%" borderRadius="1rem" position="relative">
                <NextImage
                  alt={artwork.title}
                  width={1000}
                  height={1000}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    width: '100%',
                    height: '100%',
                    borderRadius: '1rem',
                  }}
                  src={
                    artwork.img_url === ''
                      ? 'http://via.placeholder.com/640x236'
                      : artwork.img_url
                  }
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
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  }}
                  zIndex={1}
                  w="100%"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  <Box
                    position="absolute"
                    top={0}
                    right={0}
                    bottom={0}
                    left={0}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor="rgba(0, 0, 0, 0.3)" // 반투명 배경
                    // opacity={hoveredIndices.includes(index) ? 1 : 0}
                    // opacity={
                    //   hoveredIndices.includes(index) ||
                    //   clickedIndices.includes(index)
                    //     ? 1
                    //     : 0
                    // }
                    opacity={
                      hoveredIndices.includes(index) || clickedIndex === index
                        ? 1
                        : 0
                    }
                  >
                    <Text
                      w="90%"
                      fontSize={['2xl', '4xl', '5xl']}
                      fontWeight="600"
                      color="white"
                      textAlign="center"
                    >
                      {artwork.title}
                    </Text>
                    <Text
                      w="90%"
                      fontSize={['lg', '2xl', '3xl']}
                      fontWeight="600"
                      color="white"
                      textAlign="center"
                    >
                      {artwork.board}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Link>
            {isTabletOrSmaller && (
              <Flex
                pt="3rem"
                w="100%"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                gap="1rem"
              >
                <Tooltip label="팬아트 정보 보기">
                  <Button
                    mt="1rem"
                    w="20%"
                    p="0"
                    colorScheme="blue"
                    // variant={clickedIndices.includes(index) ? 'solid' : 'outline'}
                    variant={clickedIndex === index ? 'solid' : 'outline'}
                    onClick={() => handleButtonClick(index)}
                  >
                    <TbPhotoSearch
                      style={{
                        width: '1.5rem',
                        height: '1.5rem',
                      }}
                    />
                  </Button>
                </Tooltip>
                <Tooltip label="원본이미지 다운로드">
                  <Button
                    mt="1rem"
                    w="20%"
                    p="0"
                    colorScheme="green"
                    variant="outline"
                  >
                    <Link
                      href={artwork.img_url} // 이미지 URL
                      isExternal
                      download
                    >
                      <TbDownload
                        style={{
                          width: '1.5rem',
                          height: '1.5rem',
                        }}
                      />
                    </Link>
                  </Button>
                </Tooltip>
              </Flex>
            )}
          </Box>
        ) : null
      )}
    </Flex>
  );
};

export default ListView;
