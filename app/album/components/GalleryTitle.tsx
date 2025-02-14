'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaAngleLeft } from 'react-icons/fa6';
import { LuExternalLink } from 'react-icons/lu';

import ShareLinkButton from '@/app/album/components/Button/ShareLinkButton';
import TotalCounter from '@/app/album/components/TotalCounter';
import Button from '@/components/Button';
import { BBangTTi } from '@/lib/images';

type Props = {
  title: string;
  description: string;
  pageType: string;
  linkUrl?: string;
  linkTitle?: string;
};

// const getTitleInfo = (type: string) => {

//   const album = GALLERY_LIST.find((item) => item.id === type);
//   const board = UPDATED_GALLERY_LIST.find((item) => item.id === type);
//   const member = MEMBERS.find((item) => item.value === type);

//   return {
//     title: album?.title || board?.title || `${member?.name ?? ''} 팬아트`,
//     description: album?.description || '',
//     linkUrl: album?.linkUrl || '',
//     linkTitle: album?.linkTitle || '',
//   };
// };

const titleClassName = 'mt-1.5 font-pop text-4xl sm:text-5xl   break-keep';
const descriptionClassName =
  'text-base md:text-lg lg:text-xl  text-wrap max-w-[280px] md:max-w-[530px]  break-keep';

export default function GalleryTitle({
  pageType,
  title,
  description,
  linkUrl,
  linkTitle,
}: Props) {
  const router = useRouter();
  // TODO: link URL 서버에서 데이터 요청
  // const {  linkUrl, linkTitle } = getTitleInfo(pageType);

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
    router.push('/');
  };

  return (
    <div className="my-6 flex w-full flex-col items-start justify-start pl-2 md:pl-8">
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
    <div className={`flex items-center justify-center gap-1 ${titleClassName}`}>
      <p>팬아트</p>
      <div className="relative h-10 w-20 overflow-hidden rounded-full bg-green-highlight px-2 dark:bg-pink-highlight 2xs:h-10 2xs:w-24">
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
