import Service from '@/lib/service';
import type { GetLoginQueryParams } from '@/types';

class CommonService extends Service {
  requestNaverLoginInServer(currentPageUrl: string) {
    const url = `/v2/authorize?prev_loc=${currentPageUrl}`;
    return this.http.get(url);
  }

  callbackUrl({ code, state }: GetLoginQueryParams) {
    const url = `/v2/auth/naver?code=${code}&state=${state}`;
    return this.http.get<NaverloginResponse>(url);
  }

  // 이메일 인증 요청 - login된 상태에서 아무 인자 없이 호출하면 인증 메일 발송 (기본적으로 @naver.com 없이 id를 줍니다)
  requestVerification(email: string) {
    const naverId = email.split('@')[0];
    const url = `/v2/request_email_verification?naver_id=${naverId}`;
    return this.http.get(url);
  }

  verifyEmail(token: string) {
    const url = `/v2/verify_email?token=${token}`;
    return this.http.get(url);
  }

  myInfo() {
    const url = '/v2/me';
    return this.http.get<UserInfo>(url);
  }

  updateMyInfo({ nick, profImgType }: UserInfoUpdateParams) {
    const url = '/v2/me/update';
    return this.http.post<UpdatedUserInfoResponse>(url, {
      nick,
      profImgType,
    });
  }

  logout() {
    const url = '/v2/me/logout';
    return this.http.get(url);
  }

  // updateLikedArticles() {
  //   const url = '/v2/update_liked_articles';
  //   return this.http.get(url);
  // }
}

// 항상 CommonService 동일한 인스턴스를 사용하도록 한다. (싱글톤)
export default new CommonService();
