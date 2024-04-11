import { Box } from '@chakra-ui/react';
import type { Metadata } from 'next';

import TopBackground from '@/components/common/TopBackground';
import DetailedGallery from '@/components/gallery/DetailedGallery';
import GalleryTitle from '@/components/gallery/GalleryTitle';
import gallery from '@/data/gallery';
import members2 from '@/data/members2';
import { siteConfig } from '@/lib/config';
import { getDehydratedInfiniteQuery, Hydrate } from '@/lib/react-query';
import queryOptions from '@/service/client/gallery/queries';

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
    members2.find((item) => item.value === name)?.query ||
    gallery.find((item) => item.value === name)?.query;

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
      <Box className="body" minH="240vh" w="100%" m="0 auto">
        <TopBackground>
          <GalleryTitle pageType={name} />
          <></>
        </TopBackground>
        <Box
          as="section"
          w="100%"
          className="layout"
          position="relative"
          top={['0px', '-100px', '-108px', '-180px', '-220px']} // -220px(-60px + -160px)
          zIndex="2"
        >
          <Hydrate state={{ queries: [query] }}>
            <DetailedGallery value={name} endpoint={endpoint ?? ''} />
          </Hydrate>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="body" minH="240vh" w="100%" m="0 auto">
      <TopBackground>
        <GalleryTitle pageType={name} />
        <></>
      </TopBackground>
      <Box
        as="section"
        w="100%"
        className="layout"
        position="relative"
        top={['0px', '-100px', '-108px', '-180px', '-220px']} // -220px(-60px + -160px)
        zIndex="2"
      >
        <DetailedGallery value={name} endpoint={endpoint ?? ''} />
      </Box>
    </Box>
  );
}
