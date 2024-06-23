import type { Metadata } from 'next';
import Image from 'next/image';
import { IoMdMore } from 'react-icons/io';
import { MdOutlineIosShare } from 'react-icons/md';

import { siteConfig } from '@/lib/config';
import {
  cromeStep1,
  cromeStep2,
  cromeStep3,
  safariStep1,
  safariStep2,
  safariStep3,
} from '@/lib/images';

export const metadata: Metadata = {
  title: siteConfig.more.install.title,
  description: siteConfig.more.install.description,
  openGraph: {
    type: siteConfig.type,
    title: siteConfig.more.install.title,
    description: siteConfig.more.install.description,
    images: siteConfig.image,
    url: siteConfig.more.install.url,
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.siteName,
    creator: siteConfig.creator,
    title: siteConfig.more.install.title,
    description: siteConfig.more.install.description,
    images: siteConfig.image,
  },
  icons: siteConfig.icons,
};

export default function InstallInfo() {
  return (
    <div className="flex w-full flex-col items-center justify-center px-4 text-center">
      <h1 className="mx-auto my-4 break-keep text-3xl font-bold">
        리파인드 홈화면 설치 가이드 (수동)
      </h1>
      <h2 className="my-6 text-2xl font-semibold">Crome(Android)</h2>
      <div className="flex max-w-[343px] flex-col gap-5">
        <div>
          <Image
            src={cromeStep1}
            alt="step1"
            width={342}
            height={744}
            priority
          />
          <p>
            1. 오른쪽 상단의 더보기 <IoMdMore className="inline" /> 를
            클릭합니다.
          </p>
        </div>
        <div>
          <Image
            src={cromeStep2}
            alt="step2"
            width={342}
            height={744}
            priority
          />
          <p>{`2. 메뉴에서 "홈 화면에 추가"를 선택합니다.`}</p>
        </div>
        <div>
          <Image
            src={cromeStep3}
            alt="step3"
            width={342}
            height={744}
            priority
          />
          <p>3. 앱 설치를 눌러주면 설치가 진행됩니다.</p>
          <p>웹사이트는 앱처럼 홈 화면에 나타납니다.</p>
        </div>
      </div>
      <h2 className="my-6 text-2xl font-semibold">Safari</h2>
      <div className="flex max-w-[343px] flex-col gap-5">
        <div>
          <Image
            src={safariStep1}
            alt="step1"
            width={343}
            height={744}
            priority
          />
          <p>
            1. 아래에 작업 버튼 <MdOutlineIosShare className="inline" />을
            선택합니다.
          </p>
        </div>
        <div>
          <Image
            src={safariStep2}
            alt="step2"
            width={343}
            height={744}
            priority
          />
          <p>{`2. 연락처 및 앱 행을 지나 공유 시트를 아래로 스크롤한 다음 "홈 화면에
            추가"를 선택합니다.`}</p>
        </div>
        <div>
          <Image
            src={safariStep3}
            alt="step3"
            width={343}
            height={744}
            priority
          />
          <p>3. 웹 앱에 이름을 지정한 다음 추가를 선택합니다.</p>
          <p>웹사이트는 앱처럼 홈 화면에 나타납니다.</p>
        </div>
      </div>
    </div>
  );
}
