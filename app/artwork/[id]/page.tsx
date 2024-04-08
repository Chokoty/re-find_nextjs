import { redirect } from 'next/navigation';

import Artwork from '@/components/gallery/Artwork';
import { getArtworkDetail } from '@/service/server/gallery';

type Params = { params: { id: string } };

// // Image url 고민
// export function generateMetadata({ params: { id } }: Params): Metadata {
//   const { title, description, url } = siteConfig.gallery.detailed(name);
//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       url,
//       type: siteConfig.type,
//       images: siteConfig.image,
//       siteName: siteConfig.siteName,
//     },
//     twitter: {
//       title,
//       description,
//       card: 'summary_large_image',
//       site: siteConfig.siteName,
//       creator: siteConfig.creator,
//       images: siteConfig.image,
//     },
//     icons: siteConfig.icons,
//   };
// }

export default async function ArtworkPage({ params: { id } }: Params) {
  const artwork = await getArtworkDetail(parseInt(id));
  return <Artwork data={artwork} />;
}
