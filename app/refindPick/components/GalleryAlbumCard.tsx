import Image from 'next/image';
import Link from 'next/link';

type Prop = {
  album: AlbumInfo;
};

// const getBadgeText = ({
//   badgeValue,
//   badgeType,
// }: {
//   badgeValue: string;
//   badgeType: string;
// }) => {
//   if (badgeType === 'special') {
//     if (badgeValue === 'isdPick') {
//       return '이세돌픽';
//     }
//     return '특집 팬아트';
//   }
//   return '추천 키워드';
// };

export default function GalleryAlbumCard({
  album: { title, id, description, author, cover_image },
}: Prop) {
  return (
    <Link
      href={`/album/${id}?viewType=masonry`}
      prefetch={false}
      className="m-auto flex h-[220px] max-w-[144px] flex-col items-center justify-start gap-2 rounded-md p-3 transition hover:bg-light-button-hover active:bg-whiteAlpha-400 dark:hover:bg-whiteAlpha-300 dark:active:bg-black-200 md:h-[256px] md:w-full md:max-w-[180px]"
    >
      <div className="relative flex size-[120px] md:size-[156px]">
        <Image
          className="rounded-lg object-cover"
          src={
            cover_image === '' ? 'https://placehold.co/375x375' : cover_image
          }
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start gap-1 pr-0 md:pr-3">
          <p className="line-clamp-1 text-base font-bold dark:text-white">
            {title}
          </p>
          <p className="line-clamp-2 text-sm font-normal text-blackAlpha-700 dark:text-whiteAlpha-600">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
