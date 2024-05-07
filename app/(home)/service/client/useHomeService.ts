import { useQuery } from '@tanstack/react-query';

import queryOptions from '@/app/(home)/service/client/queries';

export function useImageInfo({ hash }: { hash: string }) {
  return useQuery(queryOptions.imageInfo(hash));
}

export function useCounts() {
  return useQuery(queryOptions.counts());
}

export function useRecentUpdates() {
  return useQuery(queryOptions.updates());
}
