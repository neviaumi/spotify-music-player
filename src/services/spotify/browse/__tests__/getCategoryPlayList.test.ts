import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import createPollyContext from '../../../../utils/tests/createPollyContext';
import getCategoryPlayList from '../getCategoryPlayList';
createPollyContext();

it('Category playlist', async () => {
  const apiClient = createSpotifyAPIClientForTesting();
  const response = await getCategoryPlayList(apiClient, 'toplists');
  expect(response.data).toBeDefined();
  expect(response.data.playlists).toBeDefined();
  expect(response.data.playlists.items.length).toBeGreaterThan(0);
});
