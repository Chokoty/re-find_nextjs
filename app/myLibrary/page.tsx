import ArtistTimelineShelf from '@/app/myLibrary/components/ArtistTimelineShelf';
import CustomAlbums from '@/app/myLibrary/components/CustomAlbums';
import LikeArtistShelf from '@/app/myLibrary/components/LikeArtistShelf';
import LikeFanartShelf from '@/app/myLibrary/components/LikeFanartShelf';

export default function MyLibrary() {
  return (
    <div className="w-full p-2">
      <div className="w-full rounded-xl border-[1px] border-dark-myText bg-white shadow-sm dark:border-0 dark:bg-dark-card">
        <div className="w-full pt-4">
          <h1 className="mb-10 mt-1.5 break-keep p-10 font-pop text-4xl sm:text-5xl 2md:text-6xl lg:text-7xl 2xl:text-8xl">
            내 라이브러리
          </h1>
        </div>
        <section className="relative">
          <LikeArtistShelf />
          <ArtistTimelineShelf />
          <LikeFanartShelf />
          <CustomAlbums />
        </section>
      </div>
    </div>
  );
}
