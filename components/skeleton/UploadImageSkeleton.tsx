import { Box, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';

export default function UploadImageSkeleton() {
  const width = useBreakpointValue({ base: '90%', md: '100%' });
  return (
    <Box
      maxW="700px"
      w={width}
      background="gray.700"
      borderRadius="1rem"
      m="1rem 0"
      p="1rem 0"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Skeleton maxW="500px" w="100%" height="156px" />
    </Box>
  );
}
