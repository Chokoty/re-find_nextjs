import React from 'react';
import Image from 'next/image';

import {
  Text,
  Box,
  Avatar,
  Button,
  Flex,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { ImLink } from 'react-icons/im';

import { useResponsiveLink } from '../hook/useResponsiveLink';

const AuthorProfileHead = ({ nickname, profile }) => {
  const toast = useToast();

  const member_link = useResponsiveLink(
    profile?.author_url.split('/').pop(),
    'member'
  );
  const article_link = useResponsiveLink('', 'article');
  // console.log(profile?.author_prof_url);

  const handleCopyLink = () => {
    // const linkToCopy = `https://re-find.xyz/artists/${profile?.author_nickname}`;
    const linkToCopy = `https://re-find.xyz/artists/${encodeURIComponent(
      profile?.author_nickname
    )}`;
    // 복사하려는 링크를 여기에 입력하세요.

    navigator.clipboard.writeText(linkToCopy).then(() => {
      toast({
        title: '프로필 링크 복사됨',
        description: '링크가 클립보드에 복사되었습니다.',
        // status: 'success',
        duration: 3000,
        isClosable: true,
      });
    });
  };
  return (
    <Flex // 상단 프로필 정보
      flexDirection="column"
      alignItems="center"
      // width="656px" - 모바일 버그 주범....
      // maxW="656px"
      pt="10px"
    >
      <Avatar
        w="120px"
        h="120px"
        name={profile?.author_nickname}
        src={profile?.author_prof_url}
        m="0.5rem 0"
      />
      <Text fontSize="4xl" fontWeight="bold" m="8px 0" pl="2rem">
        {nickname}
        <Tooltip label="프로필 공유">
          <Button
            w="3rem"
            h="3rem"
            variant="ghost"
            borderRadius="full"
            p="0"
            onClick={handleCopyLink}
          >
            <ImLink />
          </Button>
        </Tooltip>
      </Text>

      <Flex // 작품 수, 팔로워, 팔로잉
        flexDirection="row"
        alignItems="center"
        m="8px 0"
      >
        <Box as="button">
          <Text fontWeight="600">작품 수 {profile?.num_artworks}개</Text>
        </Box>
        {/* <Text fontSize="14px" fontWeight="400" p="0 4px">
    ·
  </Text>
  <Box as="button">
    <Text fontWeight="600">팔로워 120명</Text>
  </Box>
  <Text fontSize="14px" fontWeight="400" p="0 4px">
    ·
  </Text>
  <Box as="button">
    <Text fontWeight="600">팔로잉 13명</Text>
  </Box> */}
      </Flex>
      <Flex // 왁물원, 팔로우 버튼
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        w="100%"
        ml="2rem"
        m="8px 0"
        mb="2rem"
      >
        <Button
          colorScheme="gray"
          borderRadius="full"
          m="0 0.5rem"
          h="48px"
          onClick={() => {
            window.open(member_link, '_blank');
          }}
        >
          왁물원
        </Button>
        <Button
          colorScheme="green"
          borderRadius="full"
          m="0 0.5rem"
          h="48px"
          onClick={() => {
            window.open(member_link, '_blank');
          }}
        >
          + 구독
        </Button>
      </Flex>
    </Flex>
  );
};

export default AuthorProfileHead;
