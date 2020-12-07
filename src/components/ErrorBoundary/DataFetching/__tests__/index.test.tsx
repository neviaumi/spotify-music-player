import { render, screen } from '@testing-library/react';

import DataFetchingError from '../../../../errors/DataFetchingError';
import DataFetchingErrorBoundary from '../index';

function ErrorComponent({ err }: { err: Error }) {
  throw err;
  // eslint-disable-next-line no-unreachable
  return <div />;
}

describe('Test DataFetchingErrorBoundary', () => {
  it('Should rethrow the error', () => {
    expect(() =>
      render(
        <DataFetchingErrorBoundary>
          <ErrorComponent err={new Error('FooBar')} />
        </DataFetchingErrorBoundary>,
      ),
    ).toThrow('FooBar');
  });

  it('Should capture the error', () => {
    render(
      <DataFetchingErrorBoundary>
        <ErrorComponent err={new DataFetchingError(new Error(''))} />
      </DataFetchingErrorBoundary>,
    );
    expect(screen.getByTestId('error')).toBeVisible();
  });
});
