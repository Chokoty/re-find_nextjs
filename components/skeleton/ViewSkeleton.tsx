import { Box, SimpleGrid, Skeleton, SkeletonText } from '@chakra-ui/react';

import styles from '@/components/Skeleton/ViewSkeleton.module.scss';

type Prop = {
  view: string;
};

export default function ViewSkeleton({ view }: Prop) {
  if (view === 'masonry') {
    return (
      <div className={styles.box}>
        {Array.from({ length: 15 }, (_, index) => (
          <div className={styles.item} key={index}>
            <Skeleton height="236px" overflow="hidden" borderRadius="1rem" />
            <SkeletonText
              mt="2" // 0.5rem
              noOfLines={2}
              spacing="2"
              skeletonHeight="5"
            />
          </div>
        ))}
      </div>
    );
  }

  // grid
  return (
    <Box
      w="94%"
      m="0 auto"
      mt="1rem"
      mb="2rem"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <SimpleGrid
        w={['100%', '90%']}
        minChildWidth={['170px', '236px']} // 모바일에서는 150px, 그 외에서는 252px
        spacing={['0.5rem', '0.75rem']}
        justifyContent="center"
        alignItems="center"
        placeItems="center"
        m="0 auto"
      >
        {Array.from({ length: 15 }, (_, index) => (
          <Box w="100%" key={index}>
            <Skeleton
              // m={['0', '0 0.5rem']}
              mb="0.5rem"
              w={['170px', '236px']}
              h={['120px', '157px']}
              overflow="hidden"
              borderRadius="1rem"
            />
            <Box w="90%">
              <SkeletonText
                mt="1" // 0.5rem
                noOfLines={2}
                spacing="1"
                skeletonHeight="5"
                borderRadius="1rem"
              />
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
