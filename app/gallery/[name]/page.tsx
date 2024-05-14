import type { Metadata } from 'next';

import DetailedGallery from '@/app/gallery/components/DetailedGallery';
import GalleryTitle from '@/app/gallery/components/GalleryTitle';
import TopBackground from '@/app/gallery/components/TopBackground';
import GALLERY_LIST, { MEMBERS } from '@/app/gallery/lib/const';
import queryOptions from '@/app/gallery/service/client/queries';
import { siteConfig } from '@/lib/config';
import { getDehydratedInfiniteQuery, Hydrate } from '@/lib/react-query';

type Params = { params: { name: string } };

// Image url 고민
export function generateMetadata({ params: { name } }: Params): Metadata {
  const { title, description, url } = siteConfig.gallery.detailed(name);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: siteConfig.type,
      images: siteConfig.image,
      siteName: siteConfig.siteName,
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      site: siteConfig.siteName,
      creator: siteConfig.creator,
      images: siteConfig.image,
    },
    icons: siteConfig.icons,
  };
}

export default async function page({ params: { name } }: Params) {
  const endpoint =
    MEMBERS.find((item) => item.value === name)?.query ||
    GALLERY_LIST.find((item) => item.value === name)?.query;

  if (!process.env.NEXT_PUBLIC_IS_LOCAL) {
    // name이 isdPick이면 isdNoticeArtworks를 호출하고, 그렇지 않으면 galleryArtworks를 호출한다.
    const { queryKey, queryFn } =
      name === 'isdPick'
        ? queryOptions.isdNoticeArtworks({ member: 'isd', ranktype: 'latest' })
        : queryOptions.galleryArtworks({
            query: endpoint ?? '',
            sortType: 'alzaltak',
          });

    // 쿼리 생성
    const query = await getDehydratedInfiniteQuery({
      queryKey,
      queryFn,
      initialPageParam: 1,
    });

    return (
      <div className="w-full">
        <TopBackground>
          <GalleryTitle pageType={name} />
        </TopBackground>
        <section className="relative top-[-50px] z-[2] w-full 2xs:top-[-100px] md:top-[-108px] 2md:top-[-180px] xl:top-[-220px]">
          <Hydrate state={{ queries: [query] }}>
            <DetailedGallery value={name} endpoint={endpoint ?? ''} />
          </Hydrate>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full">
      <TopBackground>
        <GalleryTitle pageType={name} />
      </TopBackground>
      {/* -220px(-60px + -160px) */}
      <section className="relative top-[-50px] z-[2] w-full 2xs:top-[-100px] md:top-[-108px] 2md:top-[-180px] xl:top-[-220px]">
        <DetailedGallery value={name} endpoint={endpoint ?? ''} />
      </section>
    </div>
  );
}
