import Service from '@/lib/service';
import type { AuthorRecapResult, TotalRecapResult } from '@/types';

class RecapService extends Service {
  async getRecapResults() {
    const response = await this.http.get<TotalRecapResult>(`/v2/recap`);
    return response;
  }

  async getAauthorRecapResults(name: string) {
    const response = await this.http.get<AuthorRecapResult>(
      `/v2/recap?author_nick=${name}`
    );
    return response;
  }
}
// 항상 EventService 동일한 인스턴스를 사용하도록 한다. (싱글톤)
export default new RecapService();
