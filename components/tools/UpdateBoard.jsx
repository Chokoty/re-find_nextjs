import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Heading,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

import UpdateCard from '@/components/cards/UpdateCard';
import { darkMode, lightMode } from '@/styles/theme';

const UpdateBoard = ({ last_update_info }) => {
  const color = useColorModeValue(lightMode.color, darkMode.color);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const bg = useColorModeValue(lightMode.bg, darkMode.bg);
  const width = useBreakpointValue({ base: '90%', md: '100%' });

  return (
    <Box
      className="update-info"
      m="3em 0 1rem 0"
      display="grid"
      alignItems="center"
      placeItems="center"
      w={width}
      maxW="700px"
      background={bg2}
      borderRadius="1rem"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        w="100%"
        p="1em 0"
        borderBottom="1px solid"
        borderColor={bg}
      >
        <Heading
          as="h2"
          size="md"
          color={color}
          textAlign="left"
          w="100%"
          pl="1em"
        >
          게시판 업데이트 현황
        </Heading>
      </Box>
      {last_update_info?.map((update, index) => (
        <UpdateCard key={index} update={update} />
      ))}
      {last_update_info === null ||
        (last_update_info?.length === 0 && (
          <Alert status="error" w="90%" borderRadius="1rem">
            <AlertIcon />
            <AlertTitle></AlertTitle>
            <AlertDescription>
              현재 서버와의 연결이 불안정합니다! 이용에 불편을 드려 죄송합니다.
              빠른 시일 내에 해결하겠습니다.
            </AlertDescription>
          </Alert>
        ))}
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
};

export default UpdateBoard;
