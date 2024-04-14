import {
  Avatar,
  Button,
  Flex,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

import { useResponsiveLink } from '@/hook/useResponsiveLink';
import { darkMode, lightMode } from '@/styles/theme';

interface Props {
  writerURL: string;
  profURL: string;
  nickname: string;
  board: string[];
}

export default function DeveloperProfileCard({
  writerURL,
  profURL,
  nickname,
  board,
}: Props) {
  const color2 = useColorModeValue(lightMode.color2, darkMode.color2);
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  const highlightColor2 = useColorModeValue(
    lightMode.highlight2,
    darkMode.highlight2
  );

  const member_link = useResponsiveLink(
    writerURL.split('/').pop() || 'default',
    'member'
  );

  return (
    <Link
      // w="100%"
      className="link-to-wakzoo"
      href={writerURL === '' ? '#' : member_link}
      isExternal
    >
      <Button
        _hover={{ textDecoration: 'none' }}
        color={'#f5f5f5'}
        boxShadow="base"
        maxW="sm"
        borderRadius="1rem"
        overflow="hidden"
        p="1.5rem"
        width="100%"
        height="120px"
        display="flex"
        justifyContent="space-between"
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
              backgroundColor: '#ffffff',
            }}
          >
            <Image
              src={
                profURL ||
                'https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_profile_363.png'
              }
              alt={nickname}
              fill={true}
              unoptimized
            />
          </div>
        )}
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          gap="10px"
          w="12rem"
        >
          <Text
            fontSize="md"
            textAlign="center"
            mb="0.5rem"
            pl="0.5rem"
            color={highlightColor}
          >
            {nickname || '프로필은 왁물원에서'}
          </Text>
          <Flex gap="2" wrap="wrap">
            {board.map((item, index) => (
              <Text
                key={index}
                fontSize="sm"
                textAlign="center"
                color={color2}
                px="2"
                py="1"
                rounded="full"
                bg={highlightColor2}
              >
                {item || '---'}
              </Text>
            ))}
          </Flex>
        </Flex>
      </Button>
    </Link>
  );
}
