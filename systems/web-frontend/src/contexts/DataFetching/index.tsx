import type { ReactNode } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  QueryClientProviderProps,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export interface DataFetchingConfigProviderProps
  extends Partial<QueryClientProviderProps> {
  children?: ReactNode;
  withDevTools?: boolean;
}

export function DataFetchingConfigProvider({
  children,
  client,
  withDevTools = true,
  ...rest
}: DataFetchingConfigProviderProps) {
  const queryClient =
    client ??
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 3,
          retryDelay: failCount => Math.max(Math.pow(failCount, 2) * 100, 3000),
          suspense: true,
        },
      },
    });
  return (
    <QueryClientProvider client={queryClient} {...rest}>
      {children}
      {withDevTools && <ReactQueryDevtools position="top-right" />}
    </QueryClientProvider>
  );
}

export function TestDataFetchingConfigProvider({
  children,
  ...rest
}: DataFetchingConfigProviderProps) {
  return (
    <DataFetchingConfigProvider {...rest} withDevTools={false}>
      {children}
    </DataFetchingConfigProvider>
  );
}
