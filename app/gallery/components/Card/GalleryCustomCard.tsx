import Image from 'next/image';
import Link from 'next/link';

type Props = {
  info: CustomAlbumInfos;
};

export default function GalleryCustomCard({
  info: { id, name, cover_image },
}: Props) {
  return (
    <div className="relative w-full transition hover:scale-[1.01]">
      <Link href={`/album/${id}?viewType=masonry`} prefetch={false}>
        <div className="relative h-[200px] w-full 2xs:h-[230px] md:h-[280px] 2md:h-[350px] xl:h-[400px]">
          <Image
            className="rounded-2xl bg-gray-100 object-cover"
            src={
              cover_image === '' ? 'https://placehold.co/375x375' : cover_image
            }
            alt={name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        </div>
        <div className="dark:bg-[linear-gradient(180deg,_hsla(0,_0%,_7%,_.8),_hsla(0,_0%,_7%,_.4)_0%,_hsla(0,_0%,_7%,_0)_0%,_hsla(0,_0%,_7%,_0%)_12.23%,_hsla(0,_0%,_7%,_.64)_86.23%,_#121212 101.07%)] absolute inset-0 z-[1] flex size-full flex-col items-end justify-end rounded-2xl bg-[linear-gradient(180deg,_hsla(0,_0%,_7%,_.8),_hsla(0,_0%,_7%,_.4)_0%,_hsla(0,_0%,_7%,_0)_0%,_hsla(0,_0%,_7%,_0%)_47.23%,_hsla(0,_0%,_7%,_.64)_100.23%,_#121212_100.07%)] px-2.5 pb-3.5 pt-2.5 min-[840px]:px-3 min-[840px]:pb-4 min-[840px]:pt-3 min-[1055px]:px-5 min-[1055px]:pb-7 min-[1055px]:pt-5">
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col items-start gap-1 pr-0 min-[840px]:pr-2 min-[1055px]:pr-5 min-[1400px]:pr-[25px] min-[1600px]:pr-[30px]">
              <p className="text-xl font-bold text-white min-[1055px]:text-2xl min-[1600px]:text-3xl">
                {name}
              </p>
              {/* <p className="text-sm font-normal text-white min-[1055px]:text-[15px] min-[1600px]:text-base">
                {author}
              </p> */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
