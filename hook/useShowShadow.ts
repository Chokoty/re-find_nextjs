import { useEffect, useState } from 'react';

export const useShowShadow = (top: number, bottom: number): boolean => {
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (bottom === 0) {
        if (window.scrollY > top) {
          setShowShadow(true);
        } else {
          setShowShadow(false);
        }
      } else if (window.scrollY > top && window.scrollY < bottom) {
        setShowShadow(true);
      } else {
        setShowShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return showShadow;
};
