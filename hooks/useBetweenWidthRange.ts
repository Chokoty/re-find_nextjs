import { useEffect, useState } from 'react';

export default function useBetweenWidthRange(min: number, max: number) {
  const [isInRange, setIsInRange] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      const width = window.innerWidth;
      setIsInRange(width > min && width <= max);
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, [min, max]);

  return isInRange;
}
