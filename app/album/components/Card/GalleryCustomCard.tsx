import Image from 'next/image';
import Link from 'next/link';

type Props = {
  info: CustomAlbumInfos;
};

export default function GalleryCustomCard({
  info: { id, name, cover_image },
}: Props) {
  return (
    <Link
      href={`/album/${id}?viewType=masonry`}
      prefetch={false}
      className="m-auto flex h-[178px] max-w-[144px] flex-col items-center justify-start gap-2 rounded-md p-3 transition hover:bg-gray-200 active:bg-whiteAlpha-400 dark:hover:bg-whiteAlpha-300 dark:active:bg-black-200 md:h-[212px] md:w-full md:max-w-[180px]"
    >
      <div className="relative flex size-[120px] md:size-[156px]">
        <Image
          className="rounded-lg object-cover"
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
      <p className="line-clamp-1 w-full pr-0 text-base font-bold dark:text-white md:pr-3">
        {name}
      </p>
    </Link>
  );
}
