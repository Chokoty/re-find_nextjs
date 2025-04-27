import type { Metadata } from 'next';

import DetailedGallery from '@/app/album/components/DetailedGallery';
import GalleryTitle from '@/app/album/components/GalleryTitle';
import TopBackground from '@/app/album/components/TopBackground';
import GALLERY_LIST, {
  MEMBERS,
  UPDATED_GALLERY_LIST,
} from '@/app/album/lib/const';
import queryOptions from '@/app/album/service/client/queries';
import ArtistList from '@/app/myLibrary/components/ArtistList';
import BackToLibraryLink from '@/app/myLibrary/components/BackToLibraryLink';
import TotalCount from '@/app/myLibrary/components/TotalCount';
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
    // ✅ 서버에서만 실행되는 코드
  }

  return <ArtistList />;
}
