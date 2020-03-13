import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import getCategoryPlayList from '../getCategoryPlayList';

it('Category playlist', async () => {
  const apiClient = createSpotifyAPIClientForTesting();
  const response = await getCategoryPlayList(apiClient, 'cantopop');
  expect(response.data).toBeDefined();
  expect(response.data.playlists).toBeDefined();
  expect(response.data.playlists.items.length).toBeGreaterThan(0);
});
