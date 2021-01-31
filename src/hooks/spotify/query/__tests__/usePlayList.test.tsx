import { renderHook } from '@testing-library/react-hooks';

import { createPollyContext } from '../../../../../testHelper/createPollyContext';
import { TestApp } from '../../../../App';
import { usePlayList } from '../usePlayList';

const _context = createPollyContext();
it('Return playlist info', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => usePlayList('37i9dQZF1DXdLtD0qszB1w'),
    {
      wrapper: ({ children }) => <TestApp>{children}</TestApp>,
    },
  );
  await waitForNextUpdate();
  expect(result.error).toBeUndefined();
  expect(
    result.current.data.tracks.items.every(
      (item: any) => item.track.type === 'track',
    ),
  ).toBeTruthy();
});
