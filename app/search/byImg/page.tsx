'use client';

import React, { useEffect } from 'react';

import OtherLayout from '@/components/layout/other-layout';
import { useDrawerStore } from '@/store/drawerStore';

export default function Result() {
  const setIsOpen = useDrawerStore((state) => state.setIsOpen);

  // const color = useColorModeValue(lightMode.color, darkMode.color);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <OtherLayout title="Support">
      <div className="toLink">result</div>
    </OtherLayout>
  );
}
