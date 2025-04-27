// TODO: 로그인된 사용자만 접근 가능하도록 수정하기

import DetailedGallery from '@/app/album/components/DetailedGallery';
import ArtistList from '@/app/myLibrary/components/ArtistList';
import BackToLibraryLink from '@/app/myLibrary/components/BackToLibraryLink';

type Params = { params: { name: string } };

interface SectionHeaderProps {
  title: string;
}

function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="mb-12 flex items-end justify-start gap-4">
      <p className="text-left text-xl font-extrabold md:text-3xl">{title}</p>
    </div>
  );
}

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
};

export default function Page({ params: { name } }: Params) {
  const section = SECTION_CONFIG[name];

  return (
    <div className="w-full">
      <div className="mt-8 flex size-full flex-col px-8">
        <BackToLibraryLink />
        {section ? (
          <>
            {section.header && <SectionHeader title={section.header} />}
            {section.content}
          </>
        ) : (
          <div>Invalid name</div>
        )}
      </div>
    </div>
  );
}
