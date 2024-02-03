import { useEffect } from 'react';

// 쿠키 설정 함수
const setCookie = (name: string, value: string, days: number): void => {
  // console.log('setCookie', value);
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000); // 유효 기간을 분 단위로 설정 (1일)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

// 쿠키 가져오기 함수
const getCookie = (name: string): string => {
  const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
  return cookieValue ? cookieValue.pop() : '';
};

// 쿠키 삭제 함수
const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const useCookie = () => {
  return { setCookie, getCookie, deleteCookie };
};
