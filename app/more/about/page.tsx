import type { Metadata } from 'next';
import Link from 'next/link';
import { LuExternalLink } from 'react-icons/lu';

import ProfileList from '@/app/more/components/ProfileList';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: siteConfig.more.about.title,
  description: siteConfig.more.about.description,
  openGraph: {
    type: siteConfig.type,
    title: siteConfig.more.about.title,
    description: siteConfig.more.about.description,
    images: siteConfig.image,
    url: siteConfig.more.about.url,
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.siteName,
    creator: siteConfig.creator,
    title: siteConfig.more.about.title,
    description: siteConfig.more.about.description,
    images: siteConfig.image,
  },
  icons: siteConfig.icons,
};

export default function About() {
  return (
    <div className="flex w-full flex-col items-center justify-center px-4 text-center">
      <h1 className="mx-auto my-4 text-3xl font-bold">왁물원 게시글</h1>
      <Link
        className="flex items-center text-green-highlight transition hover:underline dark:text-pink-highlight"
        href={'https://cafe.naver.com/steamindiegame/9859159'}
        target="_blank"
      >
        [뉴사이트소개] RE : FIND (이세돌 팬아트 출처 찾기)
        <LuExternalLink className="ml-1 hidden 2xs:block" />
      </Link>
      <ProfileList type="member" />
      <ProfileList type="credit" />
    </div>
  );
}
