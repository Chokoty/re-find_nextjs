export default function GalleryFanartSliderSkeleton() {
  return (
    <div role="status" className="flex w-full animate-pulse gap-5 px-8">
      <GalleryFanartSkeleton />
      <GalleryFanartSkeleton />
      <GalleryFanartSkeleton />
      <GalleryFanartSkeleton />
    </div>
  );
}

const GalleryFanartSkeleton = () => {
  return (
    <div className="w-full [&:nth-child(2)]:hidden 2xs:[&:nth-child(2)]:block [&:nth-child(3)]:hidden sm:[&:nth-child(3)]:block [&:nth-child(4)]:hidden 2md:[&:nth-child(4)]:block">
      <div className="h-[200px] w-full rounded-2xl bg-gray-125 dark:bg-gray-700 2xs:h-[230px] md:h-[280px] 2md:h-[350px] xl:h-[400px] 2xl:h-[530px]" />
      <div className="mt-3 h-6 w-full rounded-sm bg-gray-125 dark:bg-gray-700" />
    </div>
  );
};
