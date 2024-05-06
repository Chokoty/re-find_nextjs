import { Modal } from '@/app/@ArtworkModal/(.)artwork/[id]/modal';
import Recommend from '@/app/artwork/components/Recommend';
import ContentSection from '@/app/artwork/components/section/ContentSection';
import ImageSection from '@/app/artwork/components/section/ImageSection';
import { getArtworkDetail } from '@/app/artwork/service/server';

type Params = { params: { id: string } };

// 기존 모달 시스템과 달리 page용 모달을 return해줘야하므로 따로 작성
// 추후 modal로 변경하기
export default async function ArtworkModal({ params: { id } }: Params) {
  const artwork = await getArtworkDetail(parseInt(id));
  return (
    <Modal>
      <div className="flex size-full flex-col px-5 py-12">
        {/* 상단(정보 - 제목,작가,날짜,게시판, 말머리, vlc) */}
        <div className="flex w-full flex-col items-center justify-center gap-4 p-4 md:flex-row md:items-start md:p-0">
          <ImageSection
            title={artwork.title}
            imgSrc={artwork.img_url}
            imgUrlList={artwork.img_url_list}
          />
          <ContentSection
            id={artwork.id}
            title={artwork.title}
            author={artwork.author}
            board={artwork.board}
            date={artwork.date}
            profileUrl={artwork.prof_url}
            view={artwork.view}
            like={artwork.like}
            comment={artwork.comment}
          />
        </div>
        {/* 하단(유사이미지 추천) */}
        <Recommend />
      </div>
    </Modal>
  );
}
