'use client';

import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import Button from '@/components/Button';
import useModal from '@/hooks/useModal';
import queryOptions from '@/service/client/queries';
import { useLogout } from '@/service/client/useCommonService';

import UnregisterConfirmModal from './Modal/UnregisterConfirmModal';

export default function AuthActionButton({
  type,
}: {
  type: 'unregister' | 'logout';
}) {
  const queryClient = useQueryClient();
  const { queryKey } = queryOptions.myInfo();
  const { refetch: logoutRefetch } = useLogout();
  const { show: showUnregisterConfirmModal } = useModal(UnregisterConfirmModal);

  const handleLogout = async () => {
    await logoutRefetch();
    queryClient.removeQueries({ queryKey });
    window.location.href = '/';
  };

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

  const getButtonConfig = () => {
    if (type === 'unregister') {
      return {
        intent: 'solid-red' as const,
        onClick: handleUnregister,
        text: '회원탈퇴',
      };
    }

    return {
      intent: 'solid-gray' as const,
      onClick: handleLogout,
      text: '로그아웃',
    };
  };

  const { intent, onClick, text } = getButtonConfig();

  return (
    <Button intent={intent} onClick={onClick} additionalClass="w-full">
      {text}
    </Button>
  );
}
