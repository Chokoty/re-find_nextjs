'use client';

import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';

import PageTitle from '@/components/common/PageTitle';
import GalleryLayout from '@/components/layout/gallery-layout';
import developers from '@/data/developers';
import { useResponsive } from '@/hook/useResponsive';
import door from '@/public/door.webp';
import waktyhall1 from '@/public/waktyhall1.webp';
import { darkMode, lightMode } from '@/styles/theme';

const topTitle = {
  title: '왁티홀의 역설',
  description: '문 뒤에는 3종류의 팬아트, 2번의 기회, 당신의 선택은?',
};

export default function WaktyHallDoor() {
  // const setIsOpen = useStore((state) => state.setIsOpen);
  const isMobile = useResponsive();

  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );

  // useEffect(() => {
  //   setIsOpen(false);
  // }, [setIsOpen]);

  const isMemberCountOdd =
    developers.filter((item) => item.group === 'member').length % 2 !== 0;
  const isCreditCountOdd =
    developers.filter((item) => item.group === 'credit').length % 2 !== 0;

  return (
    <GalleryLayout title="Events">
      <Box
        w="100%"
        p="1rem"
        display="flex"
        flexDirection="column"
        gap="1rem"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <PageTitle topTitle={topTitle} />
        <Image
          src={waktyhall1}
          alt="왁티홀"
          width={300}
          height={300}
          unoptimized
          // placeholder="blur"
        />
        <Link
          color={highlightColor}
          className="link-to-wakzoo"
          href={'https://cafe.naver.com/steamindiegame/2093767'}
          isExternal
        >
          원본링크: 몬티홀의 역설의 현실(+왁굳님 반응 추가)
          <ExternalLinkIcon mx="2px" />
        </Link>
        <Box
          w="100%"
          p="1rem"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Text as="h1" fontSize="2xl" m="3rem 0 1rem 0">
            문 선택시 확률 표시, hover시 빼꼼
          </Text>
          <Flex
            w="90%"
            flexDirection="row"
            display="flex"
            flexWrap="wrap"
            gap="3rem"
            justifyContent="center"
            alignItems="center"
            margin="0 auto"
            p="0"
          >
            <Box>
              <Image
                src={door}
                alt="door"
                width={200}
                height={200}
                unoptimized
                // placeholder="blur"
              />
            </Box>
            <Box>
              <Image
                src={door}
                alt="door"
                width={200}
                height={200}
                unoptimized
                // placeholder="blur"
              />
            </Box>
            <Box>
              <Image
                src={door}
                alt="door"
                width={200}
                height={200}
                unoptimized
                // placeholder="blur"
              />
            </Box>
          </Flex>
        </Box>
        <Box
          w="100%"
          p="1rem"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Text mt="3rem" as="h1" fontSize="2xl">
            남은 기회 10/10
          </Text>
          <Text mt="3rem" as="h1" fontSize="2xl">
            남은 기회가 다 소진되었을 시에는 문을 열 수 없습니다.기회를 충전하기
            위해서는 왁물원 팬아트 링크를 10개 이상 접속하세요.
          </Text>
        </Box>
      </Box>
    </GalleryLayout>
  );
}
