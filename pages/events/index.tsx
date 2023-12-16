import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';

// import HashLoader from 'react-spinners/HashLoader';
import EventFanarts from '@/components/events/EventFanarts';
import SearchLayout from '@/components/layout/search-layout';
import RandomFanart from '@/components/tools/RandomFanart';
import { useStore } from '@/store/store';

const Events = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <SearchLayout title="이벤트">
      <EventFanarts initialFanart={null} />
      <RandomFanart />
      <Box h="120vh">준비중...</Box>
    </SearchLayout>
  );
};

export default Events;
