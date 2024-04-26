import Image from 'next/image';
import Link from 'next/link';

import { MEMBERS } from '@/app/gallery/lib/const';
import { getStaticImage } from '@/app/gallery/lib/getStaticImage';
import type { Member as MemberType } from '@/types';

export default function MemberList() {
  return (
    <ul className="flex w-full flex-wrap gap-[10px]">
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
    <li className="w-[140px] list-none">
      <Link
        href={`/gallery/${value}`}
        prefetch={false}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '7px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="relative size-[90px] md:size-[120px]">
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
        <p className="text-center">{name}</p>
        <p className="text-xs">{`"${greetings}"`}</p>
      </Link>
    </li>
  );
};
