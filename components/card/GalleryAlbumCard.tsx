import { Box, Text, useColorMode } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';

import { getStaticImage } from '@/lib/getStaticImage';
import styles from '@/styles/GalleryAlbumCard.module.scss';
import type { Gallery } from '@/types';

type Prop = {
  album: Gallery;
};

const getBadgeText = ({
  badgeValue,
  badgeType,
}: {
  badgeValue: string;
  badgeType: string;
}) => {
  if (badgeType === 'special') {
    if (badgeValue === 'isdPick') {
      return '이세돌픽';
    }
    return '특집 팬아트';
  }
  // badgeType === 'keyword'
  return '추천 키워드';
};

export default function GalleryAlbumCard({
  album: { title, value, description, type },
}: Prop) {
  const staticImage = getStaticImage(value);
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const imageBackgroundShadow = isDarkMode
    ? 'linear-gradient(180deg, hsla(0, 0%, 7%, .8), hsla(0, 0%, 7%, .4) 0%, hsla(0, 0%, 7%, 0) 0%, hsla(0, 0%, 7%, 0%) 12.23%, hsla(0, 0%, 7%, .64) 86.23%, #121212 101.07% )'
    : 'linear-gradient(180deg, hsla(0, 0%, 7%, .8), hsla(0, 0%, 7%, .4) 0%, hsla(0, 0%, 7%, 0) 0%, hsla(0, 0%, 7%, 0%) 47.23%, hsla(0, 0%, 7%, .64) 100.23%, #121212 100.07%)';
  return (
    <Box
      position="relative"
      w="100%"
      transition=" all 0.2s ease-in-out"
      className={styles.cardWrapper}
    >
      {/* TODO: 수정 필요 */}
      <Link href={`/gallery/${value}`} prefetch={false}>
        <Box
          position="relative"
          w="100%"
          h={['200px', '230px', '280px', '350px', '400px']}
        >
          <Image
            src={staticImage}
            alt={title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: 'cover',
              borderRadius: '1rem', // 10px;
            }}
            unoptimized
          />
        </Box>
        <Box
          className={styles.overlay}
          w="100%"
          h="100%"
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          borderRadius="1rem"
          zIndex={1}
          background={imageBackgroundShadow}
          display="flex"
          flexDir="column"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <Box
            className={styles.recommendationBox}
            display="flex"
            justify-content="center"
            align-items="center"
            padding="12px 16px"
            borderRadius="10px"
            background="rgba(0, 0, 0, 0.40)"
          >
            <Text fontWeight="400" fontSize="14px" color="white">
              {getBadgeText({ badgeType: type, badgeValue: value })}
            </Text>
          </Box>
          <Box
            w="100%"
            display="flex"
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
            className={styles.textBoxWrapper}
          >
            <Box className={styles.textBox}>
              <Text className={styles.title}>{title}</Text>
              <Text className={styles.description}>{description}</Text>
            </Box>
            <FaArrowRightLong size={40} color="white" />
          </Box>
        </Box>
      </Link>
    </Box>
  );
}
