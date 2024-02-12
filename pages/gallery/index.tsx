import {
  Box,
  Button,
  flexbox,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

import AlbumGrid from '@/components/artwork/albumGrid';
import MemberButtonList from '@/components/artwork/MemberButtonList';
import GalleryAlbum from '@/components/card/GalleryAlbum';
import GalleryCard from '@/components/card/GalleryCard';
import PageTitleIndex from '@/components/common/PageTitleIndex';
import gallery from '@/data/gallery';
import members from '@/data/members';
import { useStore } from '@/store/store';
import { darkMode, lightMode } from '@/styles/theme';

const Artworks = () => {
  const router = useRouter();

  const setIsOpen = useStore((state) => state.setIsOpen);

  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);

  useEffect(() => {
    setIsOpen(false);
    // alert('오픈 예정입니다.');
  }, []);

  useEffect(() => {
    // 현재 경로가 'gallery' 페이지인지 확인
    if (
      router.pathname === '/gallery' &&
      Object.keys(router.query).length > 0
    ) {
      // 쿼리 파라미터가 있는 경우, 쿼리 파라미터를 제거하고 URL을 업데이트
      router.replace(
        {
          pathname: router.pathname,
          query: {}, // 쿼리 파라미터를 비웁니다.
        },
        undefined,
        { shallow: true }
      );
    }
  }, [router]);

  const topTitle = {
    // title: '팬아트 갤러리',
    description: '왁물원에 올라온 모든 팬아트들을 이 곳에서 찾아보세요!',
  };

  const backgroundImageUrl =
    '/static/images/크리스마스커버일러스트_1920x1080.jpg'; // 배경 이미지 URL

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    // backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0)), url(${backgroundImageUrl})`,

    // backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '100% 100%',
  };

  const callButton = (text) => (
    <Button borderRadius="2rem" mr="0.5rem" opacity="0.7">
      <Text>{text}</Text>
    </Button>
  ); // 버튼 호출 함수

  return (
    <Box
      p="1rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      w="100%"
    >
      <Box w="100%" h="100%" style={backgroundStyle}></Box>
      <PageTitleIndex topTitle={topTitle} />

      <Box w="100%" h="800px" ml="6rem">
        <Box display="flex">
          <Text textAlign="left" fontWeight="bold" fontSize="40px" mr="1rem">
            이 주의 왁물원 인기 팬아트!
          </Text>
          <MdOutlineArrowForwardIos
            style={{
              width: '2rem',
              height: '2rem',
              marginTop: '1rem',
            }}
          />
        </Box>

        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          mt="2rem"
        >
          {callButton('전체')}
          {callButton('이세계아이돌')}
          {callButton('고정멤버')}
          {callButton('불법 배경')}
          {callButton('우왁굳')}
          {callButton('금손 작가들의 방')}
        </Box>
        {/* 버튼 */}

        <Box display="flex" alignItems="center" gap="20px" mt="2rem">
          <GalleryCard
            writerURL="12312"
            profURL="asdf"
            nickname="nickname"
            board={['board1', 'board2', 'board3']}
          />
          <GalleryCard
            writerURL="12312"
            profURL="asdf"
            nickname="nickname"
            board={['board1', 'board2', 'board3']}
          />
          <GalleryCard
            writerURL="12312"
            profURL="asdf"
            nickname="nickname"
            board={['board1', 'board2', 'board3']}
          />
          <GalleryCard
            writerURL="12312"
            profURL="asdf"
            nickname="nickname"
            board={['board1', 'board2', 'board3']}
          />
          <GalleryCard
            writerURL="12312"
            profURL="asdf"
            nickname="nickname"
            board={['board1', 'board2', 'board3']}
          />
        </Box>
        {/* 사진들 */}
      </Box>

      <Box w="100%" h="800px" ml="6rem" mt="8rem">
        <Box display="flex">
          <Text textAlign="left" fontWeight="bold" fontSize="40px" mr="1rem">
            리파인드 인기 앨범
          </Text>
          <MdOutlineArrowForwardIos
            style={{
              width: '2rem',
              height: '2rem',
              marginTop: '1rem',
            }}
          />
        </Box>

        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          mt="2rem"
        >
          {callButton('전체')}
          {callButton('이세계아이돌')}
          {callButton('고정멤버')}
          {callButton('불법 배경')}
          {callButton('우왁굳')}
          {callButton('금손 작가들의 방')}
        </Box>
        {/* 버튼 */}

        <Box display="flex" alignItems="center" gap="20px" mt="2rem">
          <GalleryAlbum
            writerURL="12312"
            profURL="asdf"
            nickname="nickname"
            board={['board1', 'board2', 'board3']}
          />
          <GalleryAlbum
            writerURL="12312"
            profURL="asdf"
            nickname="nickname"
            board={['board1', 'board2', 'board3']}
          />
          <GalleryAlbum
            writerURL="12312"
            profURL="asdf"
            nickname="nickname"
            board={['board1', 'board2', 'board3']}
          />
          <GalleryAlbum
            writerURL="12312"
            profURL="asdf"
            nickname="nickname"
            board={['board1', 'board2', 'board3']}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Artworks;
