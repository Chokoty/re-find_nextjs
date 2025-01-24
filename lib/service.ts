import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

interface HTTPInstance {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  options<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T>;
}

class Service {
  public http: HTTPInstance;

  private baseURL: string;

  // private headers: Record<string, string>;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_NEW_SERVER_URL!;

    // this.headers = {
    //   csrf: 'token',
    //   // Referer: this.baseURL,
    // };

    const axiosInstance: AxiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: 30000, // 30초동안 응답이 없으면 요청 중단
      // withCredentials: true,
      // headers: {
      //   'Content-Type': 'application/json',
      //   ...this.headers,
      // },
    });
    this.http = {
      get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        this.axiosRequest<T>(axiosInstance, 'get', url, undefined, config),
      delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        this.axiosRequest<T>(axiosInstance, 'delete', url, undefined, config),
      head: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        this.axiosRequest<T>(axiosInstance, 'head', url, undefined, config),
      options: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        this.axiosRequest<T>(axiosInstance, 'options', url, undefined, config),
      post: <T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
      ): Promise<T> =>
        this.axiosRequest<T>(axiosInstance, 'post', url, data, config),
      put: <T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
      ): Promise<T> =>
        this.axiosRequest<T>(axiosInstance, 'put', url, data, config),
      patch: <T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
      ): Promise<T> =>
        this.axiosRequest<T>(axiosInstance, 'patch', url, data, config),
    };
  }

  private async axiosRequest<T>(
    axiosInstance: AxiosInstance,
    method: string,
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await axiosInstance.request<T>({
        url,
        method,
        data: data ?? undefined,
        ...config,
      });

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}

export default Service;
