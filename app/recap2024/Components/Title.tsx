'use client';

export default function Title({ artist }: { artist?: string }) {
  return (
    <div className="flex h-full flex-col items-start justify-end">
      {artist ? (
        <h2 className="flex flex-col items-start justify-center text-center font-sbAggro text-[10px] font-bold leading-tight text-pink-highlight 2xs:text-[20px] md:text-[30px] lg:text-[40px]">
          {artist}님의
        </h2>
      ) : null}
      <h2 className="flex flex-col items-start justify-end text-center font-sbAggro text-[40px] font-bold leading-tight 2xs:text-[50px] md:text-[60px] lg:text-[80px]">
        <span>2024년</span>
        <span>
          <span className="text-green-highlight">리파인드</span> 돌아보기
        </span>
      </h2>
    </div>
  );
}
