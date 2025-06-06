'use client';

import DeveloperProfileCard from '@/app/more/components/Card/DeveloperProfileCard';
import {
  CONTRIBUTE_COLORS,
  DEFAULT_CREDIT_COLOR,
  DEVELOPERS,
} from '@/app/more/lib/const';
import useBetweenWidthRange from '@/hooks/useBetweenWidthRange';
import { useSideMenuStore } from '@/store/sideMenuStore';

type Prop = {
  type: 'member' | 'credit';
};

export default function ProfileList({ type }: Prop) {
  const { isOpen } = useSideMenuStore();
  const shouldApplySideMenuLayout = useBetweenWidthRange(768, 1013) && isOpen;
  const members = DEVELOPERS.filter((item) => item.group === type);
  const title = type === 'member' ? '팀 멤버' : '크레딧';
  return (
    <div className="mt-8 flex w-full flex-col items-center justify-center">
      <h2 className="my-6 text-2xl font-semibold">{title}</h2>
      {/* <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3"> */}
      <div
        className={`grid grid-cols-1 gap-3 ${
          shouldApplySideMenuLayout
            ? 'grid-cols-1'
            : 'sm:grid-cols-2 2xl:grid-cols-3'
        }`}
      >
        {members.map((item, index) => (
          <DeveloperProfileCard
            key={index}
            writerURL={item.writerURL}
            profURL={item.profURL}
            nickname={item.nickname}
            board={item.contribute}
            group={type}
          />
        ))}
      </div>
    </div>
  );
}
