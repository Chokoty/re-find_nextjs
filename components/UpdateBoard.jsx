import React, { useState } from 'react';
import {
  Heading,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { lightMode, darkMode } from '@/styles/theme';

import UpdateCard from './UpdateCard';

const UpdateBoard = ({ last_update_info }) => {
  const color = useColorModeValue(lightMode.color, darkMode.color);

  return (
    <Box
      className="update-info"
      mt="3em"
      mb="6em"
      display="grid"
      alignItems="center"
      placeItems="center"
      gridGap="1em"
      gap="1em"
      w="100%"
      // display: "flex", -> ios14 아래 지원 안됨
      // flexDirection: "column",
      // justifyContent: "center",
    >
      <Heading
        as="h1"
        size="md"
        mb="20px"
        textTransform="uppercase"
        color={color}
      >
        현재 아래 게시글까지 반영되었어요!
      </Heading>
      {last_update_info?.map((update, index) => (
        <UpdateCard key={index} update={update} />
      ))}
      {last_update_info === null || last_update_info?.length === 0 ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle></AlertTitle>
          <AlertDescription>
            현재 서버와의 연결이 불안정합니다! 이용에 불편을 드려 죄송합니다.
            빠른 시일 내에 해결하겠습니다.
          </AlertDescription>
        </Alert>
      ) : null}
      <Text whiteSpace="normal">
        명시된 게시판에 있는 원본만 찾을 수 있습니다.
      </Text>
    </Box>
  );
};

export default UpdateBoard;
