import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import SearchLayout from '@/components/layout/search-layout';
import { useStore } from '@/store/store';

const Artworks = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <SearchLayout title="팬아트 갤러리">
      <Box h="120vh">준비중...</Box>
    </SearchLayout>
  );
};

export default Artworks;
