import { useState, useEffect } from 'react';

export const useResponsiveLink = (
  id: string,
  mobileLink: string,
  pcLink: string,
  boardtype: number
): string => {
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    const checkScreenWidth = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth < 768);
    };

    // 컴포넌트가 마운트될 때 화면 너비 확인
    checkScreenWidth();

    // 화면 크기가 변경될 때 이벤트 리스너 추가
    window.addEventListener('resize', checkScreenWidth);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  // 모바일 또는 PC 링크 반환
  if (id === '') return isMobile ? mobileLink : pcLink;

  if (boardtype === 1) {
    return isMobile ? mobileLink + id : pcLink + id + '%26search.boardtype=I';
  }
  return isMobile ? mobileLink + id : pcLink + id;
};
