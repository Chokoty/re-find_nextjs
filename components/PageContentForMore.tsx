'use client';

import type { ReactNode } from 'react';
import { useRef } from 'react';

// import PageButtonList from '@/app/(home)/components/PageButtonList';
import BackToTopButton2 from '@/components/Button/BackToTopButton2';

interface PageContentProps {
  children: ReactNode;
}

const PageContentForMore = ({ children }: PageContentProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null); // 내부 스크롤 컨테이너 참조
  return (
    <section className="flex h-full w-2/3 grow flex-col items-center justify-start overflow-hidden rounded-lg border-base border-dark-myText bg-white shadow-sm dark:border-0 dark:bg-dark-card">
      <div
        ref={scrollContainerRef} // 참조 전달
        className="custom-scrollbar flex size-full flex-col items-center justify-start overflow-y-auto border-dark-myText bg-white shadow-sm dark:border-0 dark:bg-dark-card"
      >
        {/* <PageButtonList scrollContainerRef={scrollContainerRef} /> */}
        {children}
      </div>
      <BackToTopButton2 scrollContainerRef={scrollContainerRef} />
    </section>
  );
};

export default PageContentForMore;
