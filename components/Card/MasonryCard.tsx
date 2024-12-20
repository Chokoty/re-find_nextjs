import Link from 'next/link';
import { usePathname } from 'next/navigation';

import CardImage from '@/components/CardImage/CardImage';
import { useResponsiveLink } from '@/hooks/useResponsiveLink';

type Props = {
  artwork: ArtworkList | GalleryArtworkList;
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

  return (
    <div className="inline-block">
      <CardImage data={artwork} wakzooLink={wakzooLink} />
      <div className="flex h-auto w-full max-w-[350px] flex-col items-start justify-center">
        <p className="line-clamp-1 text-left text-base font-medium">
          {artwork.title}
        </p>
        {!isArtistDetails && (
          <Link href={artistLink} className="w-full" target={linkTarget}>
            <p className="line-clamp-1 text-left text-sm font-medium text-gray-900 hover:text-green-highlight dark:text-whiteAlpha-700 dark:hover:text-pink-highlight">
              {`작가: ${authorName}`}
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}
