import type { GetLoginQueryParams } from '@/types';
import CommonService from '@/service/client/CommonService';

const queryKeys = {
  login: ({ code, state }: GetLoginQueryParams) =>
    ['login', code, state] as const,
  verify: ['verify'] as const,
};

const queryOptions = {
  login: ({ code, state }: GetLoginQueryParams) => ({
    queryKey: queryKeys.login({ code, state }),
    queryFn: () => CommonService.callbackUrl({ code, state }),
    // gcTime: 0,
    enabled: false, // 초기에는 호출하지 않음
  }),
  verify: () => ({
    queryKey: queryKeys.verify,
    queryFn: () => CommonService.verifyWithNaverEmail(),
    enabled: false, // 초기에는 호출하지 않음
  }),
};

export default queryOptions;
