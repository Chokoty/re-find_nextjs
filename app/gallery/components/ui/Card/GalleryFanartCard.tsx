import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { FaEye, FaThumbsUp } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import { MdPerson } from 'react-icons/md';

import styles from '@/app/gallery/components/ui/Card/GalleryFanartCard.module.scss';
import { formatArtistValue } from '@/hooks/useFormatArtistValue';
import { useResponsiveLink } from '@/hooks/useResponsiveLink';
import { darkMode, lightMode } from '@/lib/theme';

import RankingBadge from '../RankingBadge';

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

export default function GalleryFanartCard({
  artwork,
  // isFocused,
  // onToggleFocus,
  num,
}: Props) {
  const article_link = useResponsiveLink('', 'article');
  const widthValue = useBreakpointValue({ base: '200px', sm: '249px' });
  const highlight = useColorModeValue(lightMode.highlight, darkMode.highlight);
  const authorName = 'author' in artwork ? artwork.author : '';

  return (
    <Box m="0 1rem" w="100%">
      <Box className={styles.cardContainer} position="relative" w="100%">
        <Box
          position="relative"
          w="100%"
          h={['200px', '230px', '280px', '350px', '400px', '530px']}
        >
          <Image
            src={artwork.img_url}
            alt={artwork.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: 'cover',
              borderRadius: '20px',
            }}
            unoptimized
          />
        </Box>
        <Box
          className={styles.overlay}
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          borderRadius="20px"
          zIndex={1}
          // onClick={() => onToggleFocus(artwork.id)}
          // onMouseEnter={() => onToggleFocus(artwork.id)}
        />
        <Flex
          className={styles.hoverContainer}
          w="100%"
          h="100%"
          position="absolute"
          flexDir="column"
          top={0}
          right={0}
          bottom={0}
          left={0}
          zIndex={2}
          borderRadius="20px"
          border="1px solid rgba(255, 255, 255, 0.70)"
          background="rgba(0, 0, 0, 0.5)"
          color="white"
          // cursor="pointer"
          p={['0.5rem 0', '1rem 0']}
          // onMouseLeave={() => onToggleFocus(null)}
        >
          <Box
            className={styles.body}
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
              {artwork.board.replace(/&#\d+;/g, '').trim()}
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
                  color="#FFFFFFB3"
                  textAlign="center"
                >
                  {artwork?.date?.split(' ')[0].slice(2, -1)}
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
            <NextLink
              className={`${styles.authorBtn} ${styles.btns}`}
              href={`/artists/${authorName}`}
              prefetch={false}
            >
              <Box
                className={styles.textBox}
                w="100%"
                display="flex"
                flexDir="row"
                alignItems="center"
                justifyContent="center"
                gap="4px"
                _hover={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  backgroundColor: 'black',
                  color: 'white',
                }}
                // rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
                borderRadius="800px"
                background="white"
                // padding={['8px 10px', '8px 10px', '8px 10px', '8px 18px']}
                // fontSize={['xs', 'sm', 'md']}
                color="black"
                transition="all 0.2s ease-in-out"
              >
                <MdPerson />
                작가
              </Box>
            </NextLink>
            <NextLink
              className={`${styles.wakBtn} ${styles.btns}`}
              href={article_link + artwork.id}
              target="_blank"
            >
              <Box
                className={styles.textBox}
                w="100%"
                display="flex"
                flexDir="row"
                alignItems="center"
                justifyContent="center"
                gap="10px"
                _hover={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  backgroundColor: 'pink.400',
                  color: 'rgba(0, 0, 0, 0.7)',
                }}
                // rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
                borderRadius="800px"
                background="linear-gradient(92deg, #FF4195 0%, #FF72B0 100%)"
                // padding={['8px 10px', '8px 10px', '8px 10px', '8px 18px']}
                // fontSize={['xs', 'sm', 'md']}
                color="white"
                transition="all 0.2s ease-in-out"
              >
                왁물원<span>에서 보기</span>
                <FaArrowRightLong />
              </Box>
            </NextLink>
          </Box>
        </Flex>
        {num !== -1 && <RankingBadge num={num} />}
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
            _hover={{
              color: highlight,
            }}
          >
            작가: {authorName}
          </Text>
        </NextLink>
      </Box>
    </Box>
  );
}
