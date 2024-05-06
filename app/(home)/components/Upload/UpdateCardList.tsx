import UpdateCard from '@/app/(home)/components/Card/UpdateCard';
import { useRecentUpdates } from '@/app/(home)/service/client/useHomeService';
import Alert from '@/components/Alert';

export default function UpdateCardList() {
  // TODO: 에러 처리 필요? (length가 0인 경우 다른 처리 필요한가?)
  const { data: updates, isLoading } = useRecentUpdates();

  if (isLoading) {
    return <Loading />;
  }

  if (updates === undefined || updates.length === 0) {
    return <Alert />;
  }

  return (
    <div className="flex w-[90%] flex-col items-center justify-center">
      {updates.map((update, index) => (
        <UpdateCard key={index} update={update} />
      ))}
    </div>
  );
}

const Loading = () => {
  return (
    <div
      role="status"
      className="mx-auto mb-4 h-[600px] w-[90%] animate-pulse bg-white dark:bg-dark-card"
    >
      <div className="size-full rounded-2xl bg-gray-125 dark:bg-gray-700" />
    </div>
  );
};
