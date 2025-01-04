'use client';

import Image from 'next/image';

import StatisticCard from '@/app/recap2024/components/StatisticCard';
import { newIne } from '@/lib/images';

const data = [
  { title: '전체 팬아트 작가 수', value: '25,951' },
  { title: '왁물원 총 팬아트 수', value: '300만 4천' },
  { title: '총 조회 수', value: '8.4천' },
  { title: '총 좋아요 수', value: '8.4천' },
  { title: '총 댓글 수', value: '8.4천' },
];

export default function MonthlyArtShowcase({ artist }: { artist?: string }) {
  // const modifiedUrl300 = useModifiedImageUrl({
  //   url: img_url_list[0],
  //   size: 300,
  // });

  console.log(artist);
  const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  return (
    <div className="mb-4 mt-28 flex flex-col items-center justify-between border-4 border-red-900">
      <div className="flex w-full flex-col items-start justify-center">
        <h2 className="font-sbAggro items-start justify-center text-center text-[10px] font-bold leading-tight 2xs:text-[20px] md:text-[30px] lg:text-[60px]">
          2024년 연말 정산
        </h2>
        <p className="text-start text-3xl text-whiteAlpha-600">
          월별 베스트 팬아트(왁물원 기준 좋아요, 조회수, 댓글수 종합)
        </p>
      </div>
      <div className="mt-8 grid grid-cols-6 gap-4">
        {months.map((month, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <p className="mt-2 text-3xl font-bold text-white">{month}</p>
            <Image
              src={
                // newIne === '' ? 'https://placehold.co/375x375' : modifiedUrl300
                newIne
              }
              alt={`${month} 팬아트`}
              width={800} // 적절한 너비 (커스터마이징 가능)
              height={800} // 적절한 높이 (커스터마이징 가능)
              className="  bg-[#f5f5f5] object-cover"
              style={{ objectFit: 'cover', height: '400px', width: '200px' }}
              placeholder="blur" // 블러 처리 옵션
              unoptimized
            />
          </div>
        ))}
      </div>
      <div className="mb-4 mt-28 flex flex-col justify-center gap-4">
        <div className="flex w-full items-center justify-between gap-4">
          {data.slice(0, 2).map((item, index) => (
            <StatisticCard
              key={index}
              title={item.title}
              value={item.value}
              isWidthFixed={false}
            />
          ))}
        </div>
        <div className="flex w-full items-center justify-between gap-4">
          {data.slice(2, 5).map((item, index) => (
            <StatisticCard
              key={index}
              title={item.title}
              value={item.value}
              isWidthFixed={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
