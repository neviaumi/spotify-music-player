import { renderHook } from '@testing-library/react-hooks';

import { TestApp } from '../../../../App';
import { createPollyContext } from '../../../../utils/tests/createPollyContext';
import { useSuggestedPlayListByUserTopArtist } from '../useSuggestedPlayListByUserTopArtist';

const _context = createPollyContext();
it('Return playlist of user by top artist', async () => {
  const { result, waitFor } = renderHook(
    () => useSuggestedPlayListByUserTopArtist(),
    {
      wrapper: ({ children }) => <TestApp>{children}</TestApp>,
    },
  );
  await waitFor(() => expect(result.current).toBeDefined());
  expect(result.error).toBeUndefined();
  expect(result.current?.data).toEqual({
    artist: expect.any(Object),
    playlists: expect.any(Array),
  });
});
