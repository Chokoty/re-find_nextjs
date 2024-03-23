import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';

import styles from '@/styles/GalleryAlbumCard.module.scss';

type Prop = {
  artwork: ArtworkList | GalleryArtworkList;
};

// TODO: artwork 로컬에서 받고? title, description 커스텀마이징
export default function GalleryAlbumCard({ artwork }: Prop) {
  return (
    <Box
      position="relative"
      w="100%"
      transition=" all 0.2s ease-in-out"
      _hover={{
        transform: 'scale(1.07)',
      }}
    >
      {/* TODO: 수정 필요 */}
      <Link href={`/gallery/${artwork.id}`}>
        <Box
          position="relative"
          w="100%"
          h={['200px', '230px', '280px', '350px', '400px']}
        >
          <Image
            src={artwork.img_url}
            alt="test"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: 'cover',
              borderRadius: '1rem', // 10px;
            }}
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
          background="linear-gradient(
          180deg,
          hsla(0, 0%, 7%, .8),
          hsla(0, 0%, 7%, .4) 0%,
          hsla(0, 0%, 7%, 0) 0%,
          hsla(0, 0%, 7%, 0%) 12.23%,
          hsla(0, 0%, 7%, .64) 86.23%,
          #121212 101.07%
        )"
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
              리파인드 추천
            </Text>
          </Box>
          <Box
            w="100%"
            display="flex"
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box className={styles.textBox}>
              <Text className={styles.title}>{`${artwork.title}`}</Text>
              <Text className={styles.description}>
                이세돌과 함께 메리 크리스마스!
              </Text>
            </Box>
            <FaArrowRightLong size={40} color="white" />
          </Box>
        </Box>
      </Link>
    </Box>
  );
}
