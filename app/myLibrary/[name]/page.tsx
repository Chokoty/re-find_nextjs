// TODO: 로그인된 사용자만 접근 가능하도록 수정하기

import DetailedGallery from '@/app/album/components/DetailedGallery';
import ArtistList from '@/app/myLibrary/components/ArtistList';
import BackToLibraryLink from '@/app/myLibrary/components/BackToLibraryLink';
import CommonTitle from '@/app/myLibrary/components/CommonHeader';
import CustomAlbumsList from '@/app/myLibrary/components/CustomAlbumsList';

type Params = { params: { name: string } };

const SECTION_CONFIG: Record<
  string,
  { header?: string; content: React.ReactNode }
> = {
  likeArtist: {
    content: <ArtistList />,
  },
  artistTimeline: {
    header: '구독중인 작가 팬아트 타임라인',
    content: <DetailedGallery value="artistTimeline" />,
  },
  likedFanarts: {
    header: '좋아요한 팬아트',
    content: <DetailedGallery value="likedFanarts" />,
  },
  customAlbums: {
    content: <CustomAlbumsList />,
  },
};

export default function Page({ params: { name } }: Params) {
  const section = SECTION_CONFIG[name];

  return (
    <div className="w-full">
      <div className="mt-8 flex size-full flex-col px-8">
        {section ? (
          <>
            <BackToLibraryLink
              hasRightButton={
                name === 'likedFanarts' || name === 'artistTimeline'
              }
            />
            {section.header && <CommonTitle title={section.header} />}
            {section.content}
          </>
        ) : (
          <div>Invalid name</div>
        )}
      </div>
    </div>
  );
}
