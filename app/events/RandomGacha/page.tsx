'use client';

import PageTitle from '@/components/common/PageTitle';
import RandomFanart from '@/components/common/RandomFanart';
import EventFanarts from '@/components/event/EventFanarts';
import EventLayout from '@/components/layout/event-layout';

const topTitle = {
  title: '팬아트 랜덤 가챠',
  description: '',
};

export default function RandomGacha() {
  return (
    <EventLayout title="이벤트관">
      <PageTitle topTitle={topTitle} />
      <div
        style={{
          width: '100%',
          height: '2rem',
        }}
      ></div>
      <RandomFanart />
      <EventFanarts initialFanart={null} showCnt={0} width={'100%'} />
    </EventLayout>
  );
}
