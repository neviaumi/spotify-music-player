import { renderHook } from '@testing-library/react-hooks';

import { TestApp } from '../../../../App';
import { createPollyContext } from '../../../../utils/tests/createPollyContext';
import { useUserPlayList } from '../useUserPlayList';

const _context = createPollyContext();
it('Return user playlist', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useUserPlayList(), {
    wrapper: ({ children }) => <TestApp>{children}</TestApp>,
  });
  await waitForNextUpdate();
  expect(result.error).toBeUndefined();
  expect(
    result.current.data.items.every((item: any) => item.type === 'playlist'),
  ).toBeTruthy();
});
