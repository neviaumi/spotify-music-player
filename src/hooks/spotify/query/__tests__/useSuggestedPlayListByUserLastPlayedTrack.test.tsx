import { renderHook } from '@testing-library/react-hooks';

import { createPollyContext } from '../../../../../testHelper/createPollyContext';
import { TestApp } from '../../../../App';
import { useSuggestedAlbumByUserLastPlayedTracks } from '../useSuggestedAlbumByUserLastPlayedTracks';

const _context = createPollyContext();
it('Return playlist of user by last played track', async () => {
  const { result, waitFor } = renderHook(
    () => useSuggestedAlbumByUserLastPlayedTracks(),
    {
      wrapper: ({ children }) => <TestApp>{children}</TestApp>,
    },
  );
  await waitFor(() => expect(result.current).toBeDefined());
  expect(result.error).toBeUndefined();
  expect(result.current?.data).toEqual({
    playlists: expect.any(Array),
    track: expect.any(Object),
  });
});
