'use client';

import { Box, useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';

import AlbumGrid from '@/components/artwork/albumGrid';
import MemberButtonList from '@/components/artwork/MemberButtonList';
import PageTitle from '@/components/common/PageTitle';
import { useDrawerStore } from '@/store/drawerStore';
import { darkMode, lightMode } from '@/styles/theme';

export default function Gallery() {
  const setIsOpen = useDrawerStore((state) => state.setIsOpen);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);

  const topTitle = {
    title: '팬아트 갤러리',
    description: '왁물원에 올라온 팬아트들을 모아놓은 갤러리입니다.',
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

  useEffect(() => {
    setIsOpen(false);
    // alert('오픈 예정입니다.');
  }, []);

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
      <PageTitle topTitle={topTitle} />
      <Box
        // m="1.5rem 1rem"
        mt="2rem"
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
          type="link"
          range={{ start: 0, end: 7 }}
          selected={null}
          setSelected={null}
          isdPick={false}
        />
      </Box>
      <AlbumGrid />
    </Box>
  );
}
