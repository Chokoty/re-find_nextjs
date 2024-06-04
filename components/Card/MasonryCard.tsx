import Link from 'next/link';
import { usePathname } from 'next/navigation';

import CardImage from '@/components/CardImage/CardImage';

type Props = {
  artwork: ArtworkList | GalleryArtworkList;
};

export default function MasonryCard({ artwork }: Props) {
  const authorName = 'author' in artwork ? artwork.author : '';
  const pathname = usePathname();
  const isArtistDetails = pathname.startsWith('/artists');

  return (
    <div className="inline-block">
      <CardImage data={artwork} />
      <div className="flex h-auto w-full max-w-[236px] flex-col items-start justify-center">
        <p className="line-clamp-1 text-left text-base font-medium">
          {artwork.title}
        </p>
        {!isArtistDetails && (
          <Link href={`/artists/${authorName}`} className="w-full">
            <p className="line-clamp-1 text-left text-sm font-medium text-gray-900 hover:text-green-highlight dark:text-whiteAlpha-700 dark:hover:text-pink-highlight">
              {`작가: ${authorName}`}
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}
