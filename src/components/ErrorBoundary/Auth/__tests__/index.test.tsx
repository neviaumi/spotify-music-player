import { render } from '@testing-library/react';
import React from 'react';

import AuthErrorBoundary from '../index';

function ErrorComponent() {
  throw new Error('FooBar!');
  // eslint-disable-next-line no-unreachable
  return <div />;
}

describe('Test AuthErrorBoundary', () => {
  it('Should capture the error', () => {
    const { getByTestId } = render(
      <AuthErrorBoundary>
        <ErrorComponent />
      </AuthErrorBoundary>,
    );
    const errorContainer = getByTestId('error-fallback');
    expect(errorContainer.textContent).toEqual('FooBar!');
  });
});
