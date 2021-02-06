import { renderHook } from '@testing-library/react-hooks';

import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import { TestApp } from '../../../../App';
import { useSearchPlayList } from '../useSearchPlayList';

const _context = createPollyContext();
it('Return playlist for given keyword', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useSearchPlayList('"The Beatles"'),
    {
      wrapper: ({ children }) => <TestApp>{children}</TestApp>,
    },
  );
  await waitForNextUpdate();
  expect(result.error).toBeUndefined();
  expect(result.current.data).toHaveProperty('playlists');
});
