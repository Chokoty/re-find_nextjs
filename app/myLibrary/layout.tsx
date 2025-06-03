import PageButtonList from '@/app/(home)/components/PageButtonList';
import CustomScrollContainer from '@/components/CustomScrollContainer';
import LeftSection from '@/components/LeftSection';

export default function MyLibraryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* pb-[calc(60px+20px)]  */}
      <div className="flex w-full flex-col items-center justify-center pb-[calc(80px)] md:hidden">
        {children}
      </div>
      <div className="mx-auto mt-1 hidden h-[calc(100vh-72px)] w-full items-start justify-center gap-2 overflow-hidden px-2 md:flex">
        <LeftSection />
        <section className="hidden h-full w-2/3 grow flex-col items-center justify-start overflow-hidden rounded-lg border-base border-gray-200 bg-white shadow-sm dark:border-0 dark:bg-dark-card md:flex">
          <CustomScrollContainer className="flex size-full flex-col items-center justify-start bg-white shadow-sm transition-all duration-300 dark:border-0 dark:bg-dark-card">
            <PageButtonList />
            {children}
          </CustomScrollContainer>
        </section>
      </div>
    </div>
  );
}
