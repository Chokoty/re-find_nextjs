'use client';

import Image from 'next/image';
import Link from 'next/link';

import StatisticCard from '@/app/recap2024/components/StatisticCard';
import type { MonthlyResult } from '@/app/recap2024/lib/convertBestArticleToMonthlyArray';
import type { StatisticsData } from '@/app/recap2024/page';
import { newIne } from '@/lib/images';

// const data = [
//   { title: '전체 팬아트 작가 수', value: 25951, unit: '' },
//   { title: '왁물원 총 팬아트 수', value: 5.4, unit: '만' },
//   { title: '총 조회 수', value: 8.4, unit: '천' },
//   { title: '총 좋아요 수', value: 8.4, unit: '천' },
//   { title: '총 댓글 수', value: 8.4, unit: '천' },
// ] as StatisticItem[];

export default function MonthlyArtShowcase({
  artist,
  imageUrls,
  statistics,
}: {
  artist?: string;
  imageUrls: MonthlyResult[];
  statistics: StatisticsData;
}) {
  // const modifiedUrl300 = useModifiedImageUrl({
  //   url: img_url_list[0],
  //   size: 300,
  // });

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
    <div className="mb-4 mt-28 flex flex-col items-center justify-between ">
      <div className="flex w-full flex-col items-start justify-center">
        <h2 className="items-start justify-center text-center font-sbAggro  text-[10px] font-bold leading-tight 2xs:text-[20px] md:text-[30px] lg:text-[60px]">
          2024년 연말 정산
        </h2>
        <p className="text-start text-3xl text-whiteAlpha-600">
          월별 베스트 팬아트(왁물원 기준 좋아요, 조회수, 댓글수 종합)
        </p>
      </div>
      <div className="mt-8 grid grid-cols-6 gap-4">
        {imageUrls.map(({ month, result }, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <p className="mt-2 text-3xl font-bold text-white">{month}월</p>
            <Link
              href={`/artwork/18872155`}
              // href={`https://cafe.naver.com/steamindiegame/${result}`}
              // target="_blank"
            >
              {/* TODO: 담다님이 이미지 url 던져주면 수정하기 */}
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
            </Link>
          </div>
        ))}
      </div>
      <div className="mb-4 mt-28 flex w-4/5 flex-col justify-center gap-4">
        <div className="flex w-full items-center justify-between gap-4">
          {statistics.slice(0, 3).map((item, index) => (
            <StatisticCard key={index} item={item} isWidthFixed={false} />
          ))}
        </div>
        <div className="flex w-full items-center justify-between gap-4">
          {statistics.slice(3, 5).map((item, index) => (
            <StatisticCard key={index} item={item} isWidthFixed={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
