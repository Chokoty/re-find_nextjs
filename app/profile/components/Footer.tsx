'use client';

import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import Button from '@/components/Button';
import useModal from '@/hooks/useModal';
import queryOptions from '@/service/client/queries';

import UnregisterConfirmModal from './Modal/UnregisterConfirmModal';

export default function Footer() {
  const { show: showUnregisterConfirmModal } = useModal(UnregisterConfirmModal);
  const queryClient = useQueryClient();
  const { queryKey } = queryOptions.myInfo();
  const handleUnregister = async () => {
    showUnregisterConfirmModal({
      animateDir: 'bottom',
      onSuccess: () => {
        toast.success('리파인드 회원탈퇴가 완료되었습니다.');
        queryClient.removeQueries({ queryKey });
        window.location.href = '/';
      },
    });
  };
  return (
    <p className="hidden md:block">
      데이터를 영구삭제하려면{' '}
      <Button
        intent="link-red"
        onClick={handleUnregister}
        additionalClass="p-0 align-baseline"
      >
        계정 탈퇴
      </Button>
      하세요
    </p>
  );
}
