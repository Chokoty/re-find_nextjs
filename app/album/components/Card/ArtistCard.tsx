import Image from 'next/image';
import Link from 'next/link';

export default function ArtistCard({ artist }: { artist: SubscribedArtist }) {
  const { nick, profimg } = artist;
  return (
    <Link
      href={`/album/${nick}?viewType=masonry&sortType=latest`}
      prefetch={false}
      className="m-auto flex h-[177px] max-w-[144px] flex-col items-center justify-start gap-2 rounded-md p-3 transition hover:bg-gray-200 active:bg-whiteAlpha-400 dark:hover:bg-whiteAlpha-300 dark:active:bg-black-200 md:h-[207px] md:w-full md:max-w-[180px]"
    >
      <div className="relative size-[120px] md:size-[150px]">
        <Image
          className="rounded-full object-cover"
          src={profimg}
          alt={nick}
          sizes="(max-width: 1000px) 10vw, 15vw"
          quality={100}
          fill
          priority
          unoptimized
        />
      </div>
      <p className="w-full text-start font-bold">{nick}</p>
    </Link>
  );
}
