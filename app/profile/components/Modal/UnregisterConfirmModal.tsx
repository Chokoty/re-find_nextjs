'use client';

import Button from '@/components/Button';
import useModal from '@/hooks/useModal';
import { useUnregister } from '@/service/client/useCommonService';

export default function UnregisterConfirmModal(props: Record<string, unknown>) {
  const onSuccess = props.onSuccess as () => void;
  const { hide } = useModal();
  const { refetch: unregisterRefetch, isRefetching } = useUnregister();

  const onClose = () => {
    hide();
  };

  const onDelete = async () => {
    try {
      await unregisterRefetch();
      onSuccess();
    } catch (error) {
      console.error('회원탈퇴 중 오류 발생:', error);
      // 실패시 모달은 닫지 않고 사용자에게 알림
      // 필요하다면 토스트나 에러 메시지 표시
    }
    hide();
  };

  return (
    <section className="relative mx-6 my-auto flex flex-col items-center justify-start rounded-2xl bg-white p-8 dark:bg-dark-card 2xs:mx-12 md:mx-auto">
      <h2 className="mt-4 text-center text-xl font-bold lg:text-2xl">
        정말로 탈퇴하시겠습니까?
      </h2>
      <p className="mt-2 text-center text-base text-gray-700 dark:text-gray-200">
        계정과 관련된 모든 정보가 삭제되며,
        <br />이 작업은 되돌릴 수 없습니다.
      </p>
      <div className="mt-4 flex gap-2">
        <Button onClick={onClose} intent="ghost-gray" disabled={isRefetching}>
          취소
        </Button>
        <Button onClick={onDelete} intent="solid-red" disabled={isRefetching}>
          확인하기
        </Button>
      </div>
    </section>
  );
}
