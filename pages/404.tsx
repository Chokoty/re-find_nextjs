import { Box, Heading } from '@chakra-ui/react';
import Image from 'next/image';

export default function Custom404() {
  return (
    <Box
      m="0 auto"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="80vh"
      width="80%"
    >
      <Heading as="h1" size="md" mb="20px">
        404 - Page Not Found
      </Heading>

      <Image
        src="/static/images/404/404-박쥐단.gif"
        alt="404-박쥐단"
        width={400}
        height={400}
        unoptimized
      />
    </Box>
  );
}
