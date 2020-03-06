import { AxiosInstance, AxiosResponse } from 'axios';

export interface Fetcher<T> {
  (apiClient: AxiosInstance, ...args: any[]): Promise<AxiosResponse<T>>;
}
