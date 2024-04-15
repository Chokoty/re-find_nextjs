import {
  Box,
  Heading,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

import UpdateCardList from '@/app/(home)/components/Upload/UpdateCardList';
import { darkMode, lightMode } from '@/lib/theme';

export default function UpdateBoard() {
  const color = useColorModeValue(lightMode.color, darkMode.color);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const bg = useColorModeValue(lightMode.bg, darkMode.bg);
  const width = useBreakpointValue({ base: '90%', md: '100%' });

  return (
    <Box
      className="update-info"
      m="0 auto"
      // mt="1rem"
      mb="1rem"
      display="grid"
      alignItems="center"
      placeItems="center"
      w={width}
      maxW="700px"
      background={bg2}
      borderRadius="1rem"
      boxShadow="0 8px 20px 0 rgba(0,0,0,.08)"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        w="90%"
        p="2rem 0 1rem"
        borderBottom="1px solid"
        borderColor={bg}
      >
        <Heading
          as="h2"
          size="md"
          color={color}
          textAlign="left"
          w="100%"
          // pl="1em"
        >
          게시판 업데이트 현황
        </Heading>
      </Box>
      <UpdateCardList />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        placeItems="center"
        w="100%"
        p="1em"
      >
        <Text whiteSpace="normal">
          명시된 게시판에 있는 원본만 찾을 수 있습니다.
        </Text>
      </Box>
    </Box>
  );
}
