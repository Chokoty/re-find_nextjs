import { Box, flexbox, useColorModeValue, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import AlbumGrid from '@/components/artwork/albumGrid';
import MemberButtonList from '@/components/artwork/MemberButtonList';
import PageTitleIndex from '@/components/common/PageTitleIndex';
import gallery from '@/data/gallery';
import members from '@/data/members';
import { useStore } from '@/store/store';
import { darkMode, lightMode } from '@/styles/theme';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import GalleryCard from '@/components/card/GalleryCard';

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



      <Box 
        w = "100%"
        h = "800px"
        ml ="6rem"
      >
        
        <Box display="flex">
          <Text 
            textAlign="left"
            fontWeight="bold"
            fontSize="40px"
            mr="1rem"
          >
              이 주의 왁물원 인기 팬아트!
          </Text>
          <MdOutlineArrowForwardIos 
            style={{
              width:"2rem",
              height:"2rem",
              marginTop:"1rem"
            }}
          />
        </Box>
  
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          mt="2rem"
        > 
          <Button 
          borderRadius="2rem"
          mr="0.5rem"
          opacity="0.7" 
          >
            <Text>
              전체
            </Text>
          </Button>
          
          <Button 
          borderRadius="2rem" 
          mr="0.5rem"
          opacity="0.7" 
          >
            이세계아이돌
          </Button>
          
          <Button 
          borderRadius="2rem" 
          mr="0.5rem"
          opacity="0.7" 
          >
            고정멤버
          </Button>
          <Button 
          borderRadius="2rem" 
          mr="0.5rem"
          opacity="0.7" 
          >
            불법배경
          </Button>
          <Button 
          borderRadius="2rem" 
          mr="0.5rem"
          opacity="0.7" 
          >
            우왁굳
          </Button>
          <Button 
          borderRadius="2rem" 
          mr="0.5rem"
          opacity="0.7" 
          >
            금손 작가들의 방
          </Button>
        </Box>

        <Box display="flex" alignItems="center" gap="20px" mt="2rem">
          <GalleryCard
              writerURL="12312"
              profURL="asdf"
              nickname="nickname"
              board={["board1", "board2", "board3"]}
            />
            <GalleryCard
              writerURL="12312"
              profURL="asdf"
              nickname="nickname"
              board={["board1", "board2", "board3"]}
            />
            <GalleryCard
              writerURL="12312"
              profURL="asdf"
              nickname="nickname"
              board={["board1", "board2", "board3"]}
            />
            <GalleryCard
              writerURL="12312"
              profURL="asdf"
              nickname="nickname"
              board={["board1", "board2", "board3"]}
            />
            <GalleryCard
              writerURL="12312"
              profURL="asdf"
              nickname="nickname"
              board={["board1", "board2", "board3"]}
            />
        </Box>

      </Box>


      <Box
        // m="1.5rem 1rem"
        mt="5rem"
        p="0 1rem"
        background={bg2}
        borderRadius="1rem"
        w="95%"
        h="80px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <MemberButtonList
          members={members}
          type="link"
          range={{ start: 0, end: 7 }}
          selected={null}
          setSelected={null}
          isdPick={false}
        />
      </Box>
      <AlbumGrid gallery={gallery} />
    </Box>
  );
};

export default Artworks;
