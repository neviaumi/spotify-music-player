import axios, { AxiosRequestConfig } from 'axios';
// @ts-expect-error i want use the functions on Polly Test in CP so explicit declare use node-http adapter here
import httpAdapter from 'axios/lib/adapters/http';

export function httpRequest(config: Omit<AxiosRequestConfig, 'adapter'>) {
  return axios.request({
    ...config,
    adapter: httpAdapter,
  });
}
