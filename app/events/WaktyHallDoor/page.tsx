'use client';

import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';

import PageTitle from '@/components/common/PageTitle';
import Game from '@/components/event/montyHall/Game';
import EventLayout from '@/components/layout/event-layout';
// import { useResponsive } from '@/hook/useResponsive';
// import door from '@/public/door.webp';
import waktyhall1 from '@/public/waktyhall1.webp';
import { darkMode, lightMode } from '@/styles/theme';
import styles from '@/styles/WaktyHallDoor.module.scss';

const topTitle = {
  title: '왁티홀의 역설',
  description: '문 뒤에는 고퀄팬아트와 혐잘딱팬아트가 있습니다, 당신의 선택은?',
};

export default function WaktyHallDoor() {
  // const [totalChanceCnt, setTotalChanceCnt] = useState(10);
  // const [chanceCnt, setChanceCnt] = useState(2);
  // const setIsOpen = useStore((state) => state.setIsOpen);
  // const isMobile = useResponsive();

  const [score, setScore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [switched, setSwitched] = useState(0);

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
          {/* <Text as="h1" fontSize="2xl" m="3rem 0 1rem 0">
            문 선택시 확률 표시, hover시 빼꼼 혐잘딱 팬아트를 피해서 귀여운
            팬아트를 찾으세요.
          </Text>
          <Text mt="3rem" as="h1" fontSize="2xl">
            고를 기회 앞으로 {chanceCnt}회
          </Text> */}
          {/* <Flex
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
            {[door, door, door].map((doorSrc, index) => (
              <Button key={index} onClick={handleDoorClick} variant="unstyled">
                <Image
                  src={doorSrc}
                  alt="door"
                  width={200}
                  height={200}
                  unoptimized
                  // placeholder="blur"
                />
              </Button>
            ))}
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
          </Flex> */}
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
            남은 기회 {totalChanceCnt} /10
          </Text>
          <Text mt="3rem" as="h1" fontSize="2xl">
            남은 기회가 다 소진되었을 시에는 문을 열 수 없습니다.기회를 충전하기
            위해서는 왁물원 팬아트 링크를 10개 이상 접속하세요.
          </Text>
        </Box> */}
      </Box>
      <Game
        setScore={setScore}
        setGamesPlayed={setGamesPlayed}
        setSwitched={setSwitched}
      />
      <div className={styles.table}>
        {!score && !gamesPlayed ? (
          <div className={styles.description}>
            <Text textAlign="start">
              세 개의 문이 제시됩니다. 두 개의 문 뒤에는 꽝인 팬아트가 있습니다.
              세 번째 뒤에는 기대되는 팬아트가 있습니다. <br />세 개의 문 중
              어느 문에 상품이 들어 있는지 추측해야 합니다. <br />
              몬티 홀(진행자)은 문 중 하나를 열어 꽝 팬아트를 드러냅니다. 원래
              문에 선택을 유지하거나 문 선택을 변경할 수 있는 옵션이 제공됩니다.
            </Text>
            <Text textAlign="start" pt="1rem">
              어느 쪽이 이길 가능성이 더 높을까요?
            </Text>
          </div>
        ) : null}
        {score || gamesPlayed ? (
          <table className={styles.score}>
            <caption>결과</caption>
            <thead>
              <tr>
                <th>{gamesPlayed}번째 게임</th>
                <th>횟수</th>
                <th>확률</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>승리</th>
                <td>{score}</td>
                <td>
                  {gamesPlayed === 0
                    ? '0.00'
                    : ((score / gamesPlayed) * 100).toFixed(2)}
                  %
                </td>
              </tr>
              <tr>
                <th>변경</th>
                <td>{switched}</td>
                <td>
                  {' '}
                  {gamesPlayed === 0
                    ? '0.00'
                    : ((switched / gamesPlayed) * 100).toFixed(2)}
                  %
                </td>
              </tr>
              <tr>
                <th>유지</th>
                <td>{gamesPlayed - switched}</td>
                <td>
                  {' '}
                  {gamesPlayed === 0
                    ? '0.00'
                    : (((gamesPlayed - switched) / gamesPlayed) * 100).toFixed(
                        2
                      )}
                  %
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          ''
        )}
      </div>
    </EventLayout>
  );
}
