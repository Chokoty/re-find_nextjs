import type { Metadata } from 'next';
import Link from 'next/link';
import { LuExternalLink } from 'react-icons/lu';

import ProfileList from '@/app/more/components/ProfileList';
import PageTitle from '@/components/PageTitle';
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
const topTitle = {
  title: '리파인드 소개',
  description: '',
};
export default function About() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 px-3 py-8 text-center">
      <PageTitle topTitle={topTitle} />
      <div className="flex flex-col items-center justify-center ">
        <h1 className="mx-auto my-6 text-2xl font-bold">왁물원 게시글</h1>
        <Link
          className="link-to-wakzoo_about flex items-center text-green-highlight transition hover:underline dark:text-pink-highlight"
          href={'https://cafe.naver.com/steamindiegame/9859159'}
          target="_blank"
        >
          [뉴사이트소개] RE : FIND (이세돌 팬아트 출처 찾기)
          <LuExternalLink className="ml-1 hidden 2xs:block" />
        </Link>
      </div>
      <ProfileList type="member" />
      <ProfileList type="credit" />
    </div>
  );
}
