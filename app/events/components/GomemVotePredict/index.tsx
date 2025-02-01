import FlourishEmbed from '@/app/events/components/GomemVotePredict/FlourishEmbed';
import PageTitle from '@/components/PageTitle';

const topTitle = {
  title: '재미로 보는 고멤 왁물원 언급량 레이스',
  description: '',
};

export default function GomemVotePredict() {
  return (
    <div className="mx-auto flex w-[90%] flex-col items-center justify-center gap-4">
      <div className="mt-6 w-full rounded-xl border-[1px] border-dark-myText bg-white py-6 shadow-sm dark:border-0 dark:bg-dark-card">
        <PageTitle topTitle={topTitle} />
      </div>
      <FlourishEmbed id="2754583" type="story" />
    </div>
  );
}
