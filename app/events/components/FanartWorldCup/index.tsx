'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { IoMdRefresh } from 'react-icons/io';
import { useWindowSize } from 'react-use';

import { CREDIT, TAGS } from '@/app/events/lib/const';
import { useTagImages } from '@/app/events/service/client/useEventService';
import { RefindLogo, VS } from '@/lib/images';

export default function FanartWorldCup() {
  const { width, height } = useWindowSize();
  const [currentRound, setCurrentRound] = useState({
    gang: 64,
    round: 1,
  }); // 현재 라운드 상태
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // 선택된 태그 배열
  const [currentRoundTags, setCurrentRoundTags] = useState<string[]>([]); // 현재 라운드 태그 배열
  const [selectableTags, setSelectableTags] = useState<string[]>([...TAGS]);
  const [changeRound, setChangeRound] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [winInfo, setWinInfo] = useState({
    direction: '',
    tag: '',
  });
  // const [isLoading, setIsLoading] = useState(true); // 데이터 로딩 상태

  // useEffect를 통해 매 라운드가 바뀔 때마다 사용 가능한 태그 쌍을 업데이트합니다.
  useEffect(() => {
    updateSelectedTags();
  }, [currentRound]);

  useEffect(() => {
    if (changeRound) {
      setSelectedTags([]);
      setSelectableTags(selectedTags);
      setCurrentRound({
        gang: currentRound.round,
        round: 1,
      });
      setChangeRound(false);
    }
  }, [changeRound]);
  // 선택된 태그 배열을 업데이트하는 함수
  const updateSelectedTags = () => {
    // 현재 라운드에서 사용할 수 있는 태그 쌍을 선택합니다.
    const shuffledTags = shuffleArray(selectableTags); // selectableTags 배열을 섞음
    const newTags = shuffledTags.slice(0, 2); // 배열의 첫 번째와 두 번째 요소를 선택

    setCurrentRoundTags(newTags);
  };

  // Fisher-Yates shuffle 알고리즘을 이용한 배열 섞기 함수
  const shuffleArray = (arr: string[]) => {
    const newArr = [...arr];
    let currentIndex = newArr.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = newArr[currentIndex];
      newArr[currentIndex] = newArr[randomIndex];
      newArr[randomIndex] = temporaryValue;
    }

    return newArr;
  };

  // 선택된 태그를 처리하고 다음 라운드로 진행하는 함수
  const handleTagSelect = (tag: string) => {
    if (currentRound.gang === 2 && currentRound.round === 1) {
      // setWinInfo({ ...winInfo, tag });
      setIsLast(true);
      return;
    }
    setSelectedTags([...selectedTags, tag]);
    setSelectableTags(
      selectableTags.filter(
        (t) =>
          t !== tag && t !== currentRoundTags[0] && t !== currentRoundTags[1]
      )
    );
    if (
      (currentRound.gang === 64 && currentRound.round === 32) ||
      (currentRound.gang === 32 && currentRound.round === 16) ||
      (currentRound.gang === 16 && currentRound.round === 8) ||
      (currentRound.gang === 8 && currentRound.round === 4) ||
      (currentRound.gang === 4 && currentRound.round === 2)
    ) {
      setChangeRound(true);
      return;
    }
    setCurrentRound({ ...currentRound, round: currentRound.round + 1 });
  };

  const changeFanart = async () => {
    // disabled에서 막혀야하지만 이렇게도 막을 수 있음
    if (isFetching) return;
    await refetch();
  };
  const changeFanart2 = async () => {
    // disabled에서 막혀야하지만 이렇게도 막을 수 있음
    if (isFetching) return;
    await refetch2();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeFanart();
      changeFanart2();
    }, 10000);

    return () => clearInterval(interval);
  }, [changeFanart, changeFanart2]);

  // 태그 이미지 데이터 로딩
  const { data, isLoading, isFetching, refetch, status } = useTagImages(
    currentRoundTags[0]
  );
  const {
    data: data2,
    isLoading: isLoading2,
    isFetching: isFetching2,
    refetch: refetch2,
    status: status2,
  } = useTagImages(currentRoundTags[1]);

  if (isLoading || isLoading2) {
    // return <div>loading</div>;
    return null;
  }
  if (isLast) {
    return (
      <div className="w-full">
        <div className="fixed inset-0 top-[60px] z-[201] size-full">
          <Confetti width={width} height={height} />
        </div>
        <div className="flex size-full w-full items-center">
          <div className="relative flex h-full w-1/2 flex-col items-center justify-center">
            <div className="absolute top-0 z-[4] flex w-full items-center justify-center bg-blackAlpha-400 py-2 text-2xl text-white 2xs:text-3xl md:text-5xl">
              고세구 태그 팬아트 월드컵 우승
            </div>
            <div className="flex w-full items-center justify-center">
              <div className="h-full w-1/2">
                <img
                  className="bg-gray-700"
                  src={`fanart_info${winInfo.direction === 'left' ? data : data2}`}
                  alt="test"
                />
              </div>
            </div>
            <button
              className="absolute bottom-[-60px] z-[202] h-[60px] w-full border border-gray-300 bg-teal-200 text-xl font-bold text-black-200 hover:bg-teal-300 active:bg-teal-400 disabled:cursor-not-allowed"
              onClick={() => {
                if (winInfo.direction === 'left') {
                  changeFanart();
                } else {
                  changeFanart2();
                }
              }}
              disabled={winInfo.direction === 'left' ? isFetching : isFetching2}
            >
              <div className="flex items-center justify-center">
                <IoMdRefresh
                  className={`mr-1 ${winInfo.direction === 'left' ? isFetching : isFetching2 ? 'animate-spin' : ''}`}
                />
                새로고침
              </div>
            </button>
            <h4 className="absolute bottom-[20%] text-3xl text-shadow-worldCup">
              {winInfo.direction === 'left'
                ? currentRoundTags[0]
                : currentRoundTags[1]}
            </h4>
          </div>
          <div className="mt-10 flex w-1/2 flex-col items-center justify-center text-2xl">
            <h2 className="mb-6 text-4xl">도와주신 작가님들</h2>
            {/* {CREDIT.map((author) => (
              <p key={author} className="w-1/3">
                {author}
              </p>
            ))} */}
            <div className="flex flex-wrap">
              {CREDIT.map((author, index) => (
                <div key={author} className="w-1/3">
                  <p className="writing-vertical-rl text-center">{author}</p>
                </div>
              ))}
            </div>
            <h2 className="mb-6 mt-10 text-4xl">팀 리파인드 제작</h2>
            <Image
              src={RefindLogo}
              alt="리파인드 로고"
              width={100}
              height={100}
              priority
              unoptimized
            />
            <p className="mt-6 text-center">
              세구님 방송 3주년 진심으로 축하드립니다!
            </p>
            <p className="text-center">
              세구님의 모든 망상이 현실이 되는 그날까지 늘 곁에서
              응원하겠습니다. 킹아!
            </p>
          </div>
        </div>
      </div>
    );
  }
  const title =
    currentRound.gang === 2
      ? '결승'
      : `${currentRound.gang}강 (${currentRound.round} /
    ${currentRound.gang / 2})`;
  return (
    <div className="relative w-full">
      <div className="absolute top-0 z-[4] flex w-full items-center justify-center bg-blackAlpha-400 py-2 text-2xl text-white 2xs:text-3xl md:text-5xl">
        {`고세구 태그 팬아트 월드컵 ${title}`}
      </div>
      <div className="relative flex size-full items-center justify-center">
        <div
          className="flex h-full max-h-full w-1/2 max-w-[50%] flex-col items-center justify-center"
          onClick={() => {
            handleTagSelect(currentRoundTags[0]);
            setWinInfo({ ...winInfo, direction: 'left' });
          }}
        >
          <img
            className="bg-gray-700"
            src={`https://rerurureruru.com${data}`}
            alt="test"
            style={{
              height: height - 100,
            }}
          />
        </div>
        <div
          className="flex h-full max-h-full w-1/2 max-w-[50%] flex-col items-center justify-center"
          onClick={() => {
            handleTagSelect(currentRoundTags[1]);
            setWinInfo({ ...winInfo, direction: 'right' });
          }}
        >
          <img
            className="bg-gray-700"
            src={`https://rerurureruru.com${data2}`}
            alt="test"
            style={{
              height: height - 100,
            }}
          />
        </div>
        <div className="absolute bottom-0 z-[6] h-[60px] w-full text-xl font-semibold">
          <button
            className="h-full w-1/2 border border-r-0 border-gray-300 bg-red-200 font-bold text-black-200 hover:bg-red-300 active:bg-red-400 disabled:cursor-not-allowed"
            onClick={changeFanart}
            disabled={isFetching}
          >
            <div className="flex items-center justify-center">
              <IoMdRefresh
                className={`mr-1 ${isFetching ? 'animate-spin' : ''}`}
              />
              새로고침
            </div>
          </button>
          <button
            className="h-full w-1/2 border border-gray-300 bg-blue-200 font-bold text-black-200 hover:bg-blue-300 active:bg-blue-400 disabled:cursor-not-allowed"
            onClick={changeFanart2}
            disabled={isFetching2}
          >
            <div className="flex items-center justify-center">
              <IoMdRefresh
                className={`mr-1 ${isFetching2 ? 'animate-spin' : ''}`}
              />
              새로고침
            </div>
          </button>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-[30%] left-0 z-[4] flex h-32 max-h-[50%] w-full justify-center xl:bottom-[40%]">
        <div className="absolute h-[33px] w-[50px] 2md:h-[77px] 2md:w-[100px] xl:h-[154px] xl:w-[200px]">
          <Image src={VS} alt="vs" priority fill unoptimized />
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-[20%] left-0 z-[4] max-h-[50%] w-full text-2xl text-white text-shadow-worldCup 2xs:text-3xl md:text-5xl">
        <p className="inline-block w-1/2 pr-[15%] text-right">
          {currentRoundTags[0]}
        </p>
        <p className="inline-block w-1/2 pl-[15%] text-left">
          {currentRoundTags[1]}
        </p>
      </div>
    </div>
  );
}
