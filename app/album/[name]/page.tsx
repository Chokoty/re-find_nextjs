import type { Metadata } from 'next';

import DetailedGallery from '@/app/album/components/DetailedGallery';
import GalleryTitle from '@/app/gallery/components/GalleryTitle';
import TopBackground from '@/app/gallery/components/TopBackground';
import queryOptions from '@/app/gallery/service/client/queries';
import { getGalleryPageInfo } from '@/app/gallery/service/server';
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
  // const endpoint =
  // MEMBERS.find((item) => item.value === name)?.query ||
  // GALLERY_LIST.find((item) => item.id === name)?.query ||
  // UPDATED_GALLERY_LIST.find((item) => item.id === name)?.query;
  const { id, title, description, cover_image, linkTitle, linkUrl } =
    await getGalleryPageInfo(name);
  if (!process.env.NEXT_PUBLIC_IS_LOCAL) {
    // name이 isdPick이면 isdNoticeArtworks를 호출하고, 그렇지 않으면 galleryArtworks를 호출한다.
    // const { queryKey, queryFn } =
    //   name === 'isdPick'
    //     ? queryOptions.isdNoticeArtworks({ member: 'isd', ranktype: 'latest' })
    //     : queryOptions.galleryArtworks({
    //         // query: endpoint ?? '',
    //         galleryType: `v2/gallery_artworks?gallery=${name}`,
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
        <TopBackground coverImageUrl={cover_image}>
          <GalleryTitle
            pageType={id}
            title={title}
            description={description}
            linkTitle={linkTitle}
            linkUrl={linkUrl}
          />
        </TopBackground>
        <section className="relative top-[-50px] z-[2] w-full 2xs:top-[-200px] sm:top-[-80px] md:top-[-120px] 2md:top-[-150px] lg:top-[-160px] xl:top-[-280px] 2xl:top-[-240px]">
          <Hydrate state={{ queries: [query] }}>
            <DetailedGallery value={name} />
          </Hydrate>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full">
      <TopBackground coverImageUrl={cover_image}>
        <GalleryTitle
          pageType={id}
          title={title}
          description={description}
          linkTitle={linkTitle}
          linkUrl={linkUrl}
        />
      </TopBackground>
      {/* -220px(-60px + -160px) */}
      <section className="relative top-[-50px] z-[2] w-full 2xs:top-[-200px] sm:top-[-80px] md:top-[-120px] 2md:top-[-150px] lg:top-[-160px] xl:top-[-400px]">
        <DetailedGallery value={name} />
      </section>
    </div>
  );
}
