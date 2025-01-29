import UpdateCardList from '@/app/(home)/components/Upload/UpdateCardList';

export default function UpdateBoard() {
  return (
    <div className="mx-auto mb-4 flex w-full flex-col items-center justify-center rounded-lg bg-white shadow-[rgba(0,_0,_0,_0.1)_-3px_4px_14px_0px] dark:bg-dark-card">
      <div className="flex w-[90%] items-center justify-start pb-4 pt-8">
        <h2 className="text-xl font-bold leading-tight">
          게시판 업데이트 현황
        </h2>
      </div>
      <UpdateCardList />
      <div className="flex w-full items-center justify-center p-4">
        <p>명시된 게시판에 있는 원본만 찾을 수 있습니다.</p>
      </div>
    </div>
  );
}
