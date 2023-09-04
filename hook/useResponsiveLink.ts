import { useState, useEffect } from 'react';
import { links } from '../data/links';

export const useResponsiveLink = (
  id: string,
  type: string
  // mobileLink: string,
  // pcLink: string,
  // boardtype: number
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
  if (type === 'article') {
    if (id === '') return isMobile ? links.mobile.article : links.pc.article;
    return isMobile ? links.mobile.article + id : links.pc.article + id;
  } else if (type === 'menu') {
    return isMobile
      ? links.mobile.menu + id
      : links.pc.menu + id + '%26search.boardtype=I';
  } else if (type === 'member') {
    return isMobile ? links.mobile.member + id : links.pc.member + id;
  }
};
