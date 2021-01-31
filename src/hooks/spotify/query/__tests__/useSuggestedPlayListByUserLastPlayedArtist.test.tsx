import { renderHook } from '@testing-library/react-hooks';

import { createPollyContext } from '../../../../../testHelper/createPollyContext';
import { TestApp } from '../../../../App';
import { useSuggestedPlayListByUserLastPlayedArtist } from '../useSuggestedPlayListByUserLastPlayedArtist';

const _context = createPollyContext();
it('Return playlist of user by last played artist', async () => {
  const { result, waitFor } = renderHook(
    () => useSuggestedPlayListByUserLastPlayedArtist(),
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
