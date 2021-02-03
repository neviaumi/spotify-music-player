import type { ReactNode } from 'react';
import { ConfigInterface, SWRConfig } from 'swr';

export interface DataFetchingConfigProviderProps
  extends ConfigInterface<unknown, unknown, (...args: unknown[]) => unknown> {
  children?: ReactNode;
}

export function DataFetchingConfigProvider({
  children,
  ...rest
}: DataFetchingConfigProviderProps) {
  return (
    <SWRConfig
      value={{
        suspense: true,
        ...rest,
      }}
    >
      {children}
    </SWRConfig>
  );
}

export function TestDataFetchingConfigProvider({
  children,
  ...rest
}: DataFetchingConfigProviderProps) {
  return (
    <DataFetchingConfigProvider {...rest}>
      {children}
    </DataFetchingConfigProvider>
  );
}
