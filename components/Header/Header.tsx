import React from 'react';

import HeaderComponent from '@/components/Header/HeaderComponent';
import useHeader from '@/components/Header/useHeader';

export const Header = () => {
  const {
    hideHeader,
    isOpenDrawer,
    toggleDrawer,
    isOpen,
    onOpen,
    onClose,
    myDrawerRef,
  } = useHeader();

  return (
    <>
      {hideHeader ? null : (
        <HeaderComponent
          isOpenDrawer={isOpenDrawer}
          toggleDrawer={toggleDrawer}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          myDrawerRef={myDrawerRef} // 참조 전달
        />
      )}
    </>
  );
};