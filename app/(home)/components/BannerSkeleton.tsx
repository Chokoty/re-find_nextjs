export default function BannerSkeleton() {
  return (
    <div
      role="status"
      className="mx-auto mb-4 h-[150px] w-full animate-pulse flex-col items-center justify-center gap-4 2xs:h-[170px]"
    >
      <div className="mb-4 h-[110px] w-full rounded-2xl bg-gray-125 shadow-cardBox dark:bg-gray-700 2xs:h-[130px]" />
      <div className="flex items-center justify-center gap-4">
        <div className="size-3 rounded-full bg-gray-125 dark:bg-gray-700" />
        <div className="size-3 rounded-full bg-gray-125 dark:bg-gray-700" />
      </div>
    </div>
  );
}
