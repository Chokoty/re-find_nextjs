import UpdateCard from '@/app/(home)/components/Card/UpdateCard';
import { EXCEPT_LIST } from '@/app/(home)/lib/const';
import { useRecentUpdates } from '@/app/(home)/service/client/useHomeService';
import Alert from '@/components/Alert';

export default function UpdateCardList() {
  // TODO: 에러 처리 필요? (length가 0인 경우 다른 처리 필요한가?)
  const { data: updates, status } = useRecentUpdates();
  return (
    <div className="flex w-[90%] flex-col items-center justify-center">
      {status === 'pending' ? (
        <Loading />
      ) : status === 'error' ? (
        <Alert />
      ) : (
        updates &&
        updates
          .filter((update) => !EXCEPT_LIST.includes(update.board))
          .map((update, index) => <UpdateCard key={index} update={update} />)
      )}
    </div>
  );
}

const Loading = () => {
  const arr = Array.from({ length: 7 });
  return arr.map((_, index) => (
    <div
      key={index}
      className="flex w-full animate-pulse items-center justify-between border-b border-gray-300 py-4 dark:border-whiteAlpha-300"
      role="status"
    >
      <div className="mr-3 size-20 rounded-lg bg-gray-125 dark:bg-gray-700 md:size-24" />
      <div className="flex h-20 w-full flex-1 flex-col items-start gap-1 2xs:gap-2 md:h-24">
        <div className="h-5 w-2/5 rounded-md bg-gray-125 dark:bg-gray-700 2xs:h-6 md:h-7" />
        <div className="h-6 w-4/5 rounded-md bg-gray-125 dark:bg-gray-700 2xs:h-7 md:h-7" />
      </div>
    </div>
  ));
};
