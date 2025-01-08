import Image from 'next/image';
import Link from 'next/link';

import type { StatisticsData } from '@/app/recap2024/page';
import {
  getFormattedNumber,
  getUnit,
} from '@/hooks/useFormatNumberToCompactString';
import { useModifiedImageUrl } from '@/hooks/useModifiedImageUrl';
import type { BestFanart } from '@/types';

export default function BestOfTheYear({
  artist,
  data,
}: {
  artist?: string;
  data: BestFanart;
}) {
  const modifiedUrl800 = useModifiedImageUrl({
    url: data.img_url,
    size: 800,
  });

  const vlc = [
    {
      title: '조회수',
      value: getFormattedNumber(data.views),
      unit: getUnit(data.views),
    },
    {
      title: '좋아요',
      value: getFormattedNumber(data.likes),
      unit: getUnit(data.likes),
    },
    {
      title: '댓글수',
      value: getFormattedNumber(data.comments),
      unit: getUnit(data.comments),
    },
  ] as StatisticsData;

  return (
    <div className="mt-[70px]  flex flex-col items-center">
      <h3 className="font-sbAggro text-5xl font-bold">올해의 베스트 팬아트</h3>
      <h4 className="mb-12 mt-2 text-3xl">
        왁물원 기준 조회수, 좋아요, 댓글수 종합 1위
      </h4>
      <div className="flex items-center justify-center gap-5">
        <div className="flex flex-col items-center gap-2 text-3xl">
          <Link href={`/artwork/${data.id}`}>
            <Image
              src={
                modifiedUrl800
                  ? `${process.env.NEXT_PUBLIC_PROXY_URL}/highres${modifiedUrl800}`
                  : 'https://placehold.co/375x375'
              }
              alt={'올해 베스트 팬아트'}
              width={800} // 적절한 너비 (커스터마이징 가능)
              height={800} // 적절한 높이 (커스터마이징 가능)
              className="h-[300px] w-[150px] bg-[#f5f5f5] object-cover lg:h-[500px] lg:w-[250px]"
              unoptimized
            />
          </Link>
          {/* <div className="flex items-center justify-center gap-4">
            <p className="">조회수 {data.views}회</p>
            <p className="">좋아요 {data.likes}개</p>
            <p className="">댓글 {data.comments}개</p>
          </div> */}
          <div className="mt-2 flex items-center justify-center gap-4 text-base sm:text-3xl lg:gap-8">
            {vlc.map(({ title, value, unit }) => (
              <p key={title} className="">
                {title}
                <span className="ml-2 text-green-highlight">
                  {value}
                  {unit}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const FanartInfo = ({
  type,
  imgUrl,
  cnt,
}: {
  type: 'like' | 'view' | 'comment';
  imgUrl: string;
  cnt: number;
}) => {
  const altObj = {
    like: '올해 베스트 조회수 팬아트',
    view: '올해 베스트 좋아요 팬아트',
    comment: '올해 베스트 댓글수 팬아트',
  };

  const modifiedUrl800 = useModifiedImageUrl({
    url: imgUrl,
    size: 800,
  });

  console.log('test', modifiedUrl800);

  return (
    <div className="flex flex-col items-center gap-2 text-3xl">
      <Image
        src={
          modifiedUrl800
            ? `http://proxy.nxtmnt.cc:8080/${modifiedUrl800}`
            : 'https://placehold.co/375x375'
        }
        alt={altObj[type]}
        width={800} // 적절한 너비 (커스터마이징 가능)
        height={800} // 적절한 높이 (커스터마이징 가능)
        className="  h-[450px] w-[300px] bg-[#f5f5f5] object-cover"
        unoptimized
      />
      <p className="">
        {type === 'like' ? '좋아요' : type === 'view' ? '조회수' : '댓글수'}
        <span className="ml-1">{cnt.toLocaleString('ko-KR')}</span>
        <span>{type === 'view' ? '회' : '개'}</span>
      </p>
    </div>
  );
};
