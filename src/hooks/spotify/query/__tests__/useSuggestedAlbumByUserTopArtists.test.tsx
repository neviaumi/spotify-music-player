import { renderHook } from '@testing-library/react-hooks';

import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import { TestApp } from '../../../../App';
import { useSuggestedAlbumByUserTopArtists } from '../useSuggestedAlbumByUserTopArtists';

const _context = createPollyContext();
it('Return playlist of user by top artist', async () => {
  const { result, waitFor } = renderHook(
    () => useSuggestedAlbumByUserTopArtists(),
    {
      wrapper: ({ children }) => <TestApp>{children}</TestApp>,
    },
  );
  await waitFor(() => expect(result.current).toBeDefined());
  expect(result.current?.data).toEqual({
    albums: expect.any(Array),
    artists: expect.any(Array),
  });
});
