import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import searchPlayListsByTopTrackArtist from '../searchPlayListsByTopTrackArtist';

it('search playlist by top track', async () => {
  const client = createSpotifyAPIClientForTesting();

  const response = await searchPlayListsByTopTrackArtist(client);
  expect(response.data.artist).toBeDefined();
  expect(response.data.playlists).toBeDefined();
});
