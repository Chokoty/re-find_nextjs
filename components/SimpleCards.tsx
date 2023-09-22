import React, { useState } from 'react';
import NextImage from 'next/image';
import {
  Flex,
  Button,
  Box,
  Link,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useResponsiveLink } from '../hook/useResponsiveLink';
import { useUploadTimeDiff } from '../hook/useUploadTimeDiff';
import { useModifiedImageUrl } from '@/hook/useModifiedImageUrl';
import { HiOutlineExternalLink } from 'react-icons/hi';
const SimpleCard = ({ artwork, isFocused, onToggleFocus }) => {
  const article_link = useResponsiveLink('', 'article');
  const widthValue = useBreakpointValue({ base: '180px', sm: '236px' });
  const [imageHeight, setImageHeight] = useState(null);
  const uploadTimeDiff = useUploadTimeDiff(artwork.date);

  const modifiedUrl100List1 = useModifiedImageUrl(
    artwork?.img_url_list[1],
    100
  );
  const modifiedUrl100List2 = useModifiedImageUrl(
    artwork?.img_url_list[2],
    100
  );
  const modifiedUrl300 = useModifiedImageUrl(artwork.img_url, 300);
  const handleImageLoad = (e) => {
    setImageHeight(e.target.height);
  };

  return (
    <Link
      key={artwork.id}
      href={
        artwork.url === '' ? '#' : article_link + artwork.url.split('/').pop()
      }
      isExternal
      _hover={{ textDecoration: 'none' }}
      target="_blank"
      rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
    >
      <Box
        key={artwork.id}
        m="0 0.5rem"
        mb=" 1rem"
        w={['180px', '236px']}
        h={['120px', '157px']}
        alignItems="center"
        overflow="hidden"
        flexWrap="wrap"
        borderRadius="1rem"
      >
        <Box
          h={['120px', '157px']}
          borderRadius="1rem"
          //  border="2px solid #000"
          position="relative"
        >
          <Flex
            h={['120px', '157px']}
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box w={['120px', '157px']} h="100%" mr="0.2rem">
              <NextImage
                alt={artwork.title}
                width={300}
                height={300}
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  // objectPosition: 'center -2rem',
                  width: '100%',
                  height: '100%',
                }}
                src={
                  artwork.img_url === ''
                    ? 'http://via.placeholder.com/252x157'
                    : // : artwork.deleted
                      // ? `/api/blurImage?url=${artwork.img_url}`
                      modifiedUrl300 // 썸네일 크기 300으로 가져오기 - 네이버 자체 썸네일 api
                }
                unoptimized
              />
            </Box>
            {artwork.img_url_list.length == 1 && (
              <Flex flexDir="column" gap="0.2rem">
                <Box
                  w={['61px', '76px']}
                  h={['61px', '76px']}
                  background="#E0E0E0"
                ></Box>
                <Box
                  w={['61px', '76px']}
                  h={['61px', '76px']}
                  background="#E0E0E0"
                ></Box>
              </Flex>
            )}
            {artwork.img_url_list.length == 2 && (
              <Flex flexDir="column" gap="0.2rem">
                <Box
                  w={['61px', '76px']}
                  h={['61px', '76px']}
                  background="#E0E0E0"
                >
                  <NextImage
                    alt={artwork.title}
                    width={300}
                    height={300}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      // objectPosition: 'center -2rem',
                      width: '100%',
                      height: '100%',
                    }}
                    src={
                      modifiedUrl100List1 // 썸네일 크기 100으로 가져오기 - 네이버 자체 썸네일 api
                    }
                    unoptimized
                  />
                </Box>
                <Box
                  w={['61px', '76px']}
                  h={['61px', '76px']}
                  background="#E0E0E0"
                ></Box>
              </Flex>
            )}
            {artwork.img_url_list.length >= 3 && (
              <Flex flexDir="column" gap="0.2rem">
                <Box
                  w={['61px', '76px']}
                  h={['61px', '76px']}
                  background="#E0E0E0"
                >
                  <NextImage
                    alt={artwork.title}
                    width={300}
                    height={300}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      // objectPosition: 'center -2rem',
                      width: '100%',
                      height: '100%',
                    }}
                    src={
                      modifiedUrl100List1 // 썸네일 크기 100으로 가져오기 - 네이버 자체 썸네일 api
                    }
                    unoptimized
                  />
                </Box>
                <Box
                  w={['61px', '76px']}
                  h={['61px', '76px']}
                  background="#E0E0E0"
                >
                  <NextImage
                    alt={artwork.title}
                    width={300}
                    height={300}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      // objectPosition: 'center -2rem',
                      width: '100%',
                      height: '100%',
                    }}
                    src={
                      modifiedUrl100List2 // 썸네일 크기 100으로 가져오기 - 네이버 자체 썸네일 api
                    }
                    unoptimized
                  />
                </Box>
              </Flex>
            )}
          </Flex>

          <Box
            position="absolute"
            top={0}
            right={0}
            bottom={0}
            left={0}
            borderRadius="1rem"
            _hover={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)', // 검은색의 30% 투명도
            }}
            zIndex={1}
          />
        </Box>
        <Box p="0.5rem">
          <Text
            fontSize={['sm', 'xl']}
            fontWeight="600"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            maxWidth="100%"
          >
            {artwork.title}
          </Text>
          <Text fontSize={['xs', 'sm']}>{artwork.board}</Text>
        </Box>
      </Box>
      <Box>
        <Text fontSize={['md', 'xl']} fontWeight={600} p="0 1rem">
          {artwork.title.length > 10
            ? artwork.title.slice(0, 10) + '...'
            : artwork.title}
        </Text>
        <Flex p="0 1rem" gap="0.5rem">
          <Text fontSize={['xs', 'sm']} fontWeight={300}>
            팬아트 {artwork.img_url_list.length}개
          </Text>
          <Text fontSize={['xs', 'sm']} fontWeight={300}>
            {uploadTimeDiff}
          </Text>
        </Flex>
      </Box>
    </Link>
  );
};

export default SimpleCard;
