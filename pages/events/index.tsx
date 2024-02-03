import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import RandomFanart from '@/components/common/RandomFanart';
// import HashLoader from 'react-spinners/HashLoader';
import EventFanarts from '@/components/event/EventFanarts';
import MySnowfall from '@/components/event/MySnowfall';
import SearchLayout from '@/components/layout/search-layout';
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
      <EventFanarts initialFanart={null} showCnt={0} width={'100%'} />
    </SearchLayout>
  );
};

export default Events;
