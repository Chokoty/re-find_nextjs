import Image from 'next/image';
import Link from 'next/link';

import SortTypeIcons from '@/components/Icons/SortTypeIcons';
import ViewTypeIcons from '@/components/Icons/ViewTypeIcons';
import { NotFoundProfileURL } from '@/lib/const';

interface AuthorProfileCardProps {
  author: SourceAuthor;
  writerURL: string;
  profURL: string;
  nickname: string;
}

export default function AuthorProfileCard({
  author,
  profURL,
  nickname,
}: AuthorProfileCardProps) {
  return (
    <Link className="mb-2 size-full" href={`/artists/${nickname}`}>
      <div className="flex size-full flex-col items-center justify-center gap-4 rounded-xl bg-white p-8 transition hover:bg-blackAlpha-100 active:bg-blackAlpha-200 dark:bg-dark-card dark:hover:bg-whiteAlpha-100 dark:active:bg-whiteAlpha-200">
        <div className="flex w-full flex-col items-center justify-center gap-4 2xs:flex-row">
          <div className="size-[96px]">
            <Image
              width={100}
              height={100}
              className="size-[96px] rounded-full object-cover"
              src={profURL || NotFoundProfileURL}
              alt={nickname}
              unoptimized
            />
          </div>
          <p className="text-center text-lg">
            {nickname || '프로필은 왁물원에서'}
          </p>
        </div>
        <SortTypeIcons artist={author} />
        <ViewTypeIcons artist={author} />
      </div>
    </Link>
  );
}
