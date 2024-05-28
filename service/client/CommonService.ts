import Service from '@/lib/service';
import type { GetLoginQueryParams } from '@/types';

class CommonService extends Service {
  callbackUrl({ code, state }: GetLoginQueryParams) {
    const url = `/naver_login?code=${code}&state=${state}`;
    return this.http.get(url);
  }

  // 이메일 인증 요청 - login된 상태에서 아무 인자 없이 호출하면 인증 메일 발송 (기본적으로 @naver.com 없이 id를 줍니다)
  requestVerification(email: string) {
    const naverId = email.split('@')[0];
    console.log(naverId);
    const url = `/request_email_verification?naver_id=${naverId}`;
    return this.http.get(url);
  }

  verifyEmail(token: string) {
    const url = `/verify_email?token=${token}`;
    return this.http.get(url);
  }
}

// 항상 CommonService 동일한 인스턴스를 사용하도록 한다. (싱글톤)
export default new CommonService();
