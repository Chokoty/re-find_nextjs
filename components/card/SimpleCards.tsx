import { Box, Flex, Link, Text } from '@chakra-ui/react';
import NextImage from 'next/image';

import { useModifiedImageUrl } from '@/hook/useModifiedImageUrl';
import { useResponsiveLink } from '@/hook/useResponsiveLink';
import { useUploadTimeDiff } from '@/hook/useUploadTimeDiff';

type Prop = {
  artwork: ArtworkList;
};

export default function SimpleCard({ artwork }: Prop) {
  const article_link = useResponsiveLink('', 'article');
  const uploadTimeDiff = useUploadTimeDiff(artwork.date);

  const modifiedUrl100List1 = useModifiedImageUrl({
    url: artwork.img_url_list[1],
    size: 100,
  });
  const modifiedUrl100List2 = useModifiedImageUrl({
    url: artwork.img_url_list[2],
    size: 100,
  });
  const modifiedUrl300 = useModifiedImageUrl({
    url: artwork.img_url_list[0],
    size: 300,
  });
  return (
    <Link
      className="link-to-wakzoo-from-profile"
      key={artwork.id}
      href={artwork?.id ? article_link + artwork.id : '#'}
      isExternal
      _hover={{ textDecoration: 'none' }}
      target="_blank"
      rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
    >
      <Box
        key={artwork.id}
        m={['0', '0 0.5rem']}
        mb=" 1rem"
        w={['170px', '236px']}
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
            {artwork.img_url_list.length === 1 && (
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
            {artwork.img_url_list.length === 2 && (
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
        <Text
          fontSize={['md', 'xl']}
          fontWeight={600}
          textAlign="start"
          p="0 1rem"
          mt="0.5rem"
        >
          {artwork.title.length > 10
            ? `${artwork.title.slice(0, 10)}...`
            : artwork.title}
        </Text>
        <Flex
          p="0 1rem"
          gap="0.5rem"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Text fontSize={['xs', 'sm']} fontWeight={300}>
            팬아트 {artwork.img_url_list.length}개
          </Text>
          <Text>·</Text>
          <Text fontSize={['xs', 'sm']} fontWeight={300}>
            {uploadTimeDiff}
          </Text>
        </Flex>
      </Box>
    </Link>
  );
}
