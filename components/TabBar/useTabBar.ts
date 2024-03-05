'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const useTabBar = () => {
  const [tab, setTab] = useState('home');
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return; // Or set a default tab, if desired
    }
    if (pathname === '/') {
      setTab('home');
    } else if (pathname.startsWith('/search')) {
      setTab('search');
    } else if (pathname.startsWith('/gallery')) {
      setTab('gallery');
    } else if (pathname.startsWith('/artists')) {
      setTab('artists');
    }
  }, [pathname]);

  return { tab, setTab };
};

export default useTabBar;
