import type { Metadata } from 'next';
import Link from 'next/link';
import { BsChatDots } from 'react-icons/bs';
import { FaBug } from 'react-icons/fa';

import { SUPPORT_INFOS } from '@/app/more/lib/const';
import PageTitle from '@/components/PageTitle';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: siteConfig.more.support.title,
  description: siteConfig.more.support.description,
  openGraph: {
    type: siteConfig.type,
    title: siteConfig.more.support.title,
    description: siteConfig.more.support.description,
    images: siteConfig.image,
    url: siteConfig.more.support.url,
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.siteName,
    creator: siteConfig.creator,
    title: siteConfig.more.support.title,
    description: siteConfig.more.support.description,
    images: siteConfig.image,
  },
  icons: siteConfig.icons,
};

const IconsMap = {
  0: <BsChatDots size="60px" />,
  1: <FaBug size="60px" />,
} as const;

type IconKeyType = keyof typeof IconsMap;
const topTitle = {
  title: '문의&지원',
  description: '',
};
export default function Support() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      <PageTitle topTitle={topTitle} />
      <div className="flex flex-wrap items-center justify-center gap-10">
        {SUPPORT_INFOS.map((info, index) => (
          <Link
            className="flex h-[144px] w-[160px] flex-col items-center justify-center rounded-lg border-base border-gray-200 bg-white p-4 shadow-base transition hover:bg-gray-200 active:bg-gray-300 dark:border-whiteAlpha-300 dark:bg-dark-card dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-400"
            key={index}
            href={info.url}
            target="_blank"
          >
            {IconsMap[index as IconKeyType]}
            <p className="mt-6 text-2xl">{info.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
