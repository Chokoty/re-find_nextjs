import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useDeleteModeStore } from '@/app/album/store/deleteModeStore';
import { useSelectModeStore } from '@/app/album/store/selectModeStore';
import CardImage from '@/components/CardImage/CardImage';
import { useResponsiveLink } from '@/hooks/useResponsiveLink';

type Props = {
  artwork: ArtworkList | AlbumArtworkList;
  isIsdPick?: boolean;
};

export default function MasonryCard({ artwork, isIsdPick = false }: Props) {
  const authorName = 'author' in artwork ? artwork.author : '';
  const pathname = usePathname();
  const isArtistDetails = pathname.startsWith('/artists');
  const article_link = useResponsiveLink('', 'article');
  const postLink = article_link + artwork.id;
  const source = artwork.source?.[0] ?? artwork.id;
  const sourceLink = article_link + source;
  // 이세돌픽 갤러리일 경우 왁물원 링크는 원본 파일 링크이고 그외는 게시글 링크입니다.
  const wakzooLink = isIsdPick ? sourceLink : postLink;
  // 이세돌픽 갤러리는 작가 링크가 올린 게시글이고 그렇지 않다면 리파인드 작가입니다.
  const artistLink = isIsdPick ? postLink : `/artists/${authorName}`;
  const linkTarget = isIsdPick ? '_blank' : '_self';
  const isSelectMode = useSelectModeStore((state) => state.isSelectMode);
  const isDelete = useDeleteModeStore((state) => state.isDelete);

  return (
    <div className="inline-block w-full">
      <CardImage
        data={artwork}
        wakzooLink={wakzooLink}
        isCheckable={isSelectMode}
        isDeletable={isDelete}
      />
      <div className="flex h-auto w-full max-w-[350px] flex-col items-start justify-center">
        <p className="line-clamp-1 text-left text-base font-medium">
          {artwork.title}
        </p>
        {!isArtistDetails &&
          (isSelectMode || isDelete ? (
            // 체크 모드일 때는 링크 대신 텍스트만 표시
            <span
              className="line-clamp-1 w-full cursor-not-allowed text-left text-sm font-medium text-gray-400 dark:text-gray-500"
              title={authorName ?? undefined}
            >
              {`작가: ${authorName}`}
            </span>
          ) : (
            <Link
              href={artistLink}
              className="link-to-profile w-full"
              target={linkTarget}
            >
              <p className="line-clamp-1 text-left text-sm font-medium text-gray-900 hover:text-green-highlight dark:text-whiteAlpha-700 dark:hover:text-pink-highlight">
                {`작가: ${authorName}`}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
}
