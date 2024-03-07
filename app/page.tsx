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
  // { last_update_info }: HomeProps
  const isMobile = useResponsive();
  // const [isSearchingAuthor, setIsSearchingAuthor] = useState(false);
  // const [author, setAuthor] = useState(null);
  // const [author, setAuthor] = useState(null);

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
      {/* <MySnowfall /> */}
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
              pl="1rem"
              w="100%"
              maxW="400px"
              flexDir="row"
              justifyContent="space-between"
              alignItems="center"
              cursor="pointer"
            >
              <Heading size="md">좀 더!</Heading>
              {/* <Text fontSize="md">더보기</Text> */}
              <Box
                h="2rem"
                w="2rem"
                borderRadius="50%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                // border="1px solid #828282"
              >
                {/* <IoIosArrowForward size="1rem" /> */}
              </Box>
            </Flex>
            <MoreButtons />
          </Box>
        )}
        <EventFanarts initialFanart={null} showCnt={2} width={'90%'} />
        <UpdateLogBoard width={'90%'} />
        <Footer />
        {/* {!inView ? <Footer /> : <Box h="398px"></Box>} */}
        {/* Observer를 위한 div */}
        {/* {<Box ref={ref} w="100%" h="3rem"></Box>} */}
        {/* {inView && (
          <Box position="fixed" bottom="-1rem" h="120vh" pt="10rem">
            <Footer />
          </Box>
        )} */}
      </Box>
      <Box
        w="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        // mt="1rem"
      >
        {/* <BannerSlider />
        <TopTitle data={data} resetFiles={resetFiles} /> */}
      </Box>
    </Box>
  );
}

// export async function getServerSideProps() {
//   return {
//     props: {
//       last_update_info: null,
//       // counter: null,
//       // initialFanart: null,
//       // random_fanart: null,
//     },
//   };

//   try {
//     const timeout = 2000; // 3초
//     const last_update_info = axios
//       .get('https://re-find.reruru.com/last_update_info', { timeout })
//       .then((res) => res.data);
//     // const counter = axios
//     //     .get("https://isd-fanart.reruru.com/counter")
//     //     .then((res) => res.data);
//     // const initialFanart = axios
//     //   .get(`https://re-find.reruru.com/isegye_festival`)
//     //   .then((res) => res.data);
//     // const random_fanart = axios
//     //     .get("https://rerurureruru.com:8443/rand", { timeout })
//     //     .then((res) => res.data);

//     const ret = await Promise.all([
//       // wow - 병렬로 요청해서 페이지 로딩 줄임!
//       last_update_info,
//       // counter,
//       // initialFanart,
//       // random_fanart,
//     ]);

//     return {
//       props: {
//         last_update_info: ret[0],
//         // counter: ret[0],
//         // last_update_info: ret[1],
//         // random_fanart: ret[1],
//         // initialFanart: ret[1],
//       },
//     };
//   } catch (error) {
//     console.log('Error fetching data :', error);

//     // Return an alternate value if the fetch fails
//     return {
//       props: {
//         last_update_info: null,
//         // counter: null,
//         // initialFanart: null,
//         // random_fanart: null,
//       },
//     };
//   }
// }
