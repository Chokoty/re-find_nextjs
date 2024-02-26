import type { ReactNode } from 'react';
import React from 'react';

// eslint-disable-next-line import/no-unresolved
// import { MobileHeader } from '@/components/layout/MobileHeader';
// import { NavBar } from '@/components/layout/NavBar';
// import MySnowfall from '@/components/events/MySnowfall';
import { Header } from '@/components/Header/Header';
import { TabBar } from '@/components/TabBar/TabBar';
import { useResponsive } from '@/hook/useResponsive';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useResponsive(); // 모바일 환경인지 체크

  return (
    <>
      <Header />
      <main>{children}</main>
      {/* {isMobile ? <Footer /> : null} */}
      {isMobile && <TabBar />}
    </>
  );
};

export default MainLayout;
