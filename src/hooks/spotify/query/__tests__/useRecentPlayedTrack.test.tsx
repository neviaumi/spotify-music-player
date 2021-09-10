import { renderHook } from '@testing-library/react-hooks';

import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import { TestApp } from '../../../../App';
import { useRecentPlayedTrack } from '../useRecentPlayedTrack';

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
    result?.current?.data.items.every((item: any) => item.track !== undefined),
  ).toBeTruthy();
});
