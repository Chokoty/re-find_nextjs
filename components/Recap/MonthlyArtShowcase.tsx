'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { MonthlyResult } from '@/app/recap2024/lib/convertBestArticleToMonthlyArray';

export default function MonthlyArtShowcase({
  artist,
  imageUrls,
}: {
  artist?: string;
  imageUrls: MonthlyResult[];
}) {
  // const modifiedUrl300 = useModifiedImageUrl({
  //   url: img_url_list[0],
  //   size: 300,
  // });

  return (
    <div className="mx-auto mb-20 mt-28 flex w-[90%] flex-col items-center justify-between">
      <div className="flex w-full flex-col items-start justify-center">
        <h2 className="items-start justify-center text-center font-sbAggro  text-[10px] font-bold leading-tight 2xs:text-[20px] md:text-[30px] lg:text-[60px]">
          2024년 연말 정산
        </h2>
        <p className="text-start text-3xl text-whiteAlpha-600">
          월별 베스트 팬아트(왁물원 기준 좋아요, 조회수, 댓글수 종합)
        </p>
      </div>
      <div className="mt-8 grid grid-cols-6 gap-4">
        {imageUrls.map(({ month, id, img_url }, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <p className="mt-2 text-3xl font-bold text-white">{month}월</p>
            <Link href={`/artwork/${id}`}>
              <Image
                src={
                  img_url === ''
                    ? 'https://placehold.co/375x375'
                    : `http://proxy.nxtmnt.cc:8080/${img_url}`
                }
                alt={`${month} 팬아트`}
                width={800}
                height={800}
                className="  bg-[#f5f5f5] object-cover"
                style={{ objectFit: 'cover', height: '400px', width: '200px' }}
                unoptimized
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
