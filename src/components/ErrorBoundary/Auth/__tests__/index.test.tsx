import { render, screen } from '@testing-library/react';

import { AppThemeProvider } from '../../../../contexts/Theme';
import { AuthErrorBoundary } from '../index';

function ErrorComponent({ location }: { location?: Record<string, unknown> }) {
  throw Object.assign(new Error('FooBar!'), {
    meta: {
      location,
    },
  });
  // eslint-disable-next-line no-unreachable
  return <div />;
}

describe('Test AuthErrorBoundary', () => {
  it('Should capture the error', () => {
    render(
      <AppThemeProvider>
        <AuthErrorBoundary>
          <ErrorComponent location={{}} />
        </AuthErrorBoundary>
      </AppThemeProvider>,
    );
    expect(
      screen.getByRole('alert', {
        name: 'FooBar!',
      }),
    ).toBeVisible();
  });
});
