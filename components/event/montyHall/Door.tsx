import Image from 'next/image';
import React from 'react';

import type MontyHall from '@/lib/montyhall';
import KeyDoor from '@/public/real-wakgood.webp';
import BoomDoor from '@/public/이세페애니굳.webp';
import styles from '@/styles/Door.module.scss';

type Props = {
  handleSelection: (id: number) => void;
  id: string;
  game: MontyHall | null;
  // isOpen: boolean;
  prizeOrGoat: boolean;
};

const Door = ({ handleSelection, id, game, prizeOrGoat }: Props) => {
  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id1: number
  ) => {
    e.preventDefault();
    if (!game?.montyDoor) {
      handleSelection(id1);
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLDivElement>,
    id2: number
  ) => {
    // 엔터 or 스페이스바
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!game?.montyDoor) {
        handleSelection(id2);
      }
    }
  };

  const certainDoorSrc = () => {
    if (!game) return BoomDoor;
    const { prizeDoor } = game;
    if (prizeDoor) {
      if (prizeDoor === +id) {
        return KeyDoor;
      }
      return BoomDoor;
    }

    if (prizeOrGoat) {
      return KeyDoor;
    }
    return BoomDoor;
  };

  // 게임이 끝났을 때
  if (game && game.win !== '') {
    return (
      <div className={styles.sceneContainer}>
        <div
          className={styles.scene}
          // tabIndex={game.prizeDoor}
          // disabled={isOpen}
        >
          <div className={styles.goat}>
            <Image
              src={certainDoorSrc()}
              width={180}
              height={180}
              alt={
                game && game.prizeDoor === +id
                  ? 'Door opens to reveal prize'
                  : 'Door opens to reveal goat'
              }
            />
          </div>
          <div className={`${styles.door} ${styles['show--right']}`} id={id}>
            <div className={`${styles['door--face']} ${styles['door--front']}`}>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="doorknobGradient">
                    <stop offset="2%" stopColor="rgba(172,143,26,1)" />
                    <stop offset="26%" stopColor="rgba(172,143,26,1)" />
                    <stop offset="74%" stopColor="rgba(144,113,9,1)" />
                    <stop offset="100%" stopColor="rgba(135,107,14,1)" />
                  </linearGradient>
                </defs>
                <circle className={styles.doorknob} cx="90%" cy="65%" r="5" />
              </svg>
            </div>
            <div
              className={`${styles['door--face']} ${styles['door--back']}`}
            ></div>
            <div
              className={`${styles['door--face']} ${styles['door--right']}`}
            ></div>
          </div>
        </div>
      </div>
    );
  }
  // 게임이 진행 중일 때
  // 1. 유저가 선택한 문
  if ((game && game.contestantGuess) === +id) {
    return (
      <div className={styles.sceneContainer}>
        <div
          className={styles.scene}
          // tabIndex={game.prizeDoor}
          // disabled={isOpen}
        >
          <div className={styles.goat}></div>

          <div className={styles.door} id={id}>
            <div className={`${styles['door--face']} ${styles['door--front']}`}>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="doorknobGradient">
                    <stop offset="2%" stopColor="rgba(172,143,26,1)" />
                    <stop offset="26%" stopColor="rgba(172,143,26,1)" />
                    <stop offset="74%" stopColor="rgba(144,113,9,1)" />
                    <stop offset="100%" stopColor="rgba(135,107,14,1)" />
                  </linearGradient>
                </defs>
                <circle className={styles.doorknob} cx="90%" cy="65%" r="5" />
              </svg>
            </div>
            <div
              className={`${styles['door--face']} ${styles['door--back']}`}
            ></div>
            <div
              className={`${styles['door--face']} ${styles['door--right']}`}
            ></div>
          </div>
          <p style={{ marginTop: '0.5rem' }}>{id}번째 문 선택</p>
        </div>
      </div>
    );
    // 2. 몬티 홀이 열 문
  }
  if ((game && game.montyDoor) === +id) {
    return (
      <div className={styles.sceneContainer}>
        <div
          className={styles.scene}
          // tabIndex={game.prizeDoor}
          // disabled={isOpen}
        >
          <div className={styles.goat}>
            <Image
              width={180}
              height={180}
              src={BoomDoor}
              alt="Door opens to reveal goat"
            />
          </div>

          <div className={`${styles.door} ${styles['show--right']}`} id={id}>
            <div className={`${styles['door--face']} ${styles['door--front']}`}>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="doorknobGradient">
                    <stop offset="2%" stopColor="rgba(172,143,26,1)" />
                    <stop offset="26%" stopColor="rgba(172,143,26,1)" />
                    <stop offset="74%" stopColor="rgba(144,113,9,1)" />
                    <stop offset="100%" stopColor="rgba(135,107,14,1)" />
                  </linearGradient>
                </defs>
                <circle className={styles.doorknob} cx="90%" cy="65%" r="5" />
              </svg>
            </div>
            <div
              className={`${styles['door--face']} ${styles['door--back']}`}
            ></div>
            <div
              className={`${styles['door--face']} ${styles['door--right']}`}
            ></div>
          </div>
          <p style={{ marginTop: '0.5rem' }}>{id}번째 문 오픈</p>
        </div>
      </div>
    );
  }
  // 3. 선택하지 않은 문
  return (
    <div className={styles.sceneContainer}>
      <div
        className={styles.scene}
        // tabIndex={game.prizeDoor}
        onClick={(e) => handleClick(e, +id)}
        onKeyDown={(e) => handleKeyPress(e, +id)}
        role="button"
        // disabled={isOpen}
      >
        <div className={styles.goat}>
          <Image
            width={180}
            height={180}
            src={certainDoorSrc()}
            alt={
              (game && game.prizeDoor) === +id
                ? 'Door opens to reveal prize'
                : 'Door opens to reveal goat'
            }
          />
        </div>

        <div className={styles.door} id={id}>
          <div className={`${styles['door--face']} ${styles['door--front']}`}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="doorknobGradient">
                  <stop offset="2%" stopColor="rgba(172,143,26,1)" />
                  <stop offset="26%" stopColor="rgba(172,143,26,1)" />
                  <stop offset="74%" stopColor="rgba(144,113,9,1)" />
                  <stop offset="100%" stopColor="rgba(135,107,14,1)" />
                </linearGradient>
              </defs>
              <circle className={styles.doorknob} cx="90%" cy="65%" r="5" />
            </svg>
          </div>
          <div
            className={`${styles['door--face']} ${styles['door--back']}`}
          ></div>
          <div
            className={`${styles['door--face']} ${styles['door--right']}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export { Door };
