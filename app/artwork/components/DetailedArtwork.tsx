'use client';

import { useArtworkDetail } from '@/app/album/service/client/useGalleryService';
import Recommend from '@/app/artwork/components/Recommend';
import ContentSection from '@/app/artwork/components/section/ContentSection';
import ImageSection from '@/app/artwork/components/section/ImageSection';
import Alert from '@/components/Alert';
import BackToButton from '@/components/BackToButton';

export default function DetailedArtwork({ artworkId }: { artworkId: number }) {
  const { data: artworkInfo, isError, isLoading } = useArtworkDetail(artworkId);

  if (isLoading) {
    return <div>아티스트 정보를 가져오고 있습니다...</div>;
  }
  if (!artworkInfo) {
    return (
      <div className="mt-2 text-center">
        <p className="text-base 2xs:text-lg">존재하지 않는 작품입니다.</p>
      </div>
    );
  }

  const {
    title,
    img_url,
    img_url_list,
    id,
    author,
    board,
    date,
    prof_url,
    view,
    like,
    comment,
  } = artworkInfo;

  if (isError) {
    return <Alert />;
  }
  return (
    <div className="flex size-full flex-col items-center justify-center p-3">
      {/* 상단(정보 - 제목,작가,날짜,게시판, 말머리, vlc) */}
      <div className="relative hidden lg:block">
        <BackToButton />
      </div>
      <div className="md:border-light-card2 flex w-full max-w-[400px] flex-col items-center justify-center gap-4 rounded-[32px] p-4 shadow-sm md:max-w-[860px] md:flex-row md:items-start md:border-base">
        <ImageSection
          title={title}
          imgSrc={img_url}
          imgUrlList={img_url_list}
        />
        <ContentSection
          id={id}
          title={title}
          author={author}
          board={board}
          date={date}
          profileUrl={prof_url}
          view={view}
          like={like}
          comment={comment}
        />
      </div>
      {/* 하단(유사 이미지 추천) */}
      <Recommend />
    </div>
  );
}
