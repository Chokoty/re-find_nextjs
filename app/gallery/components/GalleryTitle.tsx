'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaAngleLeft } from 'react-icons/fa6';

import ShareLinkButton from '@/app/gallery/components/Button/ShareLinkButton';
import GALLERY_LIST, { MEMBERS } from '@/app/gallery/lib/const';
import Button from '@/components/Button';
import { BBangTTi } from '@/lib/images';

const getTitleInfo = (type: string) => {
  if (type === 'galleryHome') {
    return {
      title: '팬아트 갤러리',
      description: '왁물원에 올라온 모든 팬아트들을 한 곳에서!',
    };
  }

  const album = GALLERY_LIST.find((item) => item.value === type);
  const member = MEMBERS.find((item) => item.value === type);

  return {
    title: album?.title || `${member?.name ?? ''} 팬아트`,
    description: album?.description || '',
  };
};

const titleClassName =
  'mt-1.5 font-pop text-4xl sm:text-5xl 2md:text-6xl lg:text-7xl 2xl:text-8xl';
const descriptionClassName =
  'text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-wrap max-w-[280px] md:max-w-[360px] 2md:max-w-[420px] 2xl:max-w-[550px]';

export default function GalleryTitle({ pageType }: { pageType: string }) {
  const router = useRouter();
  const { title, description } = getTitleInfo(pageType);
  const handleBackButton = () => {
    router.push('/gallery');
  };

  return (
    <div className="flex w-full max-w-[380px] flex-col items-start justify-start md:max-w-[460px] 2md:max-w-[710px]">
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
          <h1 className={titleClassName}>{title}</h1>
          <div className="mb-6 mt-1.5">
            <p className={`font-bold ${descriptionClassName}`}>{description}</p>
          </div>
          <ShareLinkButton />
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
