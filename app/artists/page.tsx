import { Box } from '@chakra-ui/react';

import Artists from '@/components/artist/Artists';
import PageTitle from '@/components/common/PageTitle';

const topTitle = {
  title: '왁타버스 작가',
  description: '왁물원에서 활동중인 작가님의 작품을 모아서 볼 수 있어요',
};

export default function ArtistsPage() {
  // const bg = useColorModeValue(lightMode.bg, darkMode.bg);

  return (
    <Box
      mt="10px"
      mb="10px"
      p="1rem"
      textAlign="center"
      w="100%"
      // backgroundColor={bg}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <PageTitle topTitle={topTitle} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt="3rem"
        w="100%"
        maxW="1024px"
        gap="1rem"
      >
        <Artists />
      </Box>
    </Box>
  );
}
