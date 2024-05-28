import { useQuery } from '@tanstack/react-query';

import queryOptions from '@/service/client/queries';
import type { GetLoginQueryParams } from '@/types';

export function useLogin({ code, state }: GetLoginQueryParams) {
  return useQuery(queryOptions.login({ code, state }));
}

export function useVerificationRequest(email: string) {
  return useQuery(queryOptions.requestVerification(email));
}
