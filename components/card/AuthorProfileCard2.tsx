import {
  Avatar,
  Badge,
  Box,
  Button,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';

import { useResponsiveLink } from '@/hook/useResponsiveLink';
import { darkMode, lightMode } from '@/styles/theme';

interface AuthorProfileCardProps {
  writerURL: string;
  profURL: string;
  nickname: string;
  uploadTimeDiff: string;
}

const AuthorProfileCard2: React.FC<AuthorProfileCardProps> = ({
  writerURL,
  profURL,
  nickname,
  uploadTimeDiff,
}) => {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const bg3 = useColorModeValue(lightMode.bg3, darkMode.bg3);
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

  const member_link = useResponsiveLink(writerURL?.split('/').pop(), 'member');

  return (
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
        backgroundColor={bg2}
        _hover={{
          backgroundColor: bg3,
        }}
        as="a"
        target="_blank"
        // color={'#f5f5f5'}
        // boxShadow="md"
        // borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p="1rem"
        minW="240px"
        h={['200px', '140px', '140px']}
        display="flex"
        flexDirection={['column', 'row', 'row']}
        justifyContent="center"
        alignItems="center"
        gap="1rem"
        w="100%"
      >
        {profURL === 'NULL' ? (
          <Avatar size="lg" name={nickname} src={profURL || ''} />
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
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="0.5rem"
        >
          <Text fontSize="lg" textAlign="center">
            {nickname || '프로필은 왁물원에서'}
          </Text>
          {/* <Badge
            variant="subtle"
            colorScheme="green"
            borderRadius="6px"
            p="0 0.5rem"
            h="2rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box w="1rem" h="1rem" mr="0.3rem">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Box>
            <Text fontSize="lg" textAlign="center" color={color}>
              {uploadTimeDiff}
            </Text>
          </Badge> */}
        </Box>
      </Button>
    </NextLink>
  );
};

export default AuthorProfileCard2;
