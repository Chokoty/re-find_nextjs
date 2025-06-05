import CommonService from '@/service/client/CommonService';
import type { GetLoginQueryParams } from '@/types';

const queryKeys = {
  login: ({ code, state }: GetLoginQueryParams) =>
    ['login', code, state] as const,
  requestVerification: (email: string) =>
    ['requestVerification', email] as const,
  verifyEmail: (token: string) => ['verifyEmail', token] as const,
  requestNaverLoginInServer: (currentPageUrl: string) =>
    ['requestNaverLoginInServer', currentPageUrl] as const,
  myInfo: () => ['myInfo'] as const,
  logout: () => ['logout'] as const,
  unregister: () => ['unregister'] as const,
};

const queryOptions = {
  requestNaverLoginInServer: (currentPageUrl: string) => ({
    queryKey: queryKeys.requestNaverLoginInServer(currentPageUrl),
    queryFn: () => CommonService.requestNaverLoginInServer(currentPageUrl),
    // gcTime: 0,
    enabled: false, // 초기에는 호출하지 않음
  }),
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
  verifyEmail: (token: string) => ({
    queryKey: queryKeys.verifyEmail(token),
    queryFn: () => CommonService.verifyEmail(token),
    enabled: false, // 초기에는 호출하지 않음
  }),
  myInfo: () => ({
    queryKey: queryKeys.myInfo(),
    queryFn: () => CommonService.myInfo(),
    meta: { skipGlobalErrorHandler: true },
    // gcTime: 0,
  }),
  updateMyInfo: ({
    nick,
    profImgType,
    handleOnSuccess,
  }: UserInfoUpdateParams & { handleOnSuccess: () => void }) => ({
    mutationFn: () => CommonService.updateMyInfo({ nick, profImgType }),
    onSuccess: () => {
      handleOnSuccess();
    },
  }),
  logout: () => ({
    queryKey: queryKeys.logout(),
    queryFn: () => CommonService.logout(),
    enabled: false, // 초기에는 호출하지 않음
  }),
  unregister: () => ({
    queryKey: queryKeys.unregister(),
    queryFn: () => CommonService.unregister(),
    enabled: false, // 초기에는 호출하지 않음
  }),
};

export default queryOptions;
