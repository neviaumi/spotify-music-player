import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import searchPlayListByLastPlayedArtist from '../searchPlayListByLastPlayedArtist';

it('search playlist by last played artist', async () => {
  const client = createSpotifyAPIClientForTesting();

  const response = await searchPlayListByLastPlayedArtist(client);
  expect(response.data.artist).toBeDefined();
  expect(response.data.playlists).toBeDefined();
});
