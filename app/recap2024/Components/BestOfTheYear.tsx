import Image, { type StaticImageData } from 'next/image';

import { newIne } from '@/lib/images';

export default function BestOfTheYear({ artist }: { artist?: string }) {
  return (
    <div className="mt-[70px] flex flex-col items-center">
      <h3 className="font-sbAggro text-5xl font-bold">올해의 베스트 팬아트</h3>
      <h4 className="mb-12 mt-2 text-3xl">
        왁물원 기준 조회수, 좋아요, 댓글수 1위
      </h4>
      <div className="flex items-center justify-center gap-5">
        <FanartInfo type="view" imgUrl={newIne} cnt={234} />
        <FanartInfo type="like" imgUrl={newIne} cnt={456} />
        <FanartInfo type="comment" imgUrl={newIne} cnt={3231} />
      </div>
      <div>
        <div>
          <span></span>
          <span></span>
        </div>
        {/* BarChart */}
        {/* 증가율이 0보다 작을 경우 제외 */}
        <div>
          <span></span>
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
  imgUrl: string | StaticImageData;
  cnt: number;
}) => {
  const altObj = {
    like: '올해 베스트 조회수 팬아트',
    view: '올해 베스트 좋아요 팬아트',
    comment: '올해 베스트 댓글수 팬아트',
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src={
          // newIne === '' ? 'https://placehold.co/375x375' : modifiedUrl300
          imgUrl
        }
        alt={altObj[type]}
        width={800} // 적절한 너비 (커스터마이징 가능)
        height={800} // 적절한 높이 (커스터마이징 가능)
        className="  h-[450px] w-[300px] bg-[#f5f5f5] object-cover"
        placeholder="blur" // 블러 처리 옵션
        unoptimized
      />
      <p className="text-xl font-bold">
        {type === 'like' ? '좋아요' : type === 'view' ? '조회수' : '댓글수'}
        <span className="ml-1">{cnt}</span>
        <span>{type === 'view' ? '회' : '개'}</span>
      </p>
    </div>
  );
};
