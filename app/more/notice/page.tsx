'use client';

import { useEffect } from 'react';

import UpdateLog from '@/components/common/UpdateLog';
import MoreLayout from '@/components/layout/more-layout';
import { useDrawerStore } from '@/store/drawerStore';

export default function Notice() {
  const setIsOpen = useDrawerStore((state) => state.setIsOpen);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <MoreLayout title="공지사항">
      <div className="notice-content">
        <UpdateLog count={0} />
      </div>
    </MoreLayout>
  );
}
