import Service from '@/lib/service';

class HomeService extends Service {
  async getImageInfoByHash(hash: string) {
    const startTime = new Date().getTime();
    const source = await this.http.get<Source>(`/v2/receive?dhash=${hash}`);
    const endTime = new Date().getTime();
    const elapsedTime = endTime - startTime;
    return { source, elapsedTime };
  }

  getCounts() {
    return this.http.get<Counter>(`/v2/counter`);
  }

  getRecentUpdates() {
    return this.http.get<RecentBoardData[]>(`/last_update_info`);
  }
}

// 항상 HomeService 동일한 인스턴스를 사용하도록 한다. (싱글톤)
export default new HomeService();
