import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

import useModal from '@/hooks/useModal';
import { useModifiedImageUrl } from '@/hooks/useModifiedImageUrl';
import { useResponsiveLink } from '@/hooks/useResponsiveLink';

export default function ImageViewModal(props: Record<string, unknown>) {
  const artwork = props.artwork as DoorBehindFanart;
  const { title, url, img_url, board } = artwork;
  const { hide } = useModal();
  const onClose = () => {
    hide();
  };
  const article_link = useResponsiveLink(url.split('/').pop() ?? '', 'article');
  const modifiedUrl800 = useModifiedImageUrl({
    url: img_url ?? '',
    size: 800,
  });

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onClose]);

  return (
    <section className="relative m-5 rounded-2xl bg-white dark:bg-dark-card sm:mx-auto sm:w-full sm:max-w-lg">
      <button
        className="absolute right-[10px] top-[10px] flex size-9 items-center justify-center rounded-full transition hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-whiteAlpha-200 dark:active:bg-whiteAlpha-300"
        onClick={onClose}
      >
        <IoClose className="size-8" />
      </button>
      <div className="flex size-full flex-col items-center justify-center px-5 py-12">
        <Link
          href={article_link}
          className="hover:text-green-highlight dark:hover:text-pink-highlight"
          target="_blank"
        >
          <Image
            className="max-h-[400px] rounded-[20px] object-cover object-center shadow-img"
            width={475}
            height={475}
            src={modifiedUrl800}
            alt={`랜덤 팬아트 게시글 title: ${title}`}
            unoptimized
          />
        </Link>
        <div className="mt-2 px-4 text-start">
          <p className="line-clamp-1">게시판: {board}</p>
          <Link
            href={article_link}
            className="hover:text-green-highlight dark:hover:text-pink-highlight"
            target="_blank"
          >
            <p className="line-clamp-1">제목: {title}</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
