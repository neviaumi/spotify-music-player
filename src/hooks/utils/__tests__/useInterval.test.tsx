import { render, screen, waitFor } from '@testing-library/react';
import { useCallback, useState } from 'react';

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '../../../../testHelper/test-runner';
import { useInterval } from '../useInterval';

describe('Test useInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
  });
  it.each([[true], [false]])(
    'useInterval respect enabled flag - %s',
    async enabled => {
      function Dummy() {
        const [callCount, setCallCount] = useState(0);
        useInterval(
          useCallback(() => {
            setCallCount(callCount + 1);
          }, [setCallCount, callCount]),
          100,
          {
            enabled,
          },
        );
        return (
          <div>
            <h1 aria-label="IntervalCallCount">{callCount}</h1>
          </div>
        );
      }
      render(<Dummy />);
      expect(
        screen.getByRole('heading', {
          name: 'IntervalCallCount',
        }),
      ).toBeVisible();
      expect(
        screen.getByRole('heading', {
          name: 'IntervalCallCount',
        }),
      ).toHaveTextContent('0');
      jest.runAllTimers();

      expect(
        screen.getByRole('heading', {
          name: 'IntervalCallCount',
        }),
      ).toHaveTextContent(enabled ? '1' : '0');

      jest.runAllTimers();

      await waitFor(() =>
        expect(
          screen.findByRole('heading', {
            name: 'IntervalCallCount',
          }),
        ).resolves.toHaveTextContent(enabled ? '2' : '0'),
      );
    },
  );
  it('working if handler throw error', () => {
    function Dummy() {
      const [callCount] = useState(0);
      const { error } = useInterval(
        useCallback(() => {
          throw Error('FooBar!');
        }, []),
        1000,
        { enabled: true },
      );
      return (
        <div>
          <h1 aria-label="IntervalCallCount">{callCount}</h1>
          {error && <h1 aria-label="errorMessage">{error.message}</h1>}
        </div>
      );
    }
    render(<Dummy />);
    expect(
      screen.getByRole('heading', {
        name: 'IntervalCallCount',
      }),
    ).toBeVisible();
    expect(
      screen.getByRole('heading', {
        name: 'IntervalCallCount',
      }),
    ).toHaveTextContent('0');
    jest.runAllTimers();
    expect(
      screen.getByRole('heading', {
        name: 'IntervalCallCount',
      }),
    ).toHaveTextContent('0');
    expect(
      screen.getByRole('heading', {
        name: 'errorMessage',
      }),
    ).toHaveTextContent('FooBar!');
  });
});
