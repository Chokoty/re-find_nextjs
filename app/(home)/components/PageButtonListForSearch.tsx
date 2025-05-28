import { useEffect, useRef, useState } from 'react';

import PageButton from '@/app/(home)/components/PageButton';

const buttons = [
  { text: '갤러리', path: '/album' },
  { text: '작가', path: '/artists' },
];

export default function PageButtonListForSearch({
  scrollContainerRef,
}: {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setHasScrolled(scrollContainerRef.current.scrollTop > 0); // 스크롤 위치가 0보다 크면 true
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollContainerRef]);

  return (
    <div
      className={`sticky top-0 z-20 mb-1 flex h-16 w-full items-center justify-start gap-2 py-4 pl-8 transition-colors ${
        hasScrolled
          ? 'bg-white shadow-md dark:bg-dark-card' // 스크롤 시 배경색 추가
          : 'bg-transparent' // 맨 위에서는 배경색 제거
      }`}
    >
      {buttons.map((button, index) => (
        <PageButton key={index} text={button.text} path={button.path} />
      ))}
    </div>
  );
}
