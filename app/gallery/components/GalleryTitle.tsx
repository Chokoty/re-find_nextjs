'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaAngleLeft } from 'react-icons/fa6';
import { LuExternalLink } from 'react-icons/lu';

import ShareLinkButton from '@/app/gallery/components/Button/ShareLinkButton';
import TotalCounter from '@/app/gallery/components/TotalCounter';
import GALLERY_LIST, {
  MEMBERS,
  UPDATED_GALLERY_LIST,
} from '@/app/gallery/lib/const';
import Button from '@/components/Button';
import { BBangTTi } from '@/lib/images';

const getTitleInfo = (type: string) => {
  if (type === 'galleryHome') {
    return {
      title: '팬아트 갤러리',
      description: '왁물원에 올라온 모든 팬아트들을 한 곳에서!',
    };
  }

  const album = GALLERY_LIST.find((item) => item.id === type);
  const board = UPDATED_GALLERY_LIST.find((item) => item.id === type);
  const member = MEMBERS.find((item) => item.value === type);

  return {
    title: album?.title || board?.title || `${member?.name ?? ''} 팬아트`,
    description: album?.description || '',
    linkUrl: album?.linkUrl || '',
    linkTitle: album?.linkTitle || '',
  };
};

const titleClassName =
  'mt-1.5 font-pop text-4xl sm:text-5xl 2md:text-6xl lg:text-7xl 2xl:text-8xl break-keep';
const descriptionClassName =
  'text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-wrap max-w-[280px] md:max-w-[530px]  break-keep';

export default function GalleryTitle({ pageType }: { pageType: string }) {
  const router = useRouter();
  const { title, description, linkUrl, linkTitle } = getTitleInfo(pageType);

  const pathname = usePathname();
  const pathNameParts = pathname.split('/');
  const name = pathNameParts[pathNameParts.length - 1];
  // 특정 이름에 대해 hasTotalCounter를 false로 설정하는 함수
  const shouldHideTotalCounter = (n: string) => {
    const hiddenNames = [
      'gosegu',
      'ine',
      'viichan',
      'jingburger',
      'lilpa',
      'jururu',
    ];
    return hiddenNames.includes(n);
  };

  const handleBackButton = () => {
    router.push('/gallery');
  };

  return (
    <div className="flex w-full flex-col items-start justify-start">
      {pageType === 'galleryHome' ? (
        <>
          <p className={`font-semibold ${descriptionClassName}`}>
            {description}
          </p>
          <GalleryHomeTitle />
        </>
      ) : (
        <>
          <Button
            intent="link-gray"
            onClick={handleBackButton}
            additionalClass="p-0 h-7 min-h-7"
          >
            <FaAngleLeft className="mr-1" />
            <p className="text-blackAlpha-700 dark:text-whiteAlpha-700">
              팬아트 갤러리로 돌아가기
            </p>
          </Button>
          <div className="w-full">
            <h1 className={titleClassName}>{title}</h1>
            <div className="mb-6 mt-1.5">
              <p className={`font-bold ${descriptionClassName}`}>
                {description}
                {linkUrl && (
                  <Link
                    href={linkUrl}
                    target="_blank"
                    className="link-to-wakzoo mt-1 flex items-center text-green-highlight hover:underline dark:text-pink-highlight"
                  >
                    {linkTitle}
                    <LuExternalLink className="ml-2 text-lg font-semibold 2xs:block" />
                  </Link>
                )}
              </p>
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <ShareLinkButton />
            <div className="2md:hidden">
              {!shouldHideTotalCounter(name) && <TotalCounter />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const GalleryHomeTitle = () => {
  return (
    <div className={`flex items-center justify-center ${titleClassName}`}>
      <p>팬아트</p>
      <div className="relative h-10 w-20 overflow-hidden rounded-full bg-green-highlight px-2 dark:bg-pink-highlight 2xs:h-12 2xs:w-24 md:h-16 md:w-40 2xl:h-20 2xl:w-48">
        <Image
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
          src={BBangTTi}
          alt="애기뺑띠"
          // fill
          width={160}
          height={64}
          priority
          // sizes="(max-width: 479px) 15vw, (max-width: 500px) 40vw, 60vw"
          unoptimized
        />
      </div>
      <p className="text-green-highlight dark:text-pink-highlight">갤러리</p>
    </div>
  );
};
