import Service from '@/service';

class HomeService extends Service {
  async getImageInfoByHash(hash: string) {
    const startTime = new Date().getTime();
    const source = await this.http.get<Source>(`/receive?dhash=${hash}`);
    const endTime = new Date().getTime();
    const elapsedTime = endTime - startTime;
    return { source, elapsedTime };
  }

  // TODO: 개발시 proxy를 쓰므로 개발환경에서 서버용 api 요청 필요
  getCounts() {
    return this.http.get<Counter>(`/counter`);
  }

  // TODO: 개발시 proxy를 쓰므로 개발환경에서 서버용 api 요청 필요
  getRecentUpdates() {
    return this.http.get<RecentBoardData[]>(`/last_update_info`);
  }
}

// 항상 HomeService 동일한 인스턴스를 사용하도록 한다. (싱글톤)
export default new HomeService();
