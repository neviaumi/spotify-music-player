import React, { Suspense } from 'react';

export default function WithSuspense<T>(
  WrappedComponent: React.ComponentType<T>,
) {
  return function Wrapper(props: T) {
    return (
      <Suspense fallback={<div>Loading</div>}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
}
