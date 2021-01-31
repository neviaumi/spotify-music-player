import axios from 'axios';
import useSWR from 'swr';

export function useUserCountry() {
  const { data } = useSWR(['GET', 'https://ipinfo.io/json'], (method, url) =>
    axios.request({
      method,
      params: { token: process.env.REACT_APP_IPINFO_TOKEN },
      url,
    }),
  );
  return data?.data.country;
}
