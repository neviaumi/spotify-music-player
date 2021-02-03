import { renderHook } from '@testing-library/react-hooks';

import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
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
  expect(result.current?.data).toEqual({
    albums: expect.any(Array),
    tracks: expect.any(Array),
  });
});
