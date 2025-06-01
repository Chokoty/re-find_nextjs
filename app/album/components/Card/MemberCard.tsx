import Image from 'next/image';
import Link from 'next/link';

import { getStaticImage } from '@/app/album/lib/getStaticImage';
import type { Member as MemberType } from '@/types';

export default function MemberCard({ member }: { member: MemberType }) {
  const { value, name, greetings } = member;
  const staticImage = getStaticImage(value);
  return (
    <Link
      href={`/album/${value}?viewType=masonry&sortType=latest`}
      prefetch={false}
      className="m-auto flex h-[200px] max-w-[144px] flex-col items-center justify-start gap-2 rounded-md p-3 transition hover:bg-light-button-hover active:bg-whiteAlpha-400 dark:hover:bg-whiteAlpha-300 dark:active:bg-black-200 md:h-[230px] md:w-full md:max-w-[180px]"
    >
      <div className="relative size-[120px] md:size-[150px]">
        <Image
          className="rounded-full object-cover"
          src={staticImage}
          alt={name}
          sizes="(max-width: 1000px) 10vw, 15vw"
          quality={100}
          fill
          priority
          unoptimized
        />
      </div>
      <div className="w-full">
        <p className="w-full text-start font-bold">{name}</p>
        <p className="w-full text-start text-[14px] leading-6 text-[var(--text-description)] dark:text-whiteAlpha-600">{`"${greetings}"`}</p>
      </div>
    </Link>
  );
}
