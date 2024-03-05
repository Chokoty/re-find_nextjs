'use client';

import { useDisclosure } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function useHeader() {
  const [hideHeader, sethideHeader] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const myDrawerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith('/more')) {
      sethideHeader(true);
    } else {
      sethideHeader(false);
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (
        myDrawerRef.current &&
        !myDrawerRef.current.contains(e.target as HTMLDivElement) &&
        !(e.target as HTMLDivElement).closest('.hamburger-react')
      ) {
        setIsOpenDrawer(false);
      }
    };

    if (isOpenDrawer) {
      window.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenDrawer]);

  const toggleDrawer = () => setIsOpenDrawer(!isOpenDrawer);

  return {
    hideHeader,
    isOpenDrawer,
    toggleDrawer,
    isOpen,
    onOpen,
    onClose,
    myDrawerRef,
  };
}
