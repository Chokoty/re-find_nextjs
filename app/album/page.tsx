// import ThisWeekTop from '@/app/album/components/ThisWeekTop';
import { Suspense } from 'react';

import BoardList from '@/app/album/components/BoardList';
import GalleryTitle from '@/app/album/components/GalleryTitle';
import MemberAlbum from '@/app/album/components/MemberList';
import RefindPick from '@/app/album/components/RefindPick';
import TopBackground from '@/app/album/components/TopBackground';

export default function Gallery() {
  return (
    <div className="w-full">
      <TopBackground pageName="galleryHome">
        <Suspense>
          <GalleryTitle
            pageName="galleryHome"
            // title="팬아트 갤러리"
            // description="왁물원에 올라온 모든 팬아트들을 한 곳에서!"
          />
        </Suspense>
      </TopBackground>
      <section
        // -220px(-60px + -160px)
        //   className="relative top-[-50px] z-[2] w-full 2xs:top-[-90px] md:top-[-120px] 2md:top-[-180px] xl:top-[-340px] 2xl:top-[-440px]"
        // >
        className="relative top-[-120px] z-[2] w-full p-2 xs:top-[-220px] 2xs:top-[-280px] sm:top-[-150px] md:top-[-160px] lg:top-[-250px] xl:top-[-290px] 2xl:top-[-250px]"
      >
        <div className="w-full rounded-xl border-[1px] border-dark-myText bg-white py-6 shadow-sm dark:border-0 dark:bg-dark-card">
          {/* <ThisWeekTop /> */}
          <RefindPick />
          <BoardList />
          <MemberAlbum />
        </div>
      </section>
    </div>
  );
}
