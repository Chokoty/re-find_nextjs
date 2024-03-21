import {
  Box,
  Skeleton,
  SkeletonCircle,
  useBreakpointValue,
} from '@chakra-ui/react';

export default function BannerSkeleton() {
  const width = useBreakpointValue({ base: '90%', md: '100%' });

  return (
    <Box
      maxW="700px"
      w={width}
      h="170px"
      mb="1rem"
      p="1rem"
      background="gray.700"
      borderRadius="1rem"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      gap="1rem"
    >
      <Skeleton w="97%" height="100px" borderRadius="1rem" />
      <Box display="flex" gap="8px" justifyContent="center" alignItems="center">
        <SkeletonCircle size="3" />
        <SkeletonCircle size="3" />
        <SkeletonCircle size="3" />
      </Box>
    </Box>
  );
}
