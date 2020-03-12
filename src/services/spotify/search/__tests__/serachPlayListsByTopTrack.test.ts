import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import searchPlayListsByTopTrack from '../searchPlayListsByTopTrack';

it('search playlist by top track', async () => {
  const client = createSpotifyAPIClientForTesting();

  const response = await searchPlayListsByTopTrack(client);
  expect(response.data.artist).toBeDefined();
  expect(response.data.playlists).toBeDefined();
});
