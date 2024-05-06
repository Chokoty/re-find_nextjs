'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

import RecommendList from '@/app/artwork/components/Recommend/RecommendList';
import Tooltip from '@/components/Tooltip';

const AP = [0.5, 1.0, 1.5];

const buttonStyle = [
  {
    background: 'rgba(135, 199, 124, 0.53)',
    border: '4px solid rgba(135, 199, 124)',
    size: '50px',
    location: 'left',
    iconSize: '16px',
  },
  {
    background: 'rgba(157, 157, 157, 0.53)',
    border: '4px solid rgba(157, 157, 157)',
    size: '38px',
    location: 'center',
    iconSize: '12px',
  },
  {
    background: 'rgba(177, 128, 239, 0.53)',
    border: '4px solid rgba(177, 128, 239)',
    size: '50px',
    location: 'right',
    iconSize: '16px',
  },
];

export default function Recommend() {
  const [paramStep, setParamStep] = useState([false, true, false]); // 대중픽, 기본픽, 나작픽
  const getAp = () => {
    return AP[paramStep.findIndex((v) => v)];
  };
  const handleButtonClick = (buttonPosition: string) => {
    if (buttonPosition === 'left') {
      setParamStep([true, false, false]);
    } else if (buttonPosition === 'center') {
      setParamStep([false, true, false]);
    } else {
      setParamStep([false, false, true]);
    }
  };
  return (
    <div className="mt-14 flex w-full flex-col items-center justify-center">
      <h4 className="text-2xl font-bold">유사 이미지 추천</h4>
      <div className="mt-4 flex flex-col items-center justify-center">
        {/* <Text>관련된 추천 게시글을 주세요</Text> */}
        <div className="flex items-center justify-center">
          <Tooltip label="좋아요 패턴이 비슷한 게시글을 추천">
            <p className="text-sm 2xs:text-base">대중픽</p>
          </Tooltip>
          <div className="mx-2 flex items-center justify-center gap-4 2xs:mx-4 2xs:gap-7">
            {AP.map((_, i) => (
              <button
                key={i}
                className={clsx(
                  'flex items-center justify-center rounded-full border-4 text-white transition hover:bg-whiteAlpha-500',
                  {
                    'text-4 size-[50px] border-green-300': i === 0,
                    'text-3 size-[38px] border-gray-300': i === 1,
                    'text-4 size-[50px] border-purple-300': i === 2,
                    'bg-green-600': i === 0 && paramStep[i],
                    'bg-gray-600': i === 1 && paramStep[i],
                    'bg-purple-600': i === 2 && paramStep[i],
                    'bg-white': !paramStep[i],
                  }
                )}
                onClick={() => handleButtonClick(buttonStyle[i].location)}
              >
                {paramStep[i] && <FaCheck />}
              </button>
            ))}
          </div>
          <Tooltip label="좋아요 패턴이 잘 안 겹치는 게시글을 추천">
            <p className="text-sm 2xs:text-base">나작픽</p>
          </Tooltip>
        </div>
      </div>
      <div className="mt-8 w-full overflow-hidden px-2">
        <RecommendList getAp={getAp} />
      </div>
    </div>
  );
}
