import axios from 'axios';

import Service from '@/lib/service';
import type { CheckBoxType } from '@/types';

class EventService extends Service {
  getRandomFanart(checkboxValues: CheckBoxType) {
    const queryParams = Object.keys(checkboxValues)
      .filter((key) => checkboxValues[key as keyof CheckBoxType])
      .join(';');
    return this.http.get<EventFanart>(`/v2/rand?galleries=${queryParams}`);
  }

  getIsdArtworks() {
    return this.http.get<EventFanart>(`/isegye_festival`);
  }

  getKidingArtworks() {
    return this.http.get<EventFanart>(`/third_album`);
  }

  getUrlInfo(url: string) {
    return this.http.get<EventFanart>(url);
  }

  getWaktyHallArts() {
    return this.http.get<WaktyHall>(`/waktyhall`);
  }

  // 추후 변경
  async getTagImages(tag: string) {
    const url = '/api2/get_images';
    return axios
      .post(url, {
        tag,
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error('오류 발생:', error);
        // 오류 처리를 여기서 합니다
        return null;
      });
  }
}

// 항상 EventService 동일한 인스턴스를 사용하도록 한다. (싱글톤)
export default new EventService();
