import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';

// import HashLoader from 'react-spinners/HashLoader';
import EventFanarts from '@/components/events/EventFanarts';
import MySnowfall from '@/components/events/MySnowfall';
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
      <MySnowfall />
      <RandomFanart />
      <EventFanarts initialFanart={null} />
      <Box h="120vh">준비중...</Box>
    </SearchLayout>
  );
};

export default Events;
