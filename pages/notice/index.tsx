import React, { useEffect } from 'react';
import { useStore } from '../../store/store';
import { Heading } from '@chakra-ui/react';
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
        <Heading size="md" mb={5}>
          업데이트 내용
        </Heading>
        <UpdateLog count={0} />
      </div>
    </OtherLayout>
  );
};

export default Notice;
