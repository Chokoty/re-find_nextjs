import Image from 'next/image';

import { useModifiedImageUrl } from '@/hooks/useModifiedImageUrl';
import type { BestFanart } from '@/types';

export default function BestOfTheYear({
  artist,
  data,
}: {
  artist?: string;
  data: BestFanart[];
}) {
  return (
    <div className="mt-[70px] flex flex-col items-center">
      <h3 className="font-sbAggro text-5xl font-bold">올해의 베스트 팬아트</h3>
      <h4 className="mb-12 mt-2 text-3xl">
        왁물원 기준 조회수, 좋아요, 댓글수 1위
      </h4>
      <div className="flex items-center justify-center gap-5">
        {data.map(({ id, imgUrl, type, cnt }) => (
          <FanartInfo key={id} type={type} imgUrl={imgUrl} cnt={cnt} />
        ))}
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
    <div className="flex flex-col items-center gap-2">
      <Image
        src={modifiedUrl800 ?? 'https://placehold.co/375x375'}
        alt={altObj[type]}
        width={800} // 적절한 너비 (커스터마이징 가능)
        height={800} // 적절한 높이 (커스터마이징 가능)
        className="  h-[450px] w-[300px] bg-[#f5f5f5] object-cover"
        unoptimized
      />
      <p className="text-xl font-bold">
        {type === 'like' ? '좋아요' : type === 'view' ? '조회수' : '댓글수'}
        <span className="ml-1">{cnt.toLocaleString('ko-KR')}</span>
        <span>{type === 'view' ? '회' : '개'}</span>
      </p>
    </div>
  );
};
