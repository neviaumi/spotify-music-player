import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import getRecentlyPlayed from '../getRecentlyPlayed';

it('Get recently played list', async () => {
  const client = createSpotifyAPIClientForTesting();

  const response = await getRecentlyPlayed(client);
  expect(response.data).toBeDefined();
  expect(response.data).toHaveProperty('items');
});
