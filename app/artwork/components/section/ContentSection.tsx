'use client';

import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FaChevronRight, FaShare } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';

import { UPDATED_GALLERY_LIST } from '@/app/gallery/lib/const';
import Button from '@/components/Button';
import SocialStats from '@/components/SocialStats';
import { useResponsiveLink } from '@/hooks/useResponsiveLink';

export default function ContentSection({
  id,
  title,
  board,
  date,
  profileUrl,
  author,
  view,
  like,
  comment,
}: {
  id: number;
  title: string;
  board: string;
  date: string;
  profileUrl: string | null;
  author: string | null;
  view: number;
  like: number;
  comment: number;
}) {
  const article_link = useResponsiveLink('', 'article');
  const handleCopyLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success('링크를 클립보드에 복사했어요.');
    });
  };

  const matchingGallery = UPDATED_GALLERY_LIST.find(
    (gallery) => gallery.title === board.replace(/&#\d+;/g, '').trim()
  ) || { id: '' };
  const board_link = `/gallery/${matchingGallery.id}?viewType=masonry&sortType=latest`;

  return (
    <div className="my-4 flex w-full flex-col px-2 md:w-[508px]">
      <div className="flex justify-between py-2">
        <Link
          href={article_link + id}
          target="_blank"
          className="link-to-wakzoo_detail"
        >
          {/* <Button additionalClass="bg-gradient-to-tl from-pink-500 to-pink-300 hover:from-pink-400 hover:to-pink-200 rounded-full gap-2 transition"> */}
          <Button additionalClass="bg-gradient-to-tl from-green-500 to-green-300 hover:from-green-400 hover:to-green-200 active:from-green-500 active:to-green-300 rounded-full gap-2 transition">
            <p className="text-white">왁물원</p>
            <FaChevronRight className="size-3 text-white" />
          </Button>
        </Link>
        <Button
          intent="solid-gray"
          additionalClass="rounded-full gap-2 bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 dark:bg-whiteAlpha-200 dark:text-whiteAlpha-900 dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-400 transition"
          onClick={handleCopyLink}
        >
          <FaShare className="text-gray-800 dark:text-white" />
          <p className="text-gray-800 dark:text-white">공유</p>
        </Button>
      </div>
      <div className="mt-3">
        <Link
          href={board_link}
          prefetch={false}
          className={`group relative  flex w-full items-center justify-start gap-4  border-gray-300  transition-all duration-300 hover:text-green-highlight dark:border-whiteAlpha-300 dark:hover:text-pink-highlight `}
        >
          <p className="text-lg">{board.replace(/&#\d+;/g, '').trim()}</p>
        </Link>
      </div>
      <Link
        href={article_link + id}
        target="_blank"
        className="link-to-wakzoo_detail transition-all duration-300 hover:text-green-highlight dark:border-whiteAlpha-300 dark:hover:text-pink-highlight "
      >
        <h3 className="mt-3 text-start text-2xl font-bold">{title}</h3>
      </Link>
      <div className="mb-3">
        <p className="leading-6  text-blackAlpha-600 dark:text-whiteAlpha-600">
          {date}
        </p>
      </div>
      <Link
        href={!author?.length ? '' : `/artists/${author}`}
        prefetch={false}
        className={`link-to-profile group relative  flex w-full items-center justify-start gap-4 border-t-base border-gray-300 py-4 transition-all duration-300 hover:text-green-highlight dark:border-whiteAlpha-300 dark:hover:text-pink-highlight `}
      >
        {/* <div className="mt-3 flex items-center gap-2"> */}
        {profileUrl ? (
          <Image
            className="size-12 rounded-full object-cover group-hover:scale-110"
            priority
            width={100}
            height={100}
            src={profileUrl}
            alt={author ?? '작가 프로필 이미지'}
            unoptimized
          />
        ) : (
          <FaCircleUser color="#c7c6c6" size="3rem" />
        )}
        <p className=" text-lg">{!author?.length ? '알 수 없음' : author}</p>
        {/* </div> */}
      </Link>
      <div className="mt-2">
        <SocialStats view={view} like={like} comment={comment} />
      </div>
    </div>
  );
}
