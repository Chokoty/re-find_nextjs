import type { Metadata } from 'next';

import Recommend from '@/app/artwork/components/Recommend';
import ContentSection from '@/app/artwork/components/section/ContentSection';
import ImageSection from '@/app/artwork/components/section/ImageSection';
import { getArtworkDetail } from '@/app/artwork/service/server';
import BackToButton from '@/components/BackToButton';
import LeftSection from '@/components/LeftSection';
import PageContentForMore from '@/components/PageContentForMore';
import { siteConfig } from '@/lib/config';

type Params = { params: { id: string } };

export async function generateMetadata({
  params: { id },
}: Params): Promise<Metadata> {
  const itemData = await getArtworkDetail(parseInt(id));
  const { title, description, imageUrl, path } = siteConfig.artwork(itemData);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: path,
      type: siteConfig.type,
      images: imageUrl,
      siteName: siteConfig.siteName,
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      site: siteConfig.siteName,
      creator: siteConfig.creator,
      images: imageUrl,
    },
    icons: siteConfig.icons,
  };
}

export default async function ArtworkPage({ params: { id } }: Params) {
  const artwork = await getArtworkDetail(parseInt(id));
  return (
    <div className="flex w-full flex-col items-center justify-start">
      {/** 모바일 레이아웃 */}
      <div className="flex w-full flex-col items-center justify-center pb-[60px] md:hidden">
        <ArtworkDetail artwork={artwork} />
      </div>

      {/** 데스크톱 레이아웃 */}
      <div className="mx-auto mt-1 hidden h-[calc(100vh-72px)] w-full items-start justify-center gap-2 overflow-hidden px-2 md:flex">
        <LeftSection />
        <PageContentForMore>
          <ArtworkDetail artwork={artwork} />
        </PageContentForMore>
      </div>
    </div>
  );
}

/** ✅ ArtworkDetail 컴포넌트 분리 */
function ArtworkDetail({ artwork }: { artwork: any }) {
  return (
    <div className="flex size-full flex-col items-center justify-center p-3">
      {/* 상단(정보 - 제목,작가,날짜,게시판, 말머리, vlc) */}
      <div className="relative hidden lg:block">
        <BackToButton />
      </div>
      <div className="border-light-card2 flex w-full max-w-[400px] flex-col items-center justify-center gap-4 rounded-[32px] border-base p-4 shadow-sm md:max-w-[860px] md:flex-row md:items-start">
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
      {/* 하단(유사 이미지 추천) */}
      <Recommend />
    </div>
  );
}
