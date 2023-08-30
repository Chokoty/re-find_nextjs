import React from 'react';
import Image from 'next/image';

import { Avatar, Text, Button, Highlight } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';

import { lightMode, darkMode } from '@/styles/theme';

const AuthorProfileCard = ({ writerURL, profURL, nickname, board }) => {
  const color = useColorModeValue(lightMode.color, darkMode.color);
  const color2 = useColorModeValue(lightMode.color2, darkMode.color2);
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  const highlightColor2 = useColorModeValue(
    lightMode.highlight2,
    darkMode.highlight2
  );

  return (
    <Button
      href={writerURL === '' ? '#' : writerURL}
      as="a"
      target="_blank"
      color={'#f5f5f5'}
      boxShadow="md"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="10px"
      width="240px"
      height="240px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="10px"
    >
      {profURL === 'NULL' ? (
        <Avatar size="xl" name={nickname} src={profURL || ''} />
      ) : (
        <div
          style={{
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'relative',
            width: 96,
            height: 96,
          }}
        >
          <Image src={profURL} alt={nickname} fill="object-fit" unoptimized />
        </div>
      )}

      {/* <Avatar size="xl" name={nickname} src={profURL || ""} /> */}
      <Text fontSize="md" textAlign="center" mb="12px" color={highlightColor}>
        {nickname || '작가님 프로필은'}
      </Text>
      <Text
        fontSize="md"
        textAlign="center"
        color={color2}
        px="2"
        py="1"
        rounded="full"
        bg={highlightColor2}
      >
        {board || '카페에서 확인해주세요'}
      </Text>
    </Button>
  );
};

export default AuthorProfileCard;
