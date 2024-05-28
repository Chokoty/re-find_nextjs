import CommonService from '@/service/client/CommonService';
import type { GetLoginQueryParams } from '@/types';

const queryKeys = {
  login: ({ code, state }: GetLoginQueryParams) =>
    ['login', code, state] as const,
  requestVerification: (email: string) =>
    ['requestVerification', email] as const,
};

const queryOptions = {
  login: ({ code, state }: GetLoginQueryParams) => ({
    queryKey: queryKeys.login({ code, state }),
    queryFn: () => CommonService.callbackUrl({ code, state }),
    // gcTime: 0,
    enabled: false, // 초기에는 호출하지 않음
  }),
  requestVerification: (email: string) => ({
    queryKey: queryKeys.requestVerification(email),
    queryFn: () => CommonService.requestVerification(email),
    enabled: false, // 초기에는 호출하지 않음
  }),
};

export default queryOptions;
