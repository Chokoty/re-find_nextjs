'use client';

import { Box, useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';

import AlbumGrid from '@/components/artwork/albumGrid';
import MemberButtonList from '@/components/artwork/MemberButtonList';
// import PageTitle from '@/components/common/PageTitle';
import TopBackground from '@/components/common/TopBackground';
import GalleryTitle from '@/components/gallery/GalleryTitle';
import { useDrawerStore } from '@/store/drawerStore';
import { darkMode, lightMode } from '@/styles/theme';

export default function Gallery() {
  const setIsOpen = useDrawerStore((state) => state.setIsOpen);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);

  const topTitle = {
    title: '팬아트 갤러리',
    description: '왁물원에 올라온 팬아트들을 모아놓은 갤러리입니다.',
  };

  const hexToRGBA = (hex: string, alpha: number) => {
    // 헥사코드를 2자리씩 나누어 각각의 R, G, B 값을 추출
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // rgba 형식으로 반환
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  // const router = useRouter();
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const hasQuery = Array.from(searchParams.keys()).length > 0;

  // useEffect(() => {
  //   // 현재 경로가 'gallery' 페이지인지 확인
  //   if (pathname === '/gallery' && hasQuery) {
  //     // 쿼리 파라미터가 있는 경우, 쿼리 파라미터를 제거하고 URL을 업데이트
  //     router.replace(pathname);
  //   }
  // }, [router]);

  const backgroundImageUrl =
    '/static/images/gallery/크리스마스커버일러스트_1920x1080.jpg'; // 배경 이미지 URL

  useEffect(() => {
    setIsOpen(false);
    // alert('오픈 예정입니다.');
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      w="100%"
    >
      {/* <PageTitle topTitle={topTitle} /> */}
      <TopBackground backgroundImageUrl={backgroundImageUrl} isAlbum={false}>
        <GalleryTitle titleText={topTitle} isMember={false} />
      </TopBackground>
      <Box position="absolute" top="20rem" w="95%" zIndex="1">
        <Box
          p="0 2rem"
          // background={bg2}
          background={hexToRGBA(bg2, 0.4)}
          borderRadius="1rem"
          w="100%"
          h="80px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <MemberButtonList
            type="link"
            range={{ start: 0, end: 7 }}
            selected={null}
            setSelected={null}
            isdPick={false}
          />
        </Box>
        <AlbumGrid />
      </Box>
    </Box>
  );
}
