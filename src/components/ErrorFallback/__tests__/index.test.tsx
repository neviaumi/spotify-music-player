import { render, screen } from '@testing-library/react';
import type { AxiosError } from 'axios';
import { TestApp } from 'src/App';

import { ErrorFallback } from '../';

describe('Test ErrorFallback', () => {
  it('render non-http error', () => {
    render(
      <TestApp>
        <ErrorFallback
          error={new Error('error')}
          resetErrorBoundary={jest.fn()}
        />
      </TestApp>,
    );
    expect(
      screen.getByRole('heading', {
        name: 'Error',
      }),
    ).toBeVisible();
    expect(
      screen.queryByRole('heading', {
        name: 'Request',
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', {
        name: 'Response',
      }),
    ).not.toBeInTheDocument();
  });

  it('render http error', () => {
    const httpError: AxiosError = Object.assign(new Error('error'), {
      config: {},
      isAxiosError: true,
      toJSON: jest.fn(),
    });
    render(
      <TestApp>
        <ErrorFallback error={httpError} resetErrorBoundary={jest.fn()} />
      </TestApp>,
    );
    expect(
      screen.getByRole('heading', {
        name: 'Error',
      }),
    ).toBeVisible();
    expect(
      screen.getByRole('heading', {
        name: 'Request',
      }),
    ).toBeVisible();
    expect(
      screen.getByRole('heading', {
        name: 'Response',
      }),
    ).toBeVisible();
  });
});
