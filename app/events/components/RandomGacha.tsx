'use client';

import EventLayout from '@/app/events/components/ui/Layout/EventLayout';
import RandomFanart from '@/app/events/components/ui/RandomFanart';
import PageTitle from '@/components/common/PageTitle';
import EventFanarts from '@/components/event/EventFanarts';

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
