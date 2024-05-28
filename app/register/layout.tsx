import { Suspense } from 'react';

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 152px = 76px(padding + mobileTabBar) + 76px(padding + header)
    <div className="flex min-h-[calc(100vh-152px)] items-center justify-center">
      <div className="m-auto flex min-h-[inherit] w-full max-w-[500px] flex-col gap-[30px] border-gray-300 px-6 py-8 text-left dark:border-whiteAlpha-300 md:min-h-[400px] md:w-[90%] md:min-w-[400px] md:rounded-lg md:border md:px-[50px] md:py-[60px] md:shadow">
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
}
