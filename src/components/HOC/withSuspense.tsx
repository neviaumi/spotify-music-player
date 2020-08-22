import React, { Suspense } from 'react';

const WithSuspense = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
) => {
  return function Wrapper(props: T) {
    return (
      <Suspense fallback={<div>Loading</div>}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
};

export default WithSuspense;
