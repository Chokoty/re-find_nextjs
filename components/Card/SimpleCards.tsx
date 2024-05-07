import Image from 'next/image';
import Link from 'next/link';

import { useModifiedImageUrl } from '@/hooks/useModifiedImageUrl';
import { useUploadTimeDiff } from '@/hooks/useUploadTimeDiff';

type Prop = {
  artwork: ArtworkList;
};

export default function SimpleCard({ artwork }: Prop) {
  // const article_link = useResponsiveLink('', 'article');
  const uploadTimeDiff = useUploadTimeDiff(artwork.date);
  const imageUrlList = processImageUrlList(artwork.img_url_list);
  const modifiedUrl300 = useModifiedImageUrl({
    url: artwork.img_url_list[0],
    size: 300,
  });

  function processImageUrlList(imgList: string[]) {
    const processedList = [...imgList];

    // 3개 미만의 이미지가 있을 경우 빈 이미지로 채우기
    if (processedList.length < 3) {
      const emptyCount = 3 - processedList.length;
      for (let i = 0; i < emptyCount; i++) {
        processedList.push('');
      }
    }
    // 3개 초과의 이미지가 있을 경우 3개까지만 가져오기
    else if (processedList.length > 3) {
      processedList.splice(3);
    }

    // Process each image URL and return the modified list
    return processedList.map((img_url) =>
      useModifiedImageUrl({
        url: img_url,
        size: 100,
      })
    );
  }

  return (
    <div className="flex flex-col">
      <Link
        href={`/artwork/${artwork.id}`}
        className="mb-2"
        // rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
      >
        <div
          className="group relative h-[120px] w-full overflow-hidden rounded-2xl 2xs:h-[157px]"
          key={artwork.id}
        >
          <div
            className="flex size-full items-center justify-between"
            // h={['120px', '157px']}
          >
            <div className="h-full w-[65.5%]">
              <Image
                alt={artwork.title}
                width={300}
                height={300}
                className="size-full object-cover object-center-top"
                src={
                  artwork.img_url === ''
                    ? 'http://via.placeholder.com/252x157'
                    : // : artwork.deleted
                      // ? `/api/blurImage?url=${artwork.img_url}`
                      modifiedUrl300 // 썸네일 크기 300으로 가져오기 - 네이버 자체 썸네일 api
                }
                unoptimized
              />
            </div>
            <div className="flex h-full w-[32.5%] flex-col items-center justify-between">
              {imageUrlList.slice(1).map((imgUrl, idx) => (
                <div key={idx} className="h-[49%] w-full bg-gray-150">
                  {imgUrl !== '' && (
                    <Image
                      alt={artwork.title}
                      width={300}
                      height={300}
                      className="size-full object-cover object-center-top"
                      src={
                        imgUrl // 썸네일 크기 100으로 가져오기 - 네이버 자체 썸네일 api
                      }
                      unoptimized
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 z-[1] hidden rounded-2xl bg-blackAlpha-500 group-hover:block" />
          <div className="absolute inset-0 z-[2] hidden size-full items-center justify-center rounded-2xl bg-blackAlpha-600 text-white group-hover:flex">
            <p className="text-xl font-semibold">자세히</p>
          </div>
        </div>
      </Link>
      <div className="w-full px-1">
        <Link href={`/artwork/${artwork.id}`}>
          <p className="line-clamp-1 text-left text-base font-semibold hover:text-whiteAlpha-700 2xs:text-xl">
            {artwork.title}
          </p>
        </Link>
        <div className="flex items-center justify-between text-xs font-light 2xs:text-sm">
          <p>팬아트 {artwork.img_url_list.length}개</p>
          <p>{uploadTimeDiff}</p>
        </div>
      </div>
    </div>
  );
}
