import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import { expect, it } from '../../../../../testHelper/test-runner';
import { renderHook } from '../../../../../testHelper/testing-library/react-hooks';
import { TestApp } from '../../../../App';
import { useUserPlayList } from '../useUserPlayList';

createPollyContext(import.meta.url);
it('Return user playlist', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useUserPlayList(), {
    wrapper: ({ children }) => <TestApp>{children}</TestApp>,
  });
  await waitForNextUpdate();
  expect(result.error).toBeUndefined();
  expect(
    result.current?.data.items.every((item: any) => item.type === 'playlist'),
  ).toBeTruthy();
});
