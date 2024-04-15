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
