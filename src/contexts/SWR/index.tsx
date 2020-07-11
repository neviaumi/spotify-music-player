import React from 'react';
import { ConfigInterface, SWRConfig } from 'swr';

interface Props {
  children?: React.ReactNode;
  value?: ConfigInterface;
}

export default function SWRConfigProvider({ children, value = {} }: Props) {
  return <SWRConfig value={{ suspense: true, ...value }}>{children}</SWRConfig>;
}

export function TestSWRConfigProvider({ value, ...rest }: Props) {
  return <SWRConfigProvider value={{ suspense: false, ...value }} {...rest} />;
}
