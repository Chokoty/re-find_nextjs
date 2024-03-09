import Service from '@/service';

class HomeService extends Service {
  async getImageInfoByHash(hash: string) {
    const startTime = new Date().getTime();
    const source = await this.http.get<Source>(`/receive?dhash=${hash}`);
    const endTime = new Date().getTime();
    const elapsedTime = endTime - startTime;
    return { source, elapsedTime };
  }

  // TODO: timeout: 2000 > 필요?
  getCounts() {
    return this.http.get<Counter>(`/counter`);
  }

  getRecentUpdates() {
    return this.http.get<RecentBoardData[]>(`/last_update_info`);
  }
}

// 항상 HomeService 동일한 인스턴스를 사용하도록 한다. (싱글톤)
export default new HomeService();
