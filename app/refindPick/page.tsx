import RefindPickAllList from '@/app/refindPick/components/RefindPickAllList';
import PageTitle from '@/components/PageTitle';

const topTitle = {
  title: '리파인드 추천 앨범',
  description: '',
};

export default function RefindPickPage() {
  return (
    <div className="w-full pt-20">
      {/* <h1 className="mb-4 pl-2 text-left text-2xl font-extrabold md:mb-8 md:pl-8 md:text-4xl">
        리파인드 추천 앨범
      </h1> */}
      <PageTitle topTitle={topTitle} />
      <RefindPickAllList />
    </div>
  );
}
