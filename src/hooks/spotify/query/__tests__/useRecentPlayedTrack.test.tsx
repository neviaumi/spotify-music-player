/** @jest-environment setup-polly-jest/jest-environment-jsdom */

import { renderHook } from '@testing-library/react-hooks';

import { TestApp } from '../../../../App';
import createPollyContext from '../../../../utils/tests/createPollyContext';
import useRecentPlayedTrack from '../useRecentPlayedTrack';

const _context = createPollyContext();
it('Return user recently played track', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useRecentPlayedTrack(),
    {
      wrapper: ({ children }) => <TestApp>{children}</TestApp>,
    },
  );
  await waitForNextUpdate();
  expect(result.error).toBeUndefined();
  expect(
    result.current.data.items.every((item: any) => item.track !== undefined),
  ).toBeTruthy();
});
