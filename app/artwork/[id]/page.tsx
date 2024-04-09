import { Box } from '@chakra-ui/react';
import type { Metadata } from 'next';

import Artwork from '@/components/gallery/Artwork';
import RecommendArtworks from '@/components/gallery/RecommendArtworks';
import { siteConfig } from '@/lib/config';
import { getArtworkDetail } from '@/service/server/gallery';

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
    <Box w="100%" h="100%" display="flex" flexDir="column" px="20px" py="50px">
      {/* 상단(정보 - 제목,작가,날짜,게시판, 말머리, vlc) */}
      <Box
        w="100%"
        minH="40vh"
        display="flex"
        flexDir={['column', 'column', 'row']}
        gap="1rem"
        justifyContent="center"
        alignItems={['center', 'center', 'flex-start']}
        padding={['1rem', '0']}
      >
        <Artwork data={artwork} />
      </Box>
      {/* 하단(유사이미지 추천) */}
      <RecommendArtworks />
    </Box>
  );
}
