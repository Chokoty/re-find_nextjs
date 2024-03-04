import { Box, Flex, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';

import UpdateLog from '@/components/common/UpdateLog';

type Prop = {
  width: string;
};

const UpdateLogBoard = ({ width }: Prop) => {
  // const color = useColorModeValue(lightMode.color, darkMode.color);

  return (
    <Box
      w={width}
      mb="2rem"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      m="0 auto"
    >
      <NextLink href="/more/notice" legacyBehavior style={{ width: '100%' }}>
        <Flex
          w="100%"
          maxW="608px"
          flexDir="row"
          justifyContent="space-between"
          alignItems="center"
          mt="2rem"
          mb="1rem"
          cursor="pointer"
        >
          <Heading size="md">공지사항</Heading>
          {/* <Text fontSize="md">더보기</Text> */}
          <Box
            h="2rem"
            w="2rem"
            borderRadius="50%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            // border="1px solid #828282"
          >
            <IoIosArrowForward size="1rem" />
          </Box>
        </Flex>
      </NextLink>
      <UpdateLog count={2} />
    </Box>
  );
};

export default UpdateLogBoard;
