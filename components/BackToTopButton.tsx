'use client';

import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-20 right-5 z-[1000] md:right-10">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="flex size-[50px] cursor-pointer items-center justify-center rounded-full border-none bg-white px-[15px] py-2.5 text-xl shadow-md transition-all hover:bg-gray-50 dark:bg-dark-footer dark:hover:bg-gray-800"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}