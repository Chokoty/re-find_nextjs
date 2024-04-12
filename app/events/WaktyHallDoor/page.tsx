'use client';

import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Link, Text, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';

import PageTitle from '@/components/common/PageTitle';
import Game from '@/components/event/montyHall/Game';
import EventLayout from '@/components/layout/event-layout';
import waktyhall1 from '@/public/static/images/events/question.webp';
import { darkMode, lightMode } from '@/styles/theme';

const topTitle = {
  title: '왁티홀의 역설',
  description:
    '문 뒤에는 고퀄팬아트와 혐잘딱팬아트, 왁두팬아트가 있습니다, 당신의 선택은?',
};

export default function WaktyHallDoorPage() {
  // const [totalChanceCnt, setTotalChanceCnt] = useState(10);
  // const [chanceCnt, setChanceCnt] = useState(2);
  // const setIsOpen = useStore((state) => state.setIsOpen);
  // const isMobile = useResponsive();

  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  // const handleDoorClick = () => {
  //   // Show confirmation dialog
  //   // eslint-disable-next-line no-restricted-globals
  //   const isConfirmed = confirm('정말 이걸로 하시겠어요?');
  //   if (isConfirmed) {
  //     // Decrease chance count if confirmed
  //     setChanceCnt((prev) => prev - 1);

  //   }
  // };

  return (
    <EventLayout title="왁티홀">
      <Box
        w="100%"
        p="1rem"
        display="flex"
        flexDirection="column"
        gap="1rem"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        pb="4rem"
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
      </Box>
      {/* <Box
        w="100%"
        p="1rem"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Text mt="3rem" as="h1" fontSize="2xl">
          남은 기회가 다 소진되었을 시에는 더 이상 문을 열 수 없습니다.기회를
          충전하기 위해서는 왁물원 팬아트 링크를 10개 이상 접속하세요.
        </Text>
        <Text mt="3rem" as="h1" fontSize="2xl">
          남은 기회 {totalChanceCnt} /10
        </Text>
      </Box> */}
      <Game />
    </EventLayout>
  );
}
