'use client';

import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';

import TopBackground from '@/components/common/TopBackground';
import GalleryTitle from '@/components/gallery/GalleryTitle';
import MemberAlbumSection from '@/components/gallery/MemberAlbumSection';
import RefindPickSection from '@/components/gallery/RefindPickSection';
import ThisWeekTopSection from '@/components/gallery/ThisWeekTopSection';

export default function Gallery() {
  const topTitle = {
    title: '팬아트 갤러리',
    description: '왁물원에 올라온 모든 팬아트들을 한 곳에서!',
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
      <Box position="absolute" top={['14rem', '24rem']} w="95%" zIndex="1">
        <ThisWeekTopSection />
        <RefindPickSection />
        <MemberAlbumSection />
      </Box>
    </Box>
  );
}
