import AuthActionButton from '@/app/profile/components/AuthActionButton';
import Footer from '@/app/profile/components/Footer';
import UserProfile from '@/app/profile/components/UserProfile';

export default function MyLibrary() {
  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col items-center justify-between rounded-xl border-[1px] border-dark-myText bg-white p-2 shadow-sm dark:border-0 dark:bg-dark-card">
      <div className="w-full">
        <div className="w-full pt-4">
          <h1 className="mb-10 mt-1.5 break-keep p-5 font-pop text-5xl sm:text-5xl md:p-10 2md:text-5xl lg:text-5xl 2xl:text-5xl">
            프로필 설정
          </h1>
        </div>
        <div className="px-4 md:p-0">
          <UserProfile />
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 md:hidden">
        <AuthActionButton type="logout" />
        <AuthActionButton type="unregister" />
      </div>
      <Footer />
    </div>
  );
}
