import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import getPlayListByTopArtistGenre from '../getPlayListByTopArtistGenre';

it('get playlist by top artist genre', async () => {
  const apiClient = createSpotifyAPIClientForTesting();
  const response = await getPlayListByTopArtistGenre(apiClient);
  expect(response.data).toBeDefined();
  expect(response.data.playlists.length).toBeGreaterThan(0);
  expect(response.data.genre).toBeDefined();
});
