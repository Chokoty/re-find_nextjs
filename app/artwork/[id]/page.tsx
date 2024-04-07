import { Box, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Artwork from '@/components/gallery/Artwork';

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

export default function ArtworkPage({ params: { id } }: Params) {
  console.log(id);
  return <Artwork />;
}
