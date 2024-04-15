import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';

import styles from '@/app/gallery/components/Skeleton/GalleryFanartSliderSkeleton.module.scss';

export default function GalleryFanartSliderSkeleton() {
  return (
    <Box
      className={styles.container}
      display="flex"
      flexDir="row"
      gap="20px"
      padding="0 2rem"
      w="100%"
    >
      <GalleryFanartSkeleton />
      <GalleryFanartSkeleton />
      <GalleryFanartSkeleton />
      <GalleryFanartSkeleton />
    </Box>
  );
}

const GalleryFanartSkeleton = () => {
  return (
    <Box className={styles.skeleton} w="100%">
      <Skeleton
        borderRadius="1rem"
        w="100%"
        h={['200px', '230px', '280px', '350px', '400px', '530px']}
      />
      <SkeletonText
        width="100%"
        mt="4"
        noOfLines={2}
        spacing="4"
        skeletonHeight="3"
      />
    </Box>
  );
};
