import {
  Box,
  Skeleton,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

import { darkMode, lightMode } from '@/styles/theme';

export default function UploadImageSkeleton() {
  const width = useBreakpointValue({ base: '90%', md: '100%' });
  const bgColor = useColorModeValue(lightMode.bg2, darkMode.bg2);
  return (
    <Box
      maxW="700px"
      w={width}
      background={bgColor}
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
