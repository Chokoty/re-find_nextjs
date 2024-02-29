'use client';

import { useEffect } from 'react';

import RandomFanart from '@/components/common/RandomFanart';
import EventFanarts from '@/components/event/EventFanarts';
import MySnowfall from '@/components/event/MySnowfall';
import SearchLayout from '@/components/layout/search-layout';
import { useDrawerStore } from '@/store/drawerStore';

export default function Events() {
  const setIsOpen = useDrawerStore((state) => state.setIsOpen);

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
}
