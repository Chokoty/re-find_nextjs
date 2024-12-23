'use client';

import MemberList from '@/app/gallery/components/MemberAlbum/MemberList';

export default function MemberAlbum() {
  return (
    <div className="mt-20 flex size-full flex-col md:mt-28 p-2 md:px-6">
      <div className="mb-4 w-full md:mb-6">
        <p className="text-left text-xl font-extrabold md:text-2xl">
          멤버별 앨범 모아보기
        </p>
      </div>
      <MemberList />
    </div>
  );
}
