import NextImage from 'next/image';
import NextLink from 'next/link';

import { MainBanner } from '@/lib/images';

export default function Banner() {
  return (
    <div className="w-full">
      <NextLink href="/more/about">
        <NextImage
          className="rounded-2xl"
          width={750}
          height={134}
          priority
          quality={100}
          src={MainBanner}
          alt="배너2"
          // layout="fill"
          // objectFit="cover"
        />
      </NextLink>
    </div>
  );
}
