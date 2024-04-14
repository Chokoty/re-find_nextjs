import { Avatar, Box, Button, Text, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';

import SortTypeIcons from '@/components/ui/IconGroup/SortTypeIcons';
import ViewTypeIcons from '@/components/ui/IconGroup/ViewTypeIcons';
import { darkMode, lightMode } from '@/styles/theme';

interface AuthorProfileCardProps {
  author: SourceAuthor;
  writerURL: string;
  profURL: string;
  nickname: string;
}

export default function AuthorProfileCard({
  author,
  profURL,
  nickname,
}: AuthorProfileCardProps) {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const bg3 = useColorModeValue(lightMode.bg3, darkMode.bg3);

  // const member_link = useResponsiveLink(
  //   writerURL?.split('/').pop() || 'default',
  //   'member'
  // );

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
        borderRadius="lg"
        overflow="hidden"
        p="1rem"
        minW="240px"
        h="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
        w="100%"
      >
        <Box
          display="flex"
          flexDirection={['column', 'row', 'row']}
          justifyContent="center"
          alignItems="center"
          w="100%"
          gap="1rem"
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
          </Box>
        </Box>
        <SortTypeIcons
          sortCriteria={null}
          artist={author}
          component={'inNickname'}
        />
        <ViewTypeIcons
          selectedView={null}
          artist={author}
          component={'inNickname'}
          onSelectViewType={null}
        />
      </Button>
    </NextLink>
  );
}
