import Image from 'next/image';
import Link from 'next/link';

type Prop = {
  album: AlbumArtworkList;
};

export default function GalleryLikedAlbumCard({
  album: { title, id, author, img_url },
}: Prop) {
  return (
    <Link
      href={`/artwork/${id}`}
      prefetch={false}
      className="relative w-full max-w-[185px] hover:bg-gray-200 active:bg-whiteAlpha-400 dark:hover:bg-whiteAlpha-300 dark:active:bg-black-200 md:max-w-[200px]"
    >
      <div className="relative h-[200px] w-full md:h-[350px]">
        <Image
          className="rounded-xl object-cover"
          src={img_url}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
      </div>
      <div className="dark:bg-[linear-gradient(180deg,_hsla(0,_0%,_7%,_.8),_hsla(0,_0%,_7%,_.4)_0%,_hsla(0,_0%,_7%,_0)_0%,_hsla(0,_0%,_7%,_0%)_12.23%,_hsla(0,_0%,_7%,_.64)_86.23%,_#121212 101.07%)] absolute inset-0 z-[1] flex size-full flex-col items-end justify-end rounded-xl bg-[linear-gradient(180deg,_hsla(0,_0%,_7%,_.8),_hsla(0,_0%,_7%,_.4)_0%,_hsla(0,_0%,_7%,_0)_0%,_hsla(0,_0%,_7%,_0%)_47.23%,_hsla(0,_0%,_7%,_.64)_100.23%,_#121212_100.07%)] px-2.5 pb-3.5 pt-2.5 md:px-3 md:pb-4 md:pt-3">
        <div className="flex w-full flex-col items-start gap-1 pr-0 md:pr-2">
          <p className="line-clamp-2 text-xl font-bold text-white md:text-2xl">
            {title}
          </p>
          <p className="text-sm font-normal text-white md:text-base">
            {author}
          </p>
        </div>
      </div>
    </Link>
  );
}
