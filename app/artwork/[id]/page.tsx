import type { Metadata } from 'next';

import Recommend from '@/app/artwork/components/Recommend';
import ContentSection from '@/app/artwork/components/section/ContentSection';
import ImageSection from '@/app/artwork/components/section/ImageSection';
import { getArtworkDetail } from '@/app/artwork/service/server';
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
  );
}
