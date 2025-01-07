'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { MonthlyResult } from '@/app/recap2024/lib/convertBestArticleToMonthlyArray';

export default function MonthlyArtShowcase({
  artist,
  imageUrls,
  isMonth,
}: {
  artist?: string;
  imageUrls: MonthlyResult[];
  isMonth?: boolean;
}) {
  // const modifiedUrl300 = useModifiedImageUrl({
  //   url: img_url_list[0],
  //   size: 300,
  // });

  return (
    <div className="mx-auto mt-14 flex w-[90%] flex-col items-center justify-between lg:mb-20 lg:mt-28">
      <div className="flex w-full max-w-screen-xl flex-col items-start justify-center">
        <h2 className="items-start justify-center text-center font-sbAggro  text-3xl font-bold leading-tight lg:text-6xl">
          2024년 연말 정산
        </h2>
        <p className="text-start text-base text-whiteAlpha-600 lg:text-3xl">
          {isMonth
            ? '월별 베스트 팬아트(왁물원 기준 좋아요, 조회수, 댓글수 종합)'
            : '연간 베스트 팬아트(왁물원 기준 좋아요, 조회수, 댓글수 종합)'}
        </p>
        <p className="mt-2 text-start text-base text-whiteAlpha-600 lg:text-xl">
          ※ 카페 억까로 인해 일부 썸네일이 누락될 수 있습니다.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-3  gap-4 lg:grid-cols-6">
        {imageUrls.map(({ month, id, img_url }, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <p className="mt-2 text-xl font-bold text-white lg:text-3xl">
              {month}
              {isMonth || !artist ? '월' : '위'}
            </p>
            <Link href={`/artwork/${id}`}>
              <Image
                src={
                  img_url === ''
                    ? 'https://placehold.co/375x375'
                    : `https://proxy.nxtmnt.cc:60024/${img_url}`
                }
                alt={`${month} 팬아트`}
                width={800}
                height={800}
                // className="  bg-[#f5f5f5] object-cover"
                className="h-[200px] w-[100px] bg-[#f5f5f5] object-cover lg:h-[400px] lg:w-[200px]"
                // style={{ objectFit: 'cover', height: '400px', width: '200px' }}
                unoptimized
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
