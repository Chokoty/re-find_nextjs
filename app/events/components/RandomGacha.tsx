import EventFanarts from '@/app/events/components/EventFanarts';
import RandomFanart from '@/app/events/components/RandomFanart';
import PageTitle from '@/components/PageTitle';

const topTitle = {
  title: '팬아트 랜덤 가챠',
  description: '',
};

export default function RandomGacha() {
  return (
    <div className="mx-auto flex w-[90%] flex-col items-center justify-center gap-4">
      <div className="mt-6">
        <PageTitle topTitle={topTitle} />
      </div>
      <RandomFanart />
      <EventFanarts />
    </div>
  );
}
