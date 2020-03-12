import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import getAllPlaylist from '../getAllPlaylist';

it('resolve all playList', async () => {
  const client = createSpotifyAPIClientForTesting();
  const response = await getAllPlaylist(client);
  expect(response.data.items.length).toBeGreaterThan(20);
});
