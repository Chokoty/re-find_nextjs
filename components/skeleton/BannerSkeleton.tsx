import { Box, Skeleton, useBreakpointValue } from '@chakra-ui/react';

export default function BannerSkeleton() {
  const width = useBreakpointValue({ base: '90%', md: '100%' });

  return (
    <Box
      maxW="700px"
      mb="1rem"
      w={width}
      background="gray.700"
      borderRadius="1rem"
    >
      <Skeleton height="170px" />
    </Box>
  );
}
