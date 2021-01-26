import { renderHook } from '@testing-library/react-hooks';

import { TestApp } from '../../../../App';
import { createPollyContext } from '../../../../utils/tests/createPollyContext';
import { useSuggestedPlayListByLastPlayedArtist } from '../useSuggestedPlayListByLastPlayedArtist';

const _context = createPollyContext();
it('Return playlist of user by last played artist', async () => {
  const { result, waitFor } = renderHook(
    () => useSuggestedPlayListByLastPlayedArtist(),
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
