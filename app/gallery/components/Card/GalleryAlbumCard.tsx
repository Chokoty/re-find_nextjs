import Image from 'next/image';
import Link from 'next/link';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { FaArrowRightLong } from 'react-icons/fa6';
import { LuExternalLink } from 'react-icons/lu';

import { getStaticImage } from '@/app/gallery/lib/getStaticImage';
import Popover, {
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@/components/Popover';
import type { Gallery } from '@/types';

type Prop = {
  album: Gallery;
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
  album: { title, value, description, type, author },
}: Prop) {
  const query = {
    sortType: 'alzaltak',
  };

  const staticImage = getStaticImage(value);
  return (
    <div className="relative w-full transition hover:scale-[1.01]">
      {/* 출처(작가) */}
      <div className="absolute inset-0 rounded-2xl px-2.5 pb-3.5 pt-2.5 min-[840px]:px-3 min-[840px]:pb-4 min-[840px]:pt-3 min-[1055px]:px-5 min-[1055px]:pb-7 min-[1055px]:pt-5">
        {/* 모바일 */}
        <div className="relative z-[2] flex size-7 items-center justify-center md:hidden md:size-9 min-[840px]:size-10">
          <Popover>
            <PopoverTrigger color="sub">
              <div className="rounded-full bg-whiteAlpha-500">
                <BsFillQuestionCircleFill className="size-5 rounded-full text-blackAlpha-600" />
              </div>
            </PopoverTrigger>
            <PopoverContent size="ss" position="bottom-right">
              <PopoverHeader>일러스트레이터</PopoverHeader>
              <PopoverBody>
                <Link className="flex items-center" href={`/artists/${author}`}>
                  {author}
                  <LuExternalLink className="ml-1 text-base font-semibold" />
                </Link>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
        {/* 데스크탑 */}
        <Link href={`/artists/${author}?sortType=alzaltak`} className="flex">
          <div className="absolute z-[2] hidden items-center justify-center rounded-[10px] bg-blackAlpha-500 px-3 py-2 text-sm font-normal text-white hover:bg-blackAlpha-600 active:bg-blackAlpha-400 md:inline-flex min-[840px]:px-3.5 min-[840px]:py-2.5">
            출처
          </div>
        </Link>
      </div>
      {/* <Link href={`/gallery/${value}`} prefetch={false}> */}
      <Link
        href={`/gallery/${value}?sortType=alzaltak&viewType=masonry`}
        prefetch={false}
      >
        <div className="relative h-[200px] w-full 2xs:h-[230px] md:h-[280px] 2md:h-[350px] xl:h-[400px]">
          <Image
            className="rounded-2xl object-cover"
            src={staticImage}
            alt={title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        </div>
        <div
          className="dark:bg-[linear-gradient(180deg,_hsla(0,_0%,_7%,_.8),_hsla(0,_0%,_7%,_.4)_0%,_hsla(0,_0%,_7%,_0)_0%,_hsla(0,_0%,_7%,_0%)_12.23%,_hsla(0,_0%,_7%,_.64)_86.23%,_#121212 101.07%)] absolute inset-0 z-[1] flex size-full flex-col items-end justify-between rounded-2xl bg-[linear-gradient(180deg,_hsla(0,_0%,_7%,_.8),_hsla(0,_0%,_7%,_.4)_0%,_hsla(0,_0%,_7%,_0)_0%,_hsla(0,_0%,_7%,_0%)_47.23%,_hsla(0,_0%,_7%,_.64)_100.23%,_#121212_100.07%)] px-2.5 pb-3.5 pt-2.5 min-[840px]:px-3 min-[840px]:pb-4 min-[840px]:pt-3 min-[1055px]:px-5 min-[1055px]:pb-7 min-[1055px]:pt-5"
          // borderRadius="0.9rem" // image 1rem 보다 작게 설정해야 아래 이미지 뜨는 현상 방지
        >
          <div className="flex items-center justify-center rounded-[10px] bg-blackAlpha-500 px-2.5 py-1.5 md:px-3 md:py-2 min-[840px]:px-3.5 min-[840px]:py-2.5">
            <p className="text-xs font-normal text-white md:text-sm">
              {getBadgeText({ badgeType: type, badgeValue: value })}
            </p>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col items-start gap-1 pr-0 min-[840px]:pr-2 min-[1055px]:pr-5 min-[1400px]:pr-[25px] min-[1600px]:pr-[30px]">
              <p className="text-xl font-bold text-white min-[1055px]:text-2xl min-[1600px]:text-3xl">
                {title}
              </p>
              <p className="text-sm font-normal text-white min-[1055px]:text-[15px] min-[1600px]:text-base">
                {description}
              </p>
            </div>
            <FaArrowRightLong
              className="hidden 2md:block"
              size={40}
              color="white"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
