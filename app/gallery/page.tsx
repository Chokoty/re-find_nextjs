// import ThisWeekTop from '@/app/gallery/components/ThisWeekTop';
import BoardList from '@/app/gallery/components/BoardList';
import GalleryTitle from '@/app/gallery/components/GalleryTitle';
import MemberAlbum from '@/app/gallery/components/MemberAlbum';
import RefindPick from '@/app/gallery/components/RefindPick';

export default function Gallery() {
  return (
    <div className="w-full">
      <GalleryTitle
        pageType="galleryHome"
        title="팬아트 갤러리"
        description="왁물원에 올라온 모든 팬아트들을 한 곳에서!"
      />
      <RefindPick />
      <BoardList />
      <MemberAlbum />
    </div>
  );
}
