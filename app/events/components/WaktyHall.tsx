'use client';

import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Link, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';

import Game from '@/app/events/components/montyHall/Game';
import EventLayout from '@/app/events/components/ui/Layout/EventLayout';
import PageTitle from '@/components/common/PageTitle';
import Question from '@/public/static/images/events/question.webp';
import { darkMode, lightMode } from '@/styles/theme';

const topTitle = {
  title: '왁티홀의 역설',
  description:
    '문 뒤에는 고퀄팬아트와 혐잘딱팬아트, 왁두팬아트가 있습니다, 당신의 선택은?',
};

export default function WaktyHall() {
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );

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
          src={Question}
          alt="왁티홀"
          width={300}
          height={300}
          unoptimized
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
      <Game />
    </EventLayout>
  );
}
