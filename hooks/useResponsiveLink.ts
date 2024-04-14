'use client';

import { links } from '@/data/links';
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
    if (id === '') return isMobile ? links.mobile.article : links.pc.article;
    return isMobile ? links.mobile.article + id : links.pc.article + id;
  }
  if (type === 'menu') {
    return isMobile
      ? links.mobile.menu + id
      : `${links.pc.menu + id}%26search.boardtype=I`;
  }
  if (type === 'member') {
    return isMobile ? links.mobile.member + id : links.pc.member + id;
  }
  // TODO: 우선 타입스크립트 도움을 위함
  return '';
};
