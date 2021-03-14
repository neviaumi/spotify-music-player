import axios, { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';

export enum Period {
  Weekly = 'weekly',
}

interface Props {
  period: Period;
  region: string;
}

export function useTopStreamingTracksReport({ region, period }: Props) {
  const queryParams: AxiosRequestConfig = {
    method: 'GET',
    params: {
      period,
      region,
    },
    url: '/.netlify/functions/fetch-top-stream-report',
  };
  const { data } = useQuery(
    [
      queryParams.method,
      queryParams.url,
      queryParams.params.region,
      queryParams.params.period,
    ],
    () => {
      const { method, params, url } = queryParams;
      return axios.request({
        method,
        params,
        url,
      });
    },
    {
      enabled: region !== undefined,
      staleTime: Number.POSITIVE_INFINITY,
    },
  );
  if (!data) return undefined;
  return data;
}
