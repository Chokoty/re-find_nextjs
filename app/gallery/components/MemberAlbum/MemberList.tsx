import Image from 'next/image';
import Link from 'next/link';

import { MEMBERS } from '@/app/gallery/lib/const';
import { getStaticImage } from '@/app/gallery/lib/getStaticImage';
import type { Member as MemberType } from '@/types';

export default function MemberList() {
  return (
    <ul className="grid w-full grid-cols-2 place-content-center justify-items-center gap-y-6 2xs:grid-cols-3 sm:grid-cols-4 md:pl-6 xl:grid-cols-5">
      {MEMBERS.map((member) => (
        <Member key={member.id} member={member} />
      ))}
    </ul>
  );
}

const Member = ({ member }: { member: MemberType }) => {
  const { value, name, greetings } = member;
  const staticImage = getStaticImage(value);
  return (
    <li className="max-w-[144px] list-none md:max-w-[180px]">
      <Link
        // href={`/gallery/${value}`}
        href={`/album/${value}?viewType=masonry&sortType=latest`}
        prefetch={false}
        className="flex size-full flex-col items-center  justify-center    gap-2 rounded-md p-3 transition hover:bg-gray-200 active:bg-whiteAlpha-400 dark:hover:bg-whiteAlpha-300 dark:active:bg-black-200 "
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
          <p className="w-full text-start text-[14px] leading-6  text-blackAlpha-700 dark:text-whiteAlpha-600">{`"${greetings}"`}</p>
        </div>
      </Link>
    </li>
  );
};
