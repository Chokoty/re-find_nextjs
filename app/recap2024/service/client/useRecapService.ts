import { useQuery } from '@tanstack/react-query';

import queryOptions from '@/app/recap2024/service/client/queries';

export function useTotalRecapInfo() {
  return useQuery(queryOptions.totalRecapInfo());
}

export function useAuthorRecapInfo(name: string) {
  return useQuery(queryOptions.authorRecapInfo(name));
}
