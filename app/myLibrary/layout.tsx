import type { GetServerSideProps, Metadata } from 'next';

// import { getSession } from 'next-auth/react';
import BackToTopButton from '@/components/BackToTopButton';
import LeftSection from '@/components/LeftSection';
import PageContent from '@/components/PageContent';
import { siteConfig } from '@/lib/config';

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context);

//   // ✅ 사용자가 로그인하지 않은 경우 로그인 페이지로 리디렉트
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   // ✅ 로그인된 경우 페이지 렌더링 허용
//   return {
//     props: { user: session.user }, // `session.user`를 props로 전달
//   };
// };

// export const metadata: Metadata = {
//   title: siteConfig.gallery.main.title,
//   description: siteConfig.gallery.main.description,
//   openGraph: {
//     type: siteConfig.type,
//     title: siteConfig.gallery.main.title,
//     description: siteConfig.gallery.main.description,
//     images: siteConfig.image,
//     url: siteConfig.gallery.main.url,
//     siteName: siteConfig.siteName,
//   },
//   twitter: {
//     card: 'summary_large_image',
//     site: siteConfig.siteName,
//     creator: siteConfig.creator,
//     title: siteConfig.gallery.main.title,
//     description: siteConfig.gallery.main.description,
//     images: siteConfig.image,
//   },
//   icons: siteConfig.icons,
// };

export default function MyLibraryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <div className="pb-[60px]">
    //   {children}
    //   <BackToTopButton />
    // </div>
    <div className="mx-auto mt-1 flex h-[calc(100vh-72px)] w-full items-start justify-center gap-2 overflow-hidden px-2">
      <LeftSection />
      <PageContent>{children}</PageContent>
      <BackToTopButton />
    </div>
  );
}
