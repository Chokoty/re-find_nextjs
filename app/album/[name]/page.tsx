import type { Metadata } from 'next';
import { Suspense } from 'react';

import DetailedGallery from '@/app/album/components/DetailedGallery';
import GalleryTitle from '@/app/album/components/GalleryTitle';
import TopBackground from '@/app/album/components/TopBackground';
import queryOptions from '@/app/album/service/client/queries';
import { siteConfig } from '@/lib/config';
import { getDehydratedInfiniteQuery, Hydrate } from '@/lib/react-query';

type Params = { params: { name: string } };

// Image url 고민
export function generateMetadata({ params: { name } }: Params): Metadata {
  const { title, description, url } = siteConfig.album.detailed(name);
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
  if (!process.env.NEXT_PUBLIC_IS_LOCAL) {
    const { queryKey, queryFn } = queryOptions.galleryArtworks({
      // query: endpoint ?? '',
      galleryType: name,
      // sortType: 'alzaltak',
      sortType: 'latest',
    });
    // 쿼리 생성
    const query = await getDehydratedInfiniteQuery({
      queryKey,
      queryFn,
      initialPageParam: 1,
    });

    return (
      <div className="w-full">
        <TopBackground pageName={name}>
          <Suspense>
            <GalleryTitle pageName={name} />
          </Suspense>
        </TopBackground>
        <section className="relative top-[-50px] z-[2] w-full 2xs:top-[-200px] sm:top-[-80px] md:top-[-120px] 2md:top-[-150px] lg:top-[-160px] xl:top-[-280px] 2xl:top-[-240px]">
          <Hydrate state={{ queries: [query] }}>
            <Suspense>
              <DetailedGallery value={name} />
            </Suspense>
          </Hydrate>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full">
      <TopBackground pageName={name}>
        <Suspense>
          <GalleryTitle pageName={name} />
        </Suspense>
      </TopBackground>
      {/* -220px(-60px + -160px) */}
      <section className="relative top-[-50px] z-[2] w-full 2xs:top-[-200px] sm:top-[-80px] md:top-[-120px] 2md:top-[-150px] lg:top-[-160px] xl:top-[-400px]">
        <Suspense>
          <DetailedGallery value={name} />
        </Suspense>
      </section>
    </div>
  );
}
