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
    ['GET', '/.netlify/functions/fetch-top-stream-report', region, period],
    () =>
      axios.request({
        method: 'GET',
        params: {
          period,
          region,
        },
        url: '/.netlify/functions/fetch-top-stream-report',
      }),
  );
  if (!data) return undefined;
  return data;
}
