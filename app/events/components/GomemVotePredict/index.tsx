import FlourishChart from '@/app/events/components/GomemVotePredict/flourish';
import PageTitle from '@/components/PageTitle';

const topTitle = {
  title: '재미로 보는 고멤투표 예측',
  description: '',
};

export default function GomemVotePredict() {
  return (
    <div className="mx-auto flex w-[90%] flex-col items-center justify-center gap-4">
      <div className="mt-6">
        <PageTitle topTitle={topTitle} />
      </div>
      <FlourishChart id="20975967" />
    </div>
  );
}
