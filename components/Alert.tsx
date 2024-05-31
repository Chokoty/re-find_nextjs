import { GoAlertFill } from 'react-icons/go';

export default function Alert() {
  return (
    <div
      // datatype="alert"
      className="mx-auto my-4 flex w-11/12 flex-col items-center justify-center gap-2 rounded-2xl bg-gray-200 p-4"
    >
      <div className="flex items-center">
        <GoAlertFill className="mr-1 size-5 text-red-600" />
        <p className="text-lg font-bold text-gray-900">서버 에러</p>
      </div>
      <p className="text-gray-900">
        현재 서버와의 연결이 불안정합니다! 이용에 불편을 드려 죄송합니다
      </p>
    </div>
  );
}
