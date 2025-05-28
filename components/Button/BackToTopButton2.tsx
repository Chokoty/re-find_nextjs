import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

import Tooltip from '@/components/Tooltip';

interface BackToTopButtonProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export default function BackToTopButton({
  scrollContainerRef,
}: BackToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setIsVisible(scrollContainerRef.current.scrollTop > 300);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollContainerRef]);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-4 right-6 z-[200]">
      <Tooltip label="맨 위로" position="left-center">
        <button
          onClick={scrollToTop}
          className="flex size-[50px] cursor-pointer items-center justify-center rounded-full border-none bg-white px-[15px] py-2.5 text-xl shadow-md transition-all hover:bg-gray-50 active:bg-gray-100 dark:bg-dark-footer dark:hover:bg-gray-800 dark:active:bg-gray-900"
        >
          <FaArrowUp />
        </button>
      </Tooltip>
    </div>
  );
}
