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

export default function GalleryTitle({ pageType }: { pageType: string }) {
  const router = useRouter();
  const { title, description } = getTitleInfo(pageType);
  const handleBackButton = () => {
    router.back();
  };

  // const color = isDarkMode ? 'rgb(255 255 255 / 60%)' : 'rgb(0 0 0 / 60%)';

  return (
    <div className="flex w-full flex-col items-center justify-center sm:items-start sm:justify-start">
      {pageType === 'galleryHome' ? (
        <>
          <p className="text-sm font-semibold 2xs:text-base md:text-xl">
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
          <h1 className="my-3.5 font-pop text-2xl 2xs:text-4xl md:text-5xl 2md:text-[4rem]">
            {title}
          </h1>
          <div className="mb-6">
            <p className="text-sm font-bold 2xs:text-base md:text-xl">
              {description}
            </p>
          </div>
          <ShareLinkButton />
        </>
      )}
    </div>
  );
}

const GalleryHomeTitle = () => {
  return (
    <div className="flex h-[72px] items-center justify-center font-pop text-4xl 2xs:text-5xl md:h-[120px] md:text-[80px]">
      <h1 className="m-0">팬아트</h1>
      <div className="relative h-8 w-16 overflow-hidden rounded-full bg-green-highlight px-2 dark:bg-pink-highlight 2xs:h-12 2xs:w-24 md:h-16 md:w-40">
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
      <p className="m-0 text-green-highlight dark:text-pink-highlight">
        갤러리
      </p>
    </div>
  );
};
