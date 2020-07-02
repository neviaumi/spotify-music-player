import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import createPollyContext from '../../../../utils/tests/createPollyContext';
import getAllPlaylist from '../getAllPlaylist';
createPollyContext();
it('resolve all playList', async () => {
  const client = createSpotifyAPIClientForTesting();
  const response = await getAllPlaylist(client);
  expect(response.data.items.length).toBeGreaterThan(20);
});
