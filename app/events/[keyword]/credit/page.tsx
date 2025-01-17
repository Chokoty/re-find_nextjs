import type { Metadata } from 'next';
import Image from 'next/image';

// import MyConfetti from '@/app/events/components/FanartWorldCup/MyConfetti';
import { CREDIT } from '@/app/events/lib/const';
import { siteConfig } from '@/lib/config';
import { RefindLogo } from '@/lib/images';

export const metadata: Metadata = {
  title: siteConfig.events.goGongJeon.credit.title,
  description: siteConfig.events.goGongJeon.credit.description,
  openGraph: {
    type: siteConfig.type,
    title: siteConfig.events.goGongJeon.credit.title,
    description: siteConfig.events.goGongJeon.credit.description,
    images: siteConfig.image,
    url: siteConfig.events.goGongJeon.credit.url,
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.siteName,
    title: siteConfig.events.goGongJeon.credit.title,
    description: siteConfig.events.goGongJeon.credit.description,
    images: siteConfig.image,
  },
  icons: siteConfig.icons,
};

export default function Credit() {
  // const { width, height } = useWindowSize();
  return (
    <div className="w-full">
      {/* <div className="fixed inset-0 z-[201] size-full">
        <Confetti width={width} height={height} />
      </div> */}
      {/* <MyConfetti /> */}
      <div className="flex size-full w-full items-center">
        <div className="mt-10 flex  flex-col items-center justify-center text-2xl">
          <h2 className="mb-6  text-4xl">도와주신 작가님들</h2>
          <div className="flex flex-wrap">
            {CREDIT.map((author, index) => (
              <div key={author} className="w-1/3">
                <p className="writing-vertical-rl text-center">{author}</p>
              </div>
            ))}
          </div>
          <h2 className="mb-6 mt-10 text-4xl">팀 리파인드 제작</h2>
          <Image
            src={RefindLogo}
            alt="리파인드 로고"
            width={100}
            height={100}
            priority
            unoptimized
          />
          <p className="mt-6 text-center">
            세구님 방송 3주년 진심으로 축하드립니다!
          </p>
          <p className="text-center">
            세구님의 모든 망상이 현실이 되는 그날까지 늘 곁에서 응원하겠습니다.
            킹아!
          </p>
        </div>
      </div>
    </div>
  );
}
