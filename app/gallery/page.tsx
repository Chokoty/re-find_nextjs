// import ThisWeekTop from '@/app/gallery/components/ThisWeekTop';
import BoardList from '@/app/gallery/components/BoardList';
import GalleryTitle from '@/app/gallery/components/GalleryTitle';
import MemberAlbum from '@/app/gallery/components/MemberAlbum';
import RefindPick from '@/app/gallery/components/RefindPick';
import TopBackground from '@/app/gallery/components/TopBackground';

export default function Gallery() {
  return (
    <div className="w-full">
      <TopBackground>
        <GalleryTitle pageType="galleryHome" />
      </TopBackground>
      <section
        // -220px(-60px + -160px)
        //   className="relative top-[-50px] z-[2] w-full 2xs:top-[-90px] md:top-[-120px] 2md:top-[-180px] xl:top-[-340px] 2xl:top-[-440px]"
        // >
        className="relative top-[-120px] z-[2] w-full xs:top-[-220px] 2xs:top-[-280px] sm:top-[-150px] md:top-[-160px]  lg:top-[-250px] xl:top-[-290px] 2xl:top-[-250px] p-2 "
      >
        <div className="w-full rounded-xl border-[1px] border-dark-myText bg-white shadow-sm dark:border-0 dark:bg-dark-card py-6">
          {/* <ThisWeekTop /> */}
          <RefindPick />
          <BoardList />
          <MemberAlbum />
        </div>
      </section>
    </div>
  );
}
