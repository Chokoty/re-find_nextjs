import { Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import MoreLayout from '@/components/layout/more-layout';
import UpdateLog from '@/components/common/UpdateLog';
import { useStore } from '@/store/store';

const Notice = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);

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
};

export default Notice;
