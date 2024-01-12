import { Avatar, Box, Button, Text, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';

import { useResponsiveLink } from '@/hook/useResponsiveLink';
import { darkMode, lightMode } from '@/styles/theme';

interface AuthorProfileCardProps {
  writerURL: string;
  profURL: string;
  nickname: string;
  board: string;
}

const AuthorProfileCard2: React.FC<AuthorProfileCardProps> = ({
  writerURL,
  profURL,
  nickname,
  board,
}) => {
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

  const member_link = useResponsiveLink(writerURL.split('/').pop(), 'member');

  return (
    // <Link
    //   className="link-to-wakzoo"
    //   href={writerURL === '' ? '#' : member_link}
    //   // passHref
    //   isExternal
    // >
    <NextLink
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
      href={`/artists/${nickname}`}
    >
      <Button
        as="a"
        target="_blank"
        color={'#f5f5f5'}
        boxShadow="md"
        // maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p="10px"
        minW="240px"
        h="160px"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
        w="100%"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="0.5rem"
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
          <Text fontSize="md" textAlign="center" color={highlightColor}>
            {nickname || '프로필은 왁물원에서'}
          </Text>
        </Box>
        {/* <Text
          fontSize="md"
          textAlign="center"
          color={color2}
          px="2"
          py="1"
          rounded="full"
          bg={highlightColor2}
        >
          {board || '---'}
        </Text> */}
      </Button>
    </NextLink>
    // </Link>
  );
};

export default AuthorProfileCard2;