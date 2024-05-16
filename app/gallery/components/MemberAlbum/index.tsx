'use client';

import MemberList from '@/app/gallery/components/MemberAlbum/MemberList';

export default function MemberAlbum() {
  return (
    <div className="mt-20 flex size-full flex-col px-8 md:mt-28">
      <div className="mb-4 w-full md:mb-6">
        <p className="text-left text-2xl font-extrabold md:text-4xl">
          멤버별 앨범 모아보기
        </p>
      </div>
      <MemberList />
    </div>
  );
}
