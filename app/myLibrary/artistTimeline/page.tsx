import type { Metadata } from 'next';
import { Suspense } from 'react';

import DetailedGallery from '@/app/gallery/components/DetailedGallery';
import GalleryTitle from '@/app/gallery/components/GalleryTitle';
import TopBackground from '@/app/gallery/components/TopBackground';
import GALLERY_LIST, {
  MEMBERS,
  UPDATED_GALLERY_LIST,
} from '@/app/gallery/lib/const';
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
    GALLERY_LIST.find((item) => item.id === name)?.query;

  if (!process.env.NEXT_PUBLIC_IS_LOCAL) {
    // name이 isdPick이면 isdNoticeArtworks를 호출하고, 그렇지 않으면 galleryArtworks를 호출한다.
    // const { queryKey, queryFn } =
    //   name === 'isdPick'
    //     ? queryOptions.isdNoticeArtworks({ member: 'isd', ranktype: 'latest' })
    //     : queryOptions.galleryArtworks({
    //         galleryType: endpoint ?? '',
    //         // sortType: 'alzaltak',
    //         sortType: 'latest',
    //       });

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
        <TopBackground>
          <GalleryTitle pageType={name} title="" description="" />
        </TopBackground>
        <section className="relative top-[-50px] z-[2] w-full 2xs:top-[-200px]  sm:top-[-80px] md:top-[-120px] 2md:top-[-150px] lg:top-[-160px] xl:top-[-280px] 2xl:top-[-240px]">
          <Hydrate state={{ queries: [query] }}>
            <Suspense>
              <DetailedGallery
                value={name}
                // endpoint={endpoint ?? ''}
              />
            </Suspense>
          </Hydrate>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full">
      <TopBackground>
        <GalleryTitle pageType={name} title="" description="" />
      </TopBackground>
      {/* -220px(-60px + -160px) */}
      <section className="relative top-[-50px] z-[2] w-full 2xs:top-[-200px]  sm:top-[-80px] md:top-[-120px] 2md:top-[-150px] lg:top-[-160px] xl:top-[-280px] 2xl:top-[-240px]">
        <Suspense>
          <DetailedGallery
            value={name}
            // endpoint={endpoint ?? ''}
          />
        </Suspense>
      </section>
    </div>
  );
}
