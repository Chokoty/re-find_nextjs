'use client';

import Counter from '@/app/recap2024/components/Counter';
import StatisticCard from '@/app/recap2024/components/StatisticCard';
import Title from '@/app/recap2024/components/Title';

const data = [
  { title: '전체 페이지뷰', value: '33만' },
  { title: '왁물원 유입 수', value: '21.8만' },
  { title: '사이트 방문자 수', value: '3.3만' },
  { title: '재방문자 수', value: '8.4천' },
];

export default function TopContent({ artist }: { artist?: string }) {
  return (
    <div className="flex flex-col items-center justify-between border-4 border-red-900">
      <div className="flex w-full items-center justify-between gap-4">
        <Title artist={artist} />
        {/* <Title artist={'아크네르'} /> */}
        <Counter />
      </div>
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2"> */}
      <div className="mb-4 mt-28 flex flex-wrap justify-center gap-4">
        {data.map((item, index) => (
          <StatisticCard key={index} title={item.title} value={item.value} />
        ))}
      </div>
      <div className="flex w-full items-center justify-center gap-16 text-green-highlight">
        <p className="w-2/5 text-center text-3xl font-semibold text-green-highlight ">
          10명 중 7명은 왁물원 접속
        </p>
        <p className="w-2/5 text-center text-3xl font-semibold">
          10명 중 3명은 리파인드 단골 (감사합니다)
        </p>
      </div>
    </div>
  );
}
