import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import createPollyContext from '../../../../utils/tests/createPollyContext';
import searchPlayListsByTopTrack from '../searchPlayListsByTopTrack';
createPollyContext();
it('search playlist by top track', async () => {
  const client = createSpotifyAPIClientForTesting();

  const response = await searchPlayListsByTopTrack(client);
  expect(response.data.track).toBeDefined();
  expect(response.data.playlists).toBeDefined();
});
