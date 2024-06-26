import Image from 'next/image';
import React from 'react';
import { MdOutlineImageSearch } from 'react-icons/md';

import styles from '@/app/events/components/WaktyHall/Door.module.scss';
import ImageViewModal from '@/app/events/components/WaktyHall/ImageViewModal';
import type MontyHall from '@/app/events/lib/montyhall';
import Button from '@/components/Button';
import useModal from '@/hooks/useModal';
import { BoomDoor, KeyDoor } from '@/lib/images';

type Props = {
  handleSelection: (id: number) => void;
  id: string;
  game: MontyHall | null;
  // isOpen: boolean;
  prizeOrGoat: boolean;
  fanart: WaktyHall;
};

export default function Door({
  handleSelection,
  id,
  game,
  prizeOrGoat,
  fanart,
}: Props) {
  const { show } = useModal(ImageViewModal);
  const onOpen = () => {
    const artwork = getFanart();
    if (!artwork) return;
    show({ artwork, animateDir: 'bottom' });
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

  const getFanart = () => {
    if (!game) return null;
    if (game.prizeDoor === +id) {
      return fanart.best;
    }
    // 정답이 아닌 문을 선택했을 때,
    if (game.montyDoor === +id) {
      return fanart.hyum;
    }
    return fanart.wakdu;
  };

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
            <div className={styles.th}>{id}</div>
            <Image
              src={certainDoorSrc()}
              width={250}
              height={250}
              style={{
                backgroundColor: 'white',
                objectFit: 'contain',
              }}
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
          {game &&
            ((game.win && game.prizeDoor === +id) ||
              game.montyDoor === +id) && (
              <Button
                // fontSize={['sm', 'md']}
                intent={game.prizeDoor === +id ? 'solid-green' : 'solid-red'}
                additionalClass="mt-2 rounded-md w-full 2xs:px-2"
                onClick={onOpen}
              >
                <MdOutlineImageSearch className="mr-1" />
                자세히 <span className={styles.secondaryText}>보기</span>
              </Button>
            )}
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
          <p className="mt-2 text-center">{id}번째 문 선택</p>
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
              width={250}
              height={250}
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
          <p className="mt-2 text-center">{id}번째 문 오픈</p>
          <Button
            intent="solid-red"
            additionalClass="mt-2 rounded-md w-full 2xs:px-2"
            onClick={onOpen}
          >
            <MdOutlineImageSearch className="mr-1" />
            자세히 <span className={styles.secondaryText}>보기</span>
          </Button>
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
            width={250}
            height={250}
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
}
