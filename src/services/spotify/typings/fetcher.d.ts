import { AxiosInstance, AxiosResponse } from 'axios';

export interface Fetcher<T> {
  (apiClient: AxiosInstance, ...args: unknown[]): Promise<AxiosResponse<T>>;
}
