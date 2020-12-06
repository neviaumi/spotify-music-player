import React from 'react';
import { ConfigInterface, SWRConfig } from 'swr';

export interface DataFetchingConfigProviderProps
  extends ConfigInterface<any, any, (...args: any) => any> {
  children?: React.ReactNode;
}

export default function DataFetchingConfigProvider({
  children,
  ...rest
}: DataFetchingConfigProviderProps) {
  return <SWRConfig value={{ suspense: true, ...rest }}>{children}</SWRConfig>;
}

export function TestDataFetchingConfigProvider({
  children,
  ...rest
}: DataFetchingConfigProviderProps) {
  return (
    <DataFetchingConfigProvider suspense={false} {...rest}>
      {children}
    </DataFetchingConfigProvider>
  );
}
