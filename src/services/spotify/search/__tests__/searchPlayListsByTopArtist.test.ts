import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import createPollyContext from '../../../../utils/tests/createPollyContext';
import searchPlayListsByTopArtist from '../searchPlayListsByTopArtist';
createPollyContext();
it('search playlist by top artist', async () => {
  const client = createSpotifyAPIClientForTesting();

  const response = await searchPlayListsByTopArtist(client);
  expect(response.data.artist).toBeDefined();
  expect(response.data.playlists).toBeDefined();
});
