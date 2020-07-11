import React from 'react';
import { ConfigInterface, SWRConfig } from 'swr';

export interface SWRConfigProviderProps extends ConfigInterface {
  children?: React.ReactNode;
}

export default function SWRConfigProvider({
  children,
  ...rest
}: SWRConfigProviderProps) {
  return <SWRConfig value={{ suspense: true, ...rest }}>{children}</SWRConfig>;
}

export function TestSWRConfigProvider({
  children,
  ...rest
}: SWRConfigProviderProps) {
  return (
    <SWRConfigProvider suspense={false} {...rest}>
      {children}
    </SWRConfigProvider>
  );
}
