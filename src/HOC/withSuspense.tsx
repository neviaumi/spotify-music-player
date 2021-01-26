import { ComponentType, Suspense } from 'react';

export function withSuspense<T>(WrappedComponent: ComponentType<T>) {
  return function Wrapper(props: T) {
    return (
      <Suspense fallback={<div>Loading</div>}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
}
