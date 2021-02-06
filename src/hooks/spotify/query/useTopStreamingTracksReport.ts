import axios from 'axios';
import useSWR from 'swr';

export enum Period {
  Weekly = 'weekly',
}

interface Props {
  period: Period;
  region: string;
}

export function useTopStreamingTracksReport({ region, period }: Props) {
  const { data } = useSWR(
    region
      ? ['GET', '/.netlify/functions/fetch-top-stream-report', region, period]
      : null,
    (method, url, _region, _period) =>
      axios.request({
        method,
        params: {
          period: _period,
          region: _region,
        },
        url,
      }),
  );
  if (!data) return undefined;
  return data;
}
