'use client';

import { useQueryClient } from '@tanstack/react-query';

import Button from '@/components/Button';
import queryOptions from '@/service/client/queries';
import { useLogout } from '@/service/client/useCommonService';

export default function LogoutButton() {
  const queryClient = useQueryClient();
  const { queryKey } = queryOptions.myInfo();
  const { refetch: logoutRefetch } = useLogout(); // 로그아웃 요청
  const handleLogout = async () => {
    try {
      await logoutRefetch(); // 서버에서 로그아웃 요청 실행
      // queryClient.invalidateQueries({ queryKey });
      queryClient.removeQueries({ queryKey }); // 즉시 캐시 삭제!
      window.location.href = '/'; // 홈으로 이동
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <Button
      intent="solid-red"
      onClick={handleLogout}
      additionalClass="w-full mx-2"
    >
      로그아웃
    </Button>
  );
}
