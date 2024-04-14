'use client';

import { Box, Button, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';

import MontyHall from '@/app/events/lib/montyhall';
import { useWaktyHallArts } from '@/app/events/service/client/useEventService';
import styles from '@/styles/Game.module.scss';

import { Door } from './Door';
import DetailedImageViewer from './Modal';
import ScoreResult from './ScoreResult';

const initStorageObj = {
  score: 0,
  gamesPlayed: 0,
  changeWin: 0,
  changeLose: 0,
  keepWin: 0,
  keepLose: 0,
};

export default function Game() {
  // const [promptOpen, setPromptOpen] = useState(false);
  const [result, setResult] = useState<string[]>([]);
  const [game, setGame] = useState<MontyHall | null>(null);
  const [selected, setSelected] = useState(false);
  const [prizeOrGoat, setPrizeOrGoat] = useState<number | null>(null);
  const [isInProgress, setIsInProgress] = useState(false);

  const [records, setRecords] = useState(() => {
    if (typeof window === 'undefined') {
      return initStorageObj;
    }
    const scoreRecords = localStorage.getItem('waktyHall2');
    return scoreRecords ? JSON.parse(scoreRecords) : initStorageObj;
  });
  const [score, setScore] = useState(records.score);
  const [gamesPlayed, setGamesPlayed] = useState(records.gamesPlayed);
  const [switched, setSwitched] = useState(false);
  // 변경해서 이긴횟수, 변경해서 진횟수, 유지해서 이긴횟수, 유지해서 진횟수
  const [resultCount, setResultCount] = useState({
    changeWin: records.changeWin,
    changeLose: records.changeLose,
    keepWin: records.keepWin,
    keepLose: records.keepLose,
  });
  const {
    data: fanartsBehindDoor,
    isLoading,
    isFetching,
    refetch,
  } = useWaktyHallArts();

  const handleScore = () => {
    const newScore = score + 1;
    setScore(newScore);
    const data = localStorage.getItem('waktyHall2');
    if (!data) return;
    localStorage.setItem(
      'waktyHall2',
      JSON.stringify({ ...JSON.parse(data), score: newScore })
    );
  };

  const handleGamePlayed = (isWin: boolean) => {
    const newGamesPlayed = gamesPlayed + 1;
    let { changeWin, changeLose, keepWin, keepLose } = resultCount;
    if (isWin) {
      if (switched) {
        changeWin += 1;
      } else {
        keepWin += 1;
      }
    } else if (switched) {
      changeLose += 1;
    } else {
      keepLose += 1;
    }
    setResultCount({ changeWin, changeLose, keepWin, keepLose });
    setGamesPlayed(newGamesPlayed);
    const data = localStorage.getItem('waktyHall2');
    if (!data) return;
    localStorage.setItem(
      'waktyHall2',
      JSON.stringify({
        ...JSON.parse(data),
        gamesPlayed: newGamesPlayed,
        changeWin,
        changeLose,
        keepWin,
        keepLose,
      })
    );
  };

  const handleSwitched = () => {
    setSwitched(!switched);
  };

  // 문을 선택한다.
  const handleSelection = (door: number) => {
    // 1. 유저가 문을 선택하면, 선택한 문을 저장하고 게임 시작
    if (!game?.contestantGuess) {
      setIsInProgress(true);
      setGame(new MontyHall(door));
      setSelected(true);
    }
  };
  // 4. 유저가 바뀌지 않는다면 처음 선택한 문 오픈(정답 or 오답)
  const keepDoor = () => {
    if (!game) return;
    setResult(game.checkWinning());
    // setPromptOpen(false);
    setSelected(false);
  };
  // 4. 유저가 바꾼다면 바꾼 문 오픈(정답 or 오답)
  const changeDoor = () => {
    if (!game) return;
    setResult(game.changeAnswer());
    handleSwitched();
    // setPromptOpen(false);
    setSelected(false);
  };
  // 재시작한다
  // 5. 게임이 끝나면 상태 초기화
  const restart = () => {
    if (!game) return;
    refetch();
    setResult([]);
    setPrizeOrGoat(game.prizeDoor); // 이전 정답 문 저장(표시용)
    setGame(null);
    setIsInProgress(false);
    setSwitched(false);
  };

  // score, game 진행 횟수
  useEffect(() => {
    if (!game) return;
    if (game.win === true) {
      handleScore();
    }
    if (game.win === true || game.win === false) {
      handleGamePlayed(game.win);
    }
  }, [game?.win]);

  useEffect(() => {
    const scoreRecords = localStorage.getItem('waktyHall2');
    if (scoreRecords) {
      setRecords(JSON.parse(scoreRecords));
    } else {
      localStorage.setItem('waktyHall2', JSON.stringify(initStorageObj));
    }
  }, []);

  if (isLoading || isFetching) {
    return (
      <div className={styles.loading}>
        <PuffLoader color="#01BFA2" />
        <p className={styles.loadingText}>
          새로운 팬아트를 가져오고 있습니다. 잠시만 기다려주세요...
        </p>
        <ScoreResult
          score={score}
          gamesPlayed={gamesPlayed}
          resultCount={resultCount}
        />
      </div>
    );
  }

  if (!fanartsBehindDoor) {
    return (
      <div className={styles.loading}>
        <p className={styles.loadingText}>
          팬아트를 가져오는 데 실패했습니다. 새로고침을 눌러주세요.
        </p>
        <Button
          onClick={() => {
            refetch();
          }}
        >
          새로고침
        </Button>
      </div>
    );
  }

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      w="100%"
    >
      <DetailedImageViewer />
      <div className={styles.doorsContainer}>
        <div className={styles.doors}>
          <Door
            id="1"
            prizeOrGoat={prizeOrGoat === 1}
            // isOpen={promptOpen}
            game={game}
            handleSelection={handleSelection}
            fanart={fanartsBehindDoor}
          />
          <Door
            id="2"
            prizeOrGoat={prizeOrGoat === 2}
            // isOpen={promptOpen}
            game={game}
            handleSelection={handleSelection}
            fanart={fanartsBehindDoor}
          />
          <Door
            id="3"
            prizeOrGoat={prizeOrGoat === 3}
            // isOpen={promptOpen}
            game={game}
            handleSelection={handleSelection}
            fanart={fanartsBehindDoor}
          />
        </div>
      </div>
      {!isLoading && !isFetching && !isInProgress && (
        <h2>게임 시작을 원하신다면 문을 선택해주세요... </h2>
      )}
      {/* 1. 유저는 처음 1개의 문을 "선택"했을 때, 바꿀 권리를 줄 버튼 생성  */}
      {selected ? (
        <Box mt="2rem" display="flex" flexDir="column">
          <Heading as="h2" size="md" mb="1rem">
            처음 선택한 문을 바꾸시겠습니까?
          </Heading>
          <Box display="flex" flexDir="row" gap="1rem">
            <Button
              flex={1}
              tabIndex={0}
              colorScheme="green"
              onClick={keepDoor}
            >
              그대로 ㄱ
            </Button>
            <Button
              flex={1}
              tabIndex={0}
              colorScheme="yellow"
              onClick={changeDoor}
            >
              바꾸기
            </Button>
          </Box>
        </Box>
      ) : null}
      {result.length > 0 && (
        <>
          <div className={styles.results}>
            {result.map((phrase, index) => (
              <p
                key={index}
                className={
                  game && game.win === false ? styles.lose : styles.win
                }
              >
                {phrase}
              </p>
            ))}
          </div>
          <Button mt="1rem" onClick={restart}>
            재시작하시겠어요?
          </Button>
        </>
      )}
      <ScoreResult
        score={score}
        gamesPlayed={gamesPlayed}
        resultCount={resultCount}
      />
    </Box>
  );
}
