import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useTabBar = () => {
  const [tab, setTab] = useState('home');
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/') {
      setTab('home');
    } else if (router.pathname.startsWith('/search')) {
      setTab('search');
    } else if (router.pathname.startsWith('/gallary')) {
      setTab('gallary');
    } else if (router.pathname.startsWith('/more')) {
      setTab('more');
    }
  }, [router.pathname]);

  return { tab, setTab };
};

export default useTabBar;
