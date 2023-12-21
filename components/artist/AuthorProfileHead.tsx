import {
  Avatar,
  Box,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
// import Image from 'next/image';
import React, { useState } from 'react';
import { ImLink } from 'react-icons/im';

import SortTypeIcons from '@/components/artist/SortTypeIcons';
import ViewTypeIcons from '@/components/artist/ViewTypeIcons';
import { sortTypes, viewTypes } from '@/data/artists';
import { useResponsiveLink } from '@/hook/useResponsiveLink';

interface AuthorProfileHeadProps {
  nickname: string;
  profile: any;
}

const AuthorProfileHead: React.FC<AuthorProfileHeadProps> = ({
  nickname,
  profile,
}) => {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);

  // 구독 toast 버튼
  const handleSubscribe = () => {
    toast({
      title: 'Alert',
      description: '구독기능은 아직 준비중입니다.',
      duration: 2000,
      isClosable: true,
    });
  };

  const member_link = useResponsiveLink(
    profile?.author_url.split('/').pop(),
    'member'
  );
  const article_link = useResponsiveLink('', 'article');
  // console.log(profile?.author_prof_url);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleCopyLink = () => {
    // 복사하려는 링크를 여기에 입력하세요.
    const linkToCopy = `https://re-find.xyz/artists/${encodeURIComponent(
      profile?.author_nickname
    )}`;
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({
        title: '프로필 링크 복사됨',
        description: '링크가 클립보드에 복사되었습니다.',
        // status: 'success',
        duration: 1500,
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
      <Box>
        <Popover isOpen={isOpen} onClose={handleToggle}>
          <PopoverTrigger>
            <Avatar
              w="120px"
              h="120px"
              name={profile?.author_nickname}
              src={profile?.author_prof_url}
              m="0.5rem 0"
              onClick={handleToggle}
              cursor="pointer"
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              p="1rem"
            >
              <Text fontSize="lg" fontWeight="bold" mb="0.5rem">
                좋아요, 댓글 부탁드려요!
              </Text>
              <Text fontSize="md" fontWeight="light" textAlign="center">
                작가님들에게 큰 힘이 됩니다 킹아!
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>

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
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        m="1rem 0.5rem"
        gap="1rem"
      >
        <Box as="button">
          <Text fontWeight="600">작품 수 {profile?.num_artworks}개</Text>
        </Box>
        <SortTypeIcons
          sortCriteria={null}
          sortTypes={sortTypes}
          artist={profile}
          component={'inNickname'}
        />
        <ViewTypeIcons
          sortCriteria={null}
          viewTypes={viewTypes}
          artist={profile}
          component={'inNickname'}
        />
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
          className="link-to-wakzoo-from-profile"
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
          // onClick={() => {
          //   window.open(member_link, '_blank');
          // }}
          onClick={handleSubscribe}
        >
          + 구독
        </Button>
      </Flex>
    </Flex>
  );
};

export default AuthorProfileHead;
