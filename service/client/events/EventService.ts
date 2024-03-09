import Service from '@/service';
import { CheckBoxType } from '@/types';

class EventService extends Service {
  async getRandomFanart(checkboxValues: CheckBoxType) {
    const queryParams = Object.keys(checkboxValues)
      .filter((key) => checkboxValues[key as keyof CheckBoxType])
      .join('&');
    return this.http.get<EventFanart>(`/rand?${queryParams}`);
  }

  getIsdArtworks() {
    return this.http.get<EventFanart>(`/isegye_festival`);
  }

  getKidingArtworks() {
    return this.http.get<EventFanart>(`/third_album`);
  }

  async getUrlInfo(url: string) {
    return this.http.get<EventFanart>(url);
  }
}

// 항상 EventService 동일한 인스턴스를 사용하도록 한다. (싱글톤)
export default new EventService();
