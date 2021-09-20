import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import { renderHook } from '../../../../../testHelper/testing-library/react-hooks';
import { TestApp } from '../../../../App';
import { useSuggestedAlbumByUserTopArtistGenres } from '../useSuggestedAlbumByUserTopArtistGenres';

const _context = createPollyContext();
it('Return albums of user by top artist genres', async () => {
  const { result, waitFor } = renderHook(
    () => useSuggestedAlbumByUserTopArtistGenres(),
    {
      wrapper: ({ children }) => <TestApp>{children}</TestApp>,
    },
  );
  await waitFor(() => expect(result.current).toBeDefined());
  expect(result.current?.data).toEqual({
    albums: expect.any(Array),
    genres: expect.any(Array),
  });
});
