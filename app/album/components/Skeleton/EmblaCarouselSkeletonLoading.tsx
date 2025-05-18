type SliderType =
  | 'fanart'
  | 'album'
  | 'board'
  | 'liked'
  | 'custom'
  | 'member'
  | 'artist'
  | 'banner';

const wrapperHeight = {
  fanart: 'h-[220px] md:h-[256px]',
  album: 'h-[220px] md:h-[256px]',
  board: 'h-[205px] md:h-[240px]',
  liked: 'h-[200px] md:h-[350px]',
  custom: 'h-[178px] md:h-[212px]',
  member: 'h-[200px] md:h-[230px]',
  artist: 'h-[177px] md:h-[207px]',
  banner: 'h-[150px] 2xs:h-[170px] ',
};

const imageHeight = {
  fanart: 'size-[120px] md:size-[156px]',
  album: 'size-[120px] md:size-[156px]',
  board: 'size-[120px] md:size-[156px]',
  liked: 'h-[200px] md:h-[350px] w-[185px] md:w-[200px]',
  custom: 'size-[120px] md:size-[156px]',
  member: 'size-[120px] md:size-[150px]',
  artist: 'size-[120px] md:size-[150px]',
  banner: 'h-[110px] 2xs:h-[130px]',
};

export default function EmblaCarouselSkeletonLoading({
  type,
}: {
  type: SliderType;
}) {
  if (type === 'banner') {
    return (
      <div
        role="status"
        className={`flex w-full animate-pulse ${wrapperHeight[type]}`}
      >
        <GalleryAlbumSkeleton type={type} />
      </div>
    );
  }
  return (
    <div
      role="status"
      className={`flex w-full animate-pulse gap-5 pl-2 md:pl-8 ${wrapperHeight[type]}`}
    >
      <GalleryAlbumSkeleton type={type} />
      <GalleryAlbumSkeleton type={type} />
      <GalleryAlbumSkeleton type={type} />
      <GalleryAlbumSkeleton type={type} />
      <GalleryAlbumSkeleton type={type} />
      <GalleryAlbumSkeleton type={type} />
      <GalleryAlbumSkeleton type={type} />
    </div>
  );
}

const GalleryAlbumSkeleton = ({ type }: { type: SliderType }) => {
  const borderRadius =
    type === 'member' || type === 'artist' ? 'rounded-full' : 'rounded-lg';

  return (
    <div
      className={`w-full ${wrapperHeight[type]} flex flex-col py-4 2xs:[&:nth-child(2)]:block [&:nth-child(3)]:hidden 2xs:[&:nth-child(3)]:block md:[&:nth-child(3)]:hidden 2md:[&:nth-child(3)]:block [&:nth-child(4)]:hidden sm:[&:nth-child(4)]:block md:[&:nth-child(4)]:hidden lg:[&:nth-child(4)]:block [&:nth-child(5)]:hidden xl:[&:nth-child(5)]:block [&:nth-child(6)]:hidden xl:[&:nth-child(6)]:block`}
    >
      <div
        className={`w-full bg-gray-125 dark:bg-gray-700 ${borderRadius} ${imageHeight[type]}`}
      />
      {type !== 'liked' && type !== 'banner' && (
        <div className="mt-3 h-7 w-11/12 rounded-md bg-gray-125 dark:bg-gray-700" />
      )}
    </div>
  );
};
