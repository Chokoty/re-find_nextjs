import EventService from '@/app/events/service/client/EventService';
import type { CheckBoxType } from '@/types';

const queryKeys = {
  randomFanart: (checkboxValues: CheckBoxType) => {
    const queryParams = Object.keys(checkboxValues)
      .filter((key) => checkboxValues[key as keyof CheckBoxType])
      .join('&');
    return ['randomFanart', queryParams] as const;
  },
  isdArtworks: ['isdArtworks'] as const,
  kidingArtworks: ['kidingArtworks'] as const,
  waktyHallArts: ['waktyHallArts'] as const,
  tagImages: (tag: string) => ['tagImages', tag] as const,
  urlInfo: (url: string) => ['urlInfo', url] as const,
};

const queryOptions = {
  randomFanart: (checkboxValues: CheckBoxType) => ({
    queryKey: queryKeys.randomFanart(checkboxValues),
    queryFn: () => EventService.getRandomFanart(checkboxValues),
    enabled: false, // 초기에는 호출하지 않음
  }),
  isdArtworks: () => ({
    queryKey: queryKeys.isdArtworks,
    queryFn: () => EventService.getIsdArtworks(),
    enabled: false, // 초기에는 호출하지 않음
  }),
  kidingArtworks: () => ({
    queryKey: queryKeys.kidingArtworks,
    queryFn: () => EventService.getKidingArtworks(),
    enabled: false, // 초기에는 호출하지 않음
  }),
  urlInfo: (url: string) => ({
    queryKey: queryKeys.urlInfo(url),
    queryFn: () => EventService.getUrlInfo(url),
    enabled: false, // 초기에는 호출하지 않음
  }),
  waktyHallArts: () => ({
    queryKey: queryKeys.waktyHallArts,
    queryFn: () => EventService.getWaktyHallArts(),
    // enabled: false, // 초기에는 호출하지 않음
  }),
  tagImages: (tag: string) => ({
    queryKey: queryKeys.tagImages(tag),
    queryFn: () => EventService.getTagImages(tag),
    staleTime: 360 * 1000, // 360sec(3min)
    refetchOnWindowFocus: false,
  }),
};

export default queryOptions;
