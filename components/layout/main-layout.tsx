import type { ReactNode } from 'react';
import React from 'react';

import { Header } from '@/components/Header/Header';
// eslint-disable-next-line import/no-unresolved
import { Footer } from '@/components/layout/Footer';
import { MobileHeader } from '@/components/layout/MobileHeader';
import { NavBar } from '@/components/layout/NavBar';
import { TabBar } from '@/components/TabBar/TabBar';
import { useResponsive } from '@/hook/useResponsive';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useResponsive(); // 모바일 환경인지 체크

  return (
    <>
      {!isMobile ? <Header /> : null}
      {/* <NavBar /> */}
      <main>{children}</main>
      <Footer />
      {isMobile ? <TabBar /> : null}
    </>
  );
};

export default MainLayout;
