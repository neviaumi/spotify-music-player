import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import { expect, it } from '../../../../../testHelper/test-runner';
import { renderHook } from '../../../../../testHelper/testing-library/react-hooks';
import { TestApp } from '../../../../App';
import { usePlayList } from '../usePlayList';

createPollyContext(import.meta.url);
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
    result.current?.data.tracks.items.every(
      (item: any) => item.track.type === 'track',
    ),
  ).toBeTruthy();
});
