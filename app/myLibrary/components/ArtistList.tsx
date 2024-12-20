import Image from 'next/image';
import Link from 'next/link';

import { MEMBERS } from '@/app/gallery/lib/const';
import { getStaticImage } from '@/app/gallery/lib/getStaticImage';
import type { Member as MemberType } from '@/types';

export default function MemberList() {
  return (
    <ul className="grid w-full grid-cols-2 gap-6 2xs:grid-cols-3 sm:grid-cols-4 xl:grid-cols-8">
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
    <li className="max-w-[200px] list-none">
      <Link
        className="flex size-full flex-col items-center  justify-center    gap-4 rounded-md p-4 transition hover:bg-gray-200 active:bg-whiteAlpha-400 dark:hover:bg-whiteAlpha-300 dark:active:bg-black-200 "
        href={`/artists/${name}`}
        prefetch={false}
      >
        <div className="relative size-[85px] md:size-[160px]">
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
        <p className="w-full text-start">{name}</p>
      </Link>
    </li>
  );
};
