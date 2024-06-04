'use client';

import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FaChevronRight, FaShare } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';

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
      toast.success('갤러리 링크가 복사되었습니다.');
    });
  };
  return (
    <div className="my-4 flex w-full flex-col px-2 md:w-[508px]">
      <div className="flex justify-between py-2">
        <Button
          intent="solid-gray"
          additionalClass="rounded-full gap-2"
          onClick={handleCopyLink}
        >
          <FaShare />
          <p>공유</p>
        </Button>
        <Link href={article_link + id} target="_blank">
          <Button additionalClass="bg-gradient-to-tl from-pink-500 to-pink-300 hover:from-pink-400 hover:to-pink-200 rounded-full gap-2 transition">
            <p className="text-white">왁물원</p>
            <FaChevronRight className="size-3 text-white" />
          </Button>
        </Link>
      </div>
      <h3 className="mt-3 text-start text-3xl font-bold">{title}</h3>
      <div className="mt-3">
        <p>{board.replace(/&#\d+;/g, '').trim()}</p>
      </div>
      <div className="mt-3">
        <p>{date}</p>
      </div>
      <div className="mt-3 flex items-center gap-2">
        {profileUrl ? (
          <Image
            className="size-12 rounded-full object-cover"
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
        <p>{!author?.length ? '알 수 없음' : author}</p>
      </div>
      <div className="mt-3">
        <SocialStats view={view} like={like} comment={comment} />
      </div>
    </div>
  );
}
