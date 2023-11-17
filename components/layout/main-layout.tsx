import type { ReactNode } from 'react';
import React from 'react';

// eslint-disable-next-line import/no-unresolved
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { TabBar } from '@/components/layout/TabBar';
import { useResponsive } from '@/hook/useResponsive';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useResponsive(); // 모바일 환경인지 체크

  return (
    <>
      {!isMobile ? <Header /> : null}
      <main>{children}</main>
      <Footer />
      {isMobile ? <TabBar /> : null}
    </>
  );
};

export default MainLayout;
