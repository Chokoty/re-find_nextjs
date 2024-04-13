import { Box, Skeleton } from '@chakra-ui/react';

import styles from '@/styles/GalleryAlbumSliderSkeleton.module.scss';

export default function GalleryAlbumSliderSkeleton() {
  return (
    <Box
      className={styles.container}
      display="flex"
      flexDir="row"
      gap="20px"
      padding="0 2rem"
      w="100%"
    >
      <GalleryAlbumSkeleton />
      <GalleryAlbumSkeleton />
      <GalleryAlbumSkeleton />
    </Box>
  );
}

const GalleryAlbumSkeleton = () => {
  return (
    <Skeleton
      className={styles.skeleton}
      borderRadius="1rem"
      w="100%"
      h={['200px', '230px', '280px', '350px', '400px']}
    />
  );
};
