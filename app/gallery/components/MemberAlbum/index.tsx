'use client';

import MemberList from '@/app/gallery/components/MemberAlbum/MemberList';

export default function MemberAlbum() {
  return (
    <div
      className=" my-10 flex w-full flex-col p-2 md:px-3"
      style={{ userSelect: 'none' }}
    >
      <div className="mb-4 w-full md:mb-6 md:pl-6">
        <p className="text-left text-xl font-extrabold md:text-2xl">
          멤버별로 모아보기
        </p>
      </div>
      <MemberList />
    </div>
  );
}
