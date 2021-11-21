import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import { expect, it } from '../../../../../testHelper/test-runner';
import { renderHook } from '../../../../../testHelper/testing-library/react-hooks';
import { TestApp } from '../../../../App';
import { useSuggestedAlbumByUserLastPlayedArtists } from '../useSuggestedAlbumByUserLastPlayedArtists';

createPollyContext(import.meta.url);
it('Return playlist of user by last played artist', async () => {
  const { result, waitFor } = renderHook(
    () => useSuggestedAlbumByUserLastPlayedArtists(),
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
