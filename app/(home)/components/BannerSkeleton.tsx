export default function BannerSkeleton() {
  return (
    <div className="mb-2 flex h-[170px] w-full flex-col items-center justify-center gap-4 rounded-2xl bg-white p-4 dark:bg-dark-card">
      <div
        role="status"
        className="mx-auto mb-4 h-[600px] w-full animate-pulse bg-white dark:bg-dark-card"
      >
        <div className="mb-4 h-[100px] w-full rounded-2xl bg-gray-125 shadow-cardBox dark:bg-gray-700" />
        <div className="flex items-center justify-center gap-4">
          <div className="size-3 rounded-full bg-gray-125 dark:bg-gray-700" />
          <div className="size-3 rounded-full bg-gray-125 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
