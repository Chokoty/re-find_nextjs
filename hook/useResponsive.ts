import { useEffect, useState } from 'react';

// 모바일 환경인지 체크하는 훅
export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 컴포넌트가 마운트될 때 화면 너비 확인
    checkScreenWidth();

    // 화면 크기가 변경될 때 이벤트 리스너 추가
    window.addEventListener('resize', checkScreenWidth);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  return isMobile;
};
