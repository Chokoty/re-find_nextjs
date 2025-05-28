import UserProfile from '@/app/profile/components/UserProfile';

export default function MyLibrary() {
  return (
    <div className="w-full p-2">
      <div className="w-full rounded-xl border-[1px] border-dark-myText bg-white shadow-sm dark:border-0 dark:bg-dark-card">
        <div className="w-full pt-4">
          <h1 className="mb-10 mt-1.5 break-keep p-10 font-pop text-5xl sm:text-5xl 2md:text-5xl lg:text-5xl 2xl:text-5xl">
            프로필 설정
          </h1>
        </div>
        <UserProfile />
      </div>
    </div>
  );
}
