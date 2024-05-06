export default function GalleryAlbumSliderSkeleton() {
  return (
    <div role="status" className="flex w-full animate-pulse gap-5 px-8">
      <GalleryAlbumSkeleton />
      <GalleryAlbumSkeleton />
      <GalleryAlbumSkeleton />
    </div>
  );
}

const GalleryAlbumSkeleton = () => {
  return (
    <div className="h-[200px] w-full rounded-2xl bg-gray-125 dark:bg-gray-700 2xs:h-[230px] md:h-[280px] 2md:h-[350px] xl:h-[400px] [&:nth-child(2)]:hidden 2xs:[&:nth-child(2)]:block [&:nth-child(3)]:hidden lg:[&:nth-child(3)]:block" />
  );
};
