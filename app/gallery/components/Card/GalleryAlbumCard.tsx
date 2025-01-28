import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { LuExternalLink } from 'react-icons/lu';

import { getStaticImage } from '@/app/gallery/lib/getStaticImage';
import Popover, {
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@/components/Popover';

type Prop = {
  album: AlbumInfo;
};

const getBadgeText = ({
  badgeValue,
  badgeType,
}: {
  badgeValue: string;
  badgeType: string;
}) => {
  if (badgeType === 'special') {
    if (badgeValue === 'isdPick') {
      return '이세돌픽';
    }
    return '특집 팬아트';
  }
  return '추천 키워드';
};

export default function GalleryAlbumCard({
  album: { title, id, description, author, cover_image },
}: Prop) {
  // const query = {
  //   sortType: 'alzaltak',
  // };
  // const sortType = useMemo(() => {
  //   if (type === 'keyword' || id === 'isdPick') {
  //     return 'latest';
  //   }
  //   return 'alzaltak';
  // }, [type, id]);

  // const staticImage = getStaticImage(id);
  return (
    <Link
      href={`/album/${id}?viewType=masonry`}
      prefetch={false}
      className="m-auto flex h-[280px] w-full flex-col items-center justify-start  gap-2 rounded-md p-3 transition hover:bg-gray-200 active:bg-whiteAlpha-400 dark:hover:bg-whiteAlpha-300 dark:active:bg-black-200"
    >
      {/* 출처(작가) */}
      {/* <div className="absolute inset-0 rounded-2xl px-2.5 pb-3.5 pt-2.5 min-[840px]:px-3 min-[840px]:pb-4 min-[840px]:pt-3 min-[1055px]:px-5 min-[1055px]:pb-7 min-[1055px]:pt-5"> */}
      {/* 모바일 */}
      {/* <div className="relative z-[2] flex size-7 items-center justify-center md:hidden md:size-9 min-[840px]:size-10">
          <Popover>
            <PopoverTrigger color="sub">
              <div className="rounded-full bg-whiteAlpha-500">
                <BsFillQuestionCircleFill className="size-5 rounded-full text-blackAlpha-600" />
              </div>
            </PopoverTrigger>
            <PopoverContent size="ss" position="bottom-right">
              <PopoverHeader>일러스트레이터</PopoverHeader>
              <PopoverBody>
                <Link
                  className="link-to-profile flex items-center"
                  href={`/artists/${author}`}
                >
                  {author}
                  <LuExternalLink className="ml-1 text-base font-semibold" />
                </Link>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div> */}
      {/* 데스크탑 */}
      {/* <Link
          href={`/artists/${author}?sortType=alzaltak`}
          className="link-to-profile flex"
        >
          <div className="absolute z-[2] hidden items-center justify-center rounded-[32px] bg-blackAlpha-400 p-2 text-sm font-normal text-white hover:bg-blackAlpha-500 active:bg-blackAlpha-400 md:inline-flex min-[840px]:p-2">
            <IoMdInformationCircleOutline
              className="hidden 2md:block"
              size={24}
              color="white"
            />
          </div>
        </Link> */}
      {/* </div> */}
      <div className="relative flex size-[180px] min-h-[180px] w-full">
        <Image
          className="rounded-lg object-cover"
          src={cover_image}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start gap-1 pr-0 min-[840px]:pr-2 min-[1055px]:pr-5 min-[1400px]:pr-[25px] min-[1600px]:pr-[30px]">
          <p className="line-clamp-1 text-base font-bold dark:text-white ">
            {title}
          </p>
          <p className="line-clamp-2 text-sm font-normal text-blackAlpha-700 dark:text-whiteAlpha-600 min-[1055px]:text-sm">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
