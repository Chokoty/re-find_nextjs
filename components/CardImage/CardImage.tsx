import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaThumbsUp } from 'react-icons/fa';
import { FaArrowRightLong, FaChevronRight } from 'react-icons/fa6';

import styles from '@/components/CardImage/CardImage.module.scss';
import { formatArtistValue } from '@/hooks/useFormatArtistValue';
import { useModifiedImageUrl } from '@/hooks/useModifiedImageUrl';
import { useResponsive } from '@/hooks/useResponsive';
import { useResponsiveLink } from '@/hooks/useResponsiveLink';

type Props = {
  data: ArtworkList | GalleryArtworkList;
};

export default function CardImage({ data }: Props) {
  const {
    img_url,
    img_url_list,
    title,
    board,
    category,
    view,
    like,
    comment,
    date,
    deleted,
    id,
    url,
  } = data;
  const isMobile = useResponsive();
  const article_link = useResponsiveLink('', 'article');
  const modifiedUrl300 = useModifiedImageUrl({
    url: img_url_list[0],
    size: 300,
  });

  if (isMobile) {
    return (
      <Link href={`/artwork/${id}`}>
        <Box className={styles.linkCardContainer} position="relative">
          <Image
            width={236}
            height={236}
            src={
              img_url === ''
                ? 'http://via.placeholder.com/236x236'
                : modifiedUrl300
            }
            alt={title}
            style={{
              maxHeight: '430px',
              objectFit: 'cover',
              borderRadius: '20px',
              filter: deleted ? 'blur(6px)' : 'none', // 블러 처리
              background: 'rgb(245, 245, 245)',
            }}
            unoptimized
          />
          <Box
            className={styles.overlay}
            position="absolute"
            top={0}
            right={0}
            bottom={0}
            left={0}
            borderRadius="20px"
            zIndex={1}
          />
          <Box
            className={styles.hoverContainer}
            position="absolute"
            top={0}
            right={0}
            bottom={0}
            left={0}
            borderRadius="20px"
            zIndex={2}
            background="rgba(0, 0, 0, 0.5)"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="white" fontSize="1.2rem" fontWeight="600">
              자세히
            </Text>
          </Box>
        </Box>
      </Link>
    );
  }

  return (
    <Box className={styles.cardContainer} position="relative">
      <Image
        width={236}
        height={236}
        src={
          img_url === '' ? 'http://via.placeholder.com/236x236' : modifiedUrl300
        }
        alt={title}
        style={{
          maxHeight: '430px',
          objectFit: 'cover',
          borderRadius: '20px',
          filter: deleted ? 'blur(6px)' : 'none', // 블러 처리
          background: 'rgb(245, 245, 245)',
        }}
        unoptimized
      />
      <Box
        className={styles.overlay}
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        left={0}
        borderRadius="20px"
        zIndex={1}
      />
      <Flex
        className={styles.hoverContainer}
        // style={
        //   imageHeight && imageHeight <= 200
        //     ? {
        //         padding: 0,
        //       }
        //     : undefined
        // }
        flexDir="column"
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        left={0}
        borderRadius="20px"
        border="1px solid rgba(255, 255, 255, 0.70)"
        zIndex={2}
        background="rgba(0, 0, 0, 0.5)"
        justifyContent="space-between"
        alignItems="center"
        color="white"
        fontSize="2rem"
        fontWeight="bold"
        // cursor="pointer"
        p={['0.5rem 0', '1rem 0']}
      >
        <Box
          className={styles.body}
          width="100%"
          display="flex"
          flexDir="column"
          justifyContent="flex-end"
          alignItems="center"
          h="80%"
          borderBottom="1px solid rgba(255, 255, 255, 0.70)"
          p="1rem"
        >
          <Text
            className={styles.board}
            w="100%"
            textAlign="left"
            fontSize={['sm', 'lg']}
            fontWeight="600"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {board.replace(/&#\d+;/g, '').trim()}
          </Text>
          <Flex
            className={styles.info}
            flexDir="row"
            w="100%"
            justifyContent="flex-start"
            alignItems="center"
            gap="0.5rem"
          >
            <Box
              display="flex"
              flexDir="row"
              justifyContent="center"
              alignItems="center"
              gap="0.3rem"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              maxWidth="100%"
            >
              <Box w="14px" h="14px">
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
                fontSize={['xs', 'sm', '15px']}
                fontWeight="400"
                color="#FFFFFFB3"
                textAlign="center"
              >
                {date?.split(' ')[0].slice(2, -1)}
              </Text>
            </Box>
            <Box
              display="flex"
              flexDir="row"
              justifyContent="center"
              alignItems="center"
              gap="0.3rem"
            >
              <FaEye
                size="14px"
                // style={widthValue === '180px' ? iconStyleMobile : iconStyle}
                color="#FFFFFFB3"
              />
              <Text
                fontSize={['xs', 'sm', '15px']}
                fontWeight="400"
                color="#FFFFFFB3"
              >
                {formatArtistValue(view)}
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
                size="14px"
                // style={widthValue === '180px' ? iconStyleMobile : iconStyle}
                color="#FFFFFFB3"
              />
              <Text
                fontSize={['xs', 'sm', '15px']}
                fontWeight="400"
                color="#FFFFFFB3"
              >
                {formatArtistValue(like)}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box
          className={styles.footer}
          display="flex"
          flexDir="row"
          gap="0.5rem"
          justifyContent="center"
          alignItems="center"
          w="100%"
          h="20%"
          pt="1rem"
          px="1rem"
        >
          <Link
            className={styles.btns}
            href={`/artwork/${id}`}
            style={{
              flex: 1,
            }}
          >
            <Box
              h="2.5rem"
              className={styles.textBox}
              w="100%"
              display="flex"
              flexDir="row"
              alignItems="center"
              justifyContent="center"
              gap="5px"
              _hover={{
                textDecoration: 'none',
                cursor: 'pointer',
                background: 'linear-gradient(92deg, #ff58a2 0%, #ff93c3 100%)',
              }}
              // rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
              borderRadius="800px"
              background="linear-gradient(92deg, #FF4195 0%, #FF72B0 100%)"
              padding="0 1rem"
              fontSize="xs"
              fontWeight="600"
              color="white"
              transition="all 0.2s ease-in-out"
            >
              자세히
              <FaArrowRightLong
                style={{
                  // marginLeft: '0.5rem',
                  fontSize: '0.8rem',
                }}
              />
            </Box>
          </Link>
          <Link
            // className={styles.btns}
            href={article_link + id}
            target="_blank"
          >
            <Box
              // className={styles.textBox}
              // w="100%"
              h="2.5rem"
              display="flex"
              flexDir="row"
              alignItems="center"
              justifyContent="center"
              gap="0.5rem"
              _hover={{
                textDecoration: 'none',
                cursor: 'pointer',
                backgroundColor: 'pink.400',
                // color: 'rgba(0, 0, 0, 0.7)',
                background: 'linear-gradient(92deg, #1be073 0%, #83dcb7 100%)',
              }}
              // rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
              borderRadius="800px"
              background="linear-gradient(92deg, #02C75A 0%, #83dcb7 100%)"
              padding="0 1rem"
              color="white"
              transition="all 0.2s ease-in-out"
            >
              <Text
                fontSize="xs"
                fontWeight="600"
                color="white"
                textAlign="center"
              >
                왁물원
              </Text>
              <FaArrowRightLong
                style={{
                  // marginLeft: '0.5rem',
                  fontSize: '0.8rem',
                }}
              />
            </Box>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}
