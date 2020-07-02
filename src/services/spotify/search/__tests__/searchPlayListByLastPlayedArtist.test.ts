import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import createPollyContext from '../../../../utils/tests/createPollyContext';
import searchPlayListByLastPlayedArtist from '../searchPlayListByLastPlayedArtist';
createPollyContext();
it('search playlist by last played artist', async () => {
  const client = createSpotifyAPIClientForTesting();

  const response = await searchPlayListByLastPlayedArtist(client);
  expect(response.data.artist).toBeDefined();
  expect(response.data.playlists).toBeDefined();
});
