import type { AxiosResponse } from 'axios';
import useSWR, { keyInterface } from 'swr';

import { DataFetchingError } from '../errors/DataFetchingError';

export async function useDataFetcher<T>(
  key: keyInterface,
  fn: () => Promise<AxiosResponse<T>>,
) {
  const { data, error } = useSWR(key, fn);
  if (error) {
    throw new DataFetchingError(error);
  }
  return data!;
}
