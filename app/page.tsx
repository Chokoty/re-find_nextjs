'use client';

import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useShallow } from 'zustand/react/shallow';

import MoreButtons from '@/components/common/MoreButtons';
import UpdateLogBoard from '@/components/common/UpdateLogBoard';
import EventFanarts from '@/components/event/EventFanarts';
import Footer from '@/components/layout/Footer';
import BannerSkeleton from '@/components/skeleton/BannerSkeleton';
import TopTitle from '@/components/TopTitle';
import Upload from '@/components/upload';
import { useResponsive } from '@/hook/useResponsive';
import { useImageUploadStore } from '@/store/imageUploadStore';
import { darkMode, lightMode } from '@/styles/theme';

const BannerSlider = dynamic(() => import('@/components/banner/BannerSlider'), {
  ssr: false,
  loading: () => <BannerSkeleton />,
});

const EventModal = dynamic(() => import('@/components/event/EventModal'), {
  ssr: false,
});

export default function Home() {
  const isMobile = useResponsive();

  // Theme
  const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);
  const bgColor2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  // const color = useColorModeValue(lightMode.color, darkMode.color);
  const { congrat } = useImageUploadStore(
    useShallow((state) => ({
      congrat: state.isEventActive,
    }))
  );

  return (
    <Box
      className="home_body"
      display="flex"
      justifyContent="center"
      alignItems="start"
      flexDirection="row"
      width="100%"
      maxW="1208px"
      flexWrap="wrap"
      gap="1.5rem"
      margin="1rem auto"
      backgroundColor={bgColor}
    >
      {/* TODO: congrat을 전역변수로 만들기 */}
      {congrat && <EventModal />}
      <Box
        w="100%"
        minH="100vh"
        maxW="700px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <BannerSlider />
        <TopTitle />
        <Upload />
      </Box>
      <Box
        w="100%"
        maxW="400px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {!isMobile && (
          <Box
            w="90%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            background={bgColor2}
            borderRadius="1rem"
            p="1rem 0"
          >
            <Flex
              pt="0.5rem"
              pl="1.5rem"
              w="100%"
              maxW="400px"
              flexDir="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading size="md">좀 더!</Heading>
              {/* <Text fontSize="md">더보기</Text> */}
            </Flex>
            <MoreButtons />
          </Box>
        )}
        <EventFanarts initialFanart={null} showCnt={2} width={'90%'} />
        <UpdateLogBoard width={'90%'} />
        <Footer />
      </Box>
    </Box>
  );
}
