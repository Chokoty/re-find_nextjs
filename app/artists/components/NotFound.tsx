import Image from 'next/image';

import { NotSearch } from '@/lib/images';

export default function NotFound({ nickname }: { nickname: string }) {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <p className="text-2xl font-semibold 2xs:text-4xl">
        {`'${nickname}' 님의 프로필`}
      </p>
      <div className="mt-8 flex flex-col items-center justify-center">
        <Image
          src={NotSearch}
          alt="찾을 수 없음"
          width={200}
          height={200}
          unoptimized
          priority
        />
        <div className="mt-2 text-center">
          <p className="text-base 2xs:text-lg">존재하지 않는 아이디 이거나</p>
          <p className="text-base 2xs:text-lg">
            아직 업로드한 작품이 없는 것 같네요
          </p>
        </div>
      </div>
    </div>
  );
}
