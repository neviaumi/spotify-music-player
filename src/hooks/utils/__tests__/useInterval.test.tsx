import { render, screen } from '@testing-library/react';
import { useCallback, useState } from 'react';

import { describe, expect, it } from '../../../../testHelper/test-runner';
import { delay } from '../../../../testHelper/utils/delay';
import { useInterval } from '../useInterval';

describe('Test useInterval', () => {
  [[true], [false]].forEach(([enabled]) => {
    it(`useInterval respect enabled flag - ${enabled}`, async () => {
      function Dummy() {
        const [callCount, setCallCount] = useState(0);
        useInterval(
          useCallback(() => {
            setCallCount(callCount + 1);
          }, [setCallCount, callCount]),
          1000,
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
      await delay(1000);

      expect(
        screen.getByRole('heading', {
          name: 'IntervalCallCount',
        }),
      ).toHaveTextContent(enabled ? '1' : '0');
      await delay(1000);
      expect(
        screen.getByRole('heading', {
          name: 'IntervalCallCount',
        }),
      ).toHaveTextContent(enabled ? '2' : '0');
    });
  });

  it('working if handler throw error', async () => {
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
    await delay(1000);
    expect(
      screen.getByRole('heading', {
        name: 'IntervalCallCount',
      }),
    ).toHaveTextContent('0');
    await delay(1000);
    expect(
      screen.getByRole('heading', {
        name: 'errorMessage',
      }),
    ).toHaveTextContent('FooBar!');
  });
});
