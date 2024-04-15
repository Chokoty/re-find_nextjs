'use client';

import { LINKS } from '@/constants/links';
import { useResponsive } from '@/hooks/useResponsive';

export const useResponsiveLink = (
  id: string,
  type: string
  // mobileLink: string,
  // pcLink: string,
  // boardtype: number
) => {
  const isMobile = useResponsive(); // 모바일 환경인지 체크

  // 모바일 또는 PC 링크 반환
  if (type === 'article') {
    if (id === '') return isMobile ? LINKS.mobile.article : LINKS.pc.article;
    return isMobile ? LINKS.mobile.article + id : LINKS.pc.article + id;
  }
  if (type === 'menu') {
    return isMobile
      ? LINKS.mobile.menu + id
      : `${LINKS.pc.menu + id}%26search.boardtype=I`;
  }
  if (type === 'member') {
    return isMobile ? LINKS.mobile.member + id : LINKS.pc.member + id;
  }
  // TODO: 우선 타입스크립트 도움을 위함
  return '';
};
