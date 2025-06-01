import { useEffect, useState } from 'react';

export function useScrollShadow(ref: React.RefObject<HTMLElement | null>) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        setHasScrolled(ref.current.scrollTop > 0);
      }
    };

    const container = ref.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [ref]);

  return hasScrolled;
}
