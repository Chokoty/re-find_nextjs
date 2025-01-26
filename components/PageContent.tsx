'use client';

import type { ReactNode } from 'react';

import PageButtonList from '@/app/(home)/components/PageButtonList';

interface PageContentProps {
  children: ReactNode;
}

const PageContent = ({ children }: PageContentProps) => {
  return (
    <section className="flex h-full w-2/3 grow flex-col items-center justify-start overflow-hidden rounded-lg border-base border-dark-myText bg-white shadow-sm dark:border-0 dark:bg-dark-card">
      <PageButtonList />
      <div className="custom-scrollbar  flex size-full flex-col items-center justify-start overflow-y-auto border-dark-myText bg-white pt-4  shadow-sm dark:border-0 dark:bg-dark-card">
        {children}
      </div>
    </section>
  );
};

export default PageContent;
