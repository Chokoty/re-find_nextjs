import { useQuery } from '@tanstack/react-query';

import queryOptions from '@/app/events/service/client/queries';
import type { CheckBoxType } from '@/types';

// 랜덤 팬아트 가져오기
export function useRandomFanart(checkboxValues: CheckBoxType) {
  return useQuery(queryOptions.randomFanart(checkboxValues));
}

// (미사용) 이세계 페스티벌 작품 가져오기
export function useIsdArtworks() {
  return useQuery(queryOptions.isdArtworks());
}

// (미사용) 키딩 작품 가져오기
export function useKidingArtworks() {
  return useQuery(queryOptions.kidingArtworks());
}

// 랜덤 가챠 버튼 클릭시 작품 가져오기
export function useUrlInfo(url: string) {
  return useQuery(queryOptions.urlInfo(url));
}

export function useWaktyHallArts() {
  return useQuery(queryOptions.waktyHallArts());
}
