'use client';

import Link from 'next/link';
import { MdInfoOutline, MdOutlineContactSupport } from 'react-icons/md';
import { PiGiftBold } from 'react-icons/pi';

import Title from '@/app/recap2024/title';
import AddToHomeScreenButton from '@/components/Button/AddToHomeScreenButton';
import ThemeToggleButton from '@/components/Button/ThemeToggleButton';

type ButtonProp = {
  href?: string;
  icon: JSX.Element;
  text: string;
};

interface StatisticCardProps {
  title: string;
  value: string;
}

const containerClassName =
  'shadow-base dark:shadow-none flex h-32 w-36 cursor-pointer flex-col items-center justify-between rounded-2xl bg-white dark:bg-dark-card p-4 transition hover:bg-gray-200 dark:hover:bg-whiteAlpha-300 active:bg-gray-300 dark:active:bg-whiteAlpha-400';
const iconWrapperClassName = 'p-2';
const buttonClassName = 'text-xl font-semibold';
const iconClassName = 'size-8';

const data = [
  { title: '전체 페이지뷰', value: '33만' },
  { title: '왁물원 유입 수', value: '21.8만' },
  { title: '사이트 방문자 수', value: '3.3만' },
  { title: '재방문자 수', value: '8.4천' },
];

export default function RefindRecap() {
  return (
    <div className="flex w-full flex-col gap-4 p-8">
      <div className="flex items-center justify-between gap-4">
        <Title artist={''} />
        {/* <Title artist={'아크네르'} /> */}
        <div className="flex flex-col ">
          <h2 className="flex flex-col items-start justify-center text-center font-pop text-[40px] font-bold leading-tight 2xs:text-[50px] md:text-[80px] lg:text-[100px]">
            93,145
          </h2>
          <p className="text-center text-xl font-semibold">
            개의 원본을 찾았습니다.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        {data.map((item, index) => (
          <StatisticCard key={index} title={item.title} value={item.value} />
        ))}
      </div>
      <div>
        <p className="text-center text-xl font-semibold">
          10명 중 7명은 왁물원 접속
        </p>
        <p className="text-center text-xl font-semibold">10명 중 3명은 단골</p>
      </div>
    </div>
  );
}

const StatisticCard = ({ title, value }: StatisticCardProps) => {
  return (
    <div className="flex h-[200px] w-[312px] flex-col items-center justify-center bg-whiteAlpha-300">
      <h2 className="font-pop text-[80px] font-bold">{value}</h2>
      <p className="text-[30px]">{title}</p>
    </div>
  );
};
