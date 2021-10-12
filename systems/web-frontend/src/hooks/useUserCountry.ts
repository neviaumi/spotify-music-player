import axios, { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';

export function useUserCountry() {
  const queryParams: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://ipinfo.io/json',
  };
  const { data } = useQuery(
    [queryParams.method, queryParams.url],
    () => {
      const { method, url } = queryParams;
      return axios.request<{ country: string }>({
        method,
        params: { token: import.meta.env.SNOWPACK_PUBLIC_IPINFO_TOKEN },
        url,
      });
    },
    {
      staleTime: Number.POSITIVE_INFINITY, // Cache will never expire
    },
  );
  if (!data) return undefined;
  return data.data.country ?? 'global';
}
