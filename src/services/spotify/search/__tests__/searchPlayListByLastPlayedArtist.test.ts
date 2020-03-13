import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import searchPlayListByLastPlayedTrack from '../searchPlayListByLastPlayedTrack';

it('search playlist by last played artist', async () => {
  const client = createSpotifyAPIClientForTesting();

  const response = await searchPlayListByLastPlayedTrack(client);
  expect(response.data.track).toBeDefined();
  expect(response.data.playlists).toBeDefined();
});
