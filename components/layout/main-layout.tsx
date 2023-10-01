import type { ReactNode } from 'react';
import React from 'react';

// eslint-disable-next-line import/no-unresolved
import { Footer } from './Footer';
import { Header } from './Header';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
