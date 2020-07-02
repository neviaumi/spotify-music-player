import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import createPollyContext from '../../../../utils/tests/createPollyContext';
import searchPlayListByLastPlayedTrack from '../searchPlayListByLastPlayedTrack';
createPollyContext();
it('search playlist by last played track', async () => {
  const client = createSpotifyAPIClientForTesting();

  const response = await searchPlayListByLastPlayedTrack(client);
  expect(response.data.track).toBeDefined();
  expect(response.data.playlists).toBeDefined();
});
