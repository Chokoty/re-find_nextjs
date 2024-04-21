import HomeService from './HomeService';

const queryKeys = {
  imageInfo: (hash: string) => ['imageInfo', hash] as const,
  counts: ['counts'] as const,
  updates: ['updates'] as const,
};

const queryOptions = {
  imageInfo: (hash: string) => ({
    queryKey: queryKeys.imageInfo(hash),
    queryFn: () => HomeService.getImageInfoByHash(hash),
    gcTime: 0, // 이미지 검색후 다시 홈으로 올 때, 성공 및 실패 toast 띄우기 때문에 gcTime을 0으로 설정 (feat. Update.tsx)
  }),
  counts: () => ({
    queryKey: queryKeys.counts,
    queryFn: () => HomeService.getCounts(),
  }),
  updates: () => ({
    queryKey: queryKeys.updates,
    queryFn: () => HomeService.getRecentUpdates(),
  }),
};

export default queryOptions;
