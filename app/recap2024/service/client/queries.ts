import RecapService from '@/app/recap2024/service/client/RecapService';

const queryKeys = {
  totalRecapInfo: ['totalRecapInfo'] as const,
  authorRecapInfo: (name: string) => ['authorRecapInfo', name] as const,
};

const queryOptions = {
  authorRecapInfo: (name: string) => ({
    queryKey: queryKeys.authorRecapInfo(name),
    queryFn: () => RecapService.getAauthorRecapResults(name),
  }),
  totalRecapInfo: () => ({
    queryKey: queryKeys.totalRecapInfo,
    queryFn: () => RecapService.getRecapResults(),
  }),
};

export default queryOptions;
