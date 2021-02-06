import {
  ComponentType,
  PropsWithChildren,
  Suspense as ReactSuspense,
} from 'react';

import { Loading } from '../Loading';

export function Suspense({ children }: PropsWithChildren<unknown>) {
  return <ReactSuspense fallback={<Loading />}>{children}</ReactSuspense>;
}

export function withSuspense<T>(WrappedComponent: ComponentType<T>) {
  return function Wrapper(props: T) {
    return (
      <Suspense>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
}
