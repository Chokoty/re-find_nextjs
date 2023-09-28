import React, { useEffect } from 'react';
import { useStore } from '../../store/store';

import OtherLayout from '../../components/layout/other-layout';
import UpdateLog from '../../components/UpdateLog';

const Notice = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <OtherLayout title="Notice">
      <div className="notice-content">
        <UpdateLog count={0} />
      </div>
    </OtherLayout>
  );
};

export default Notice;
