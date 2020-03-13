import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import searchPlayListsByTopArtist from '../searchPlayListsByTopArtist';

it('search playlist by top artist', async () => {
  const client = createSpotifyAPIClientForTesting();

  const response = await searchPlayListsByTopArtist(client);
  expect(response.data.artist).toBeDefined();
  expect(response.data.playlists).toBeDefined();
});
