'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';

import Door from '@/app/events/components/WaktyHall/Door';
import ScoreResult from '@/app/events/components/WaktyHall/ScoreResult';
import MontyHall from '@/app/events/lib/montyhall';
import { useWaktyHallArts } from '@/app/events/service/client/useEventService';
import Button from '@/components/Button';

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
      <div className="flex flex-col items-center justify-center">
        <PuffLoader color="#01BFA2" />
        <p className="pt-[52px] min-[1098px]:pt-[44px]">
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
      <div className="flex flex-col items-center justify-center">
        <p className="pt-[52px] min-[1098px]:pt-[44px]">
          팬아트를 가져오는 데 실패했습니다. 새로고침을 눌러주세요.
        </p>
        <Button
          additionalClass="rounded-md"
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
    <div className="flex w-full flex-col items-center justify-center">
      <div className="mb-14 flex w-full justify-center">
        <div className="mx-4 flex w-[1200px] flex-wrap justify-evenly gap-[47px] min-[500px]:gap-[75px] min-[1098px]:gap-[60px]">
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
        <div className="mt-8 flex flex-col">
          <h2 className="mb-4 text-xl font-bold">
            처음 선택한 문을 바꾸시겠습니까?
          </h2>
          <div className="flex justify-center gap-4">
            <Button
              additionalClass="rounded-md"
              tabIndex={0}
              onClick={keepDoor}
            >
              그대로
            </Button>
            <Button
              additionalClass="rounded-md"
              tabIndex={0}
              intent="solid-orange"
              onClick={changeDoor}
            >
              바꾸기
            </Button>
          </div>
        </div>
      ) : null}
      {result.length > 0 && (
        <>
          <div className="text-center text-base">
            {result.map((phrase, index) => (
              <p
                key={index}
                className={clsx('text-[20px] font-bold tracking-[2px]', {
                  'text-red-800': game && game.win === false,
                  'text-yellow-400': game && game.win === true,
                })}
              >
                {phrase}
              </p>
            ))}
          </div>
          <Button
            intent="solid-gray"
            additionalClass="mt-4 rounded-md"
            onClick={restart}
          >
            재시작하시겠어요?
          </Button>
        </>
      )}
      <ScoreResult
        score={score}
        gamesPlayed={gamesPlayed}
        resultCount={resultCount}
      />
    </div>
  );
}
