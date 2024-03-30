import { Button } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import MontyHall from '@/lib/montyhall';
import { usePromptStore } from '@/store/promptStore';
import styles from '@/styles/Game.module.scss';

import { Door } from './Door';
import PromptModal from './Modal';

const PromptPortal = dynamic(
  () => import('@/components/common/Modal/PromptPortal')
);

type Props = {
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setGamesPlayed: React.Dispatch<React.SetStateAction<number>>;
  setSwitched: React.Dispatch<React.SetStateAction<number>>;
  setModalOpen: (modalOpen: boolean) => void;
};

export default function Game({
  setScore,
  setGamesPlayed,
  setSwitched,
  setModalOpen,
}: Props) {
  // const [promptOpen, setPromptOpen] = useState(false);
  const [result, setResult] = useState<string[]>([]);
  const [game, setGame] = useState<MontyHall | null>(null);
  const [selected, setSelected] = useState(false);
  const [prizeOrGoat, setPrizeOrGoat] = useState<number | null>(null);
  // score, game 진행 횟수
  useEffect(() => {
    if (!game) return;
    if (game.win === true) {
      setScore((score) => score + 1);
    }
    if (game.win === true || game.win === false) {
      setGamesPlayed((gamesPlayed) => gamesPlayed + 1);
    }
  }, [game?.win, setScore, setGamesPlayed]);

  // 문을 선택한다.
  const handleSelection = (door: number) => {
    setModalOpen(true);
    // 1. 유저가 문을 선택하면, 선택한 문을 저장하고 게임 시작
    if (!game?.contestantGuess) {
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
    setSwitched((switched) => switched + 1);
    // setPromptOpen(false);
    setSelected(false);
  };
  // 재시작한다
  // 5. 게임이 끝나면 상태 초기화
  const restart = () => {
    if (!game) return;
    setResult([]);
    setPrizeOrGoat(game.prizeDoor); // 이전 정답 문 저장(표시용)
    setGame(null);
    setModalOpen(false);
  };

  const { setIsOpen } = usePromptStore(
    useShallow((state) => ({
      setIsOpen: state.setIsOpen,
    }))
  );
  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <main>
      <PromptPortal>
        <PromptModal keep={keepDoor} change={changeDoor} />
      </PromptPortal>
      <div className={styles.doors}>
        <Door
          id="1"
          prizeOrGoat={prizeOrGoat === 1}
          // isOpen={promptOpen}
          game={game}
          handleSelection={handleSelection}
        />
        <Door
          id="2"
          prizeOrGoat={prizeOrGoat === 2}
          // isOpen={promptOpen}
          game={game}
          handleSelection={handleSelection}
        />
        <Door
          id="3"
          prizeOrGoat={prizeOrGoat === 3}
          // isOpen={promptOpen}
          game={game}
          handleSelection={handleSelection}
        />
      </div>
      <br />
      {/* 1. 유저는 처음 1개의 문을 "선택"했을 때, 바꿀 권리를 줄 버튼 생성  */}
      {selected ? (
        <Button
          // disabled={promptOpen}
          onClick={onOpen}
        >
          다음 결정은??
        </Button>
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
    </main>
  );
}
