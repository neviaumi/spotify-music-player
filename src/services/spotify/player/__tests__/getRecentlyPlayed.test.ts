import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import createPollyContext from '../../../../utils/tests/createPollyContext';
import getRecentlyPlayed from '../getRecentlyPlayed';
createPollyContext();
it('Get recently played list', async () => {
  const client = createSpotifyAPIClientForTesting();

  const response = await getRecentlyPlayed(client);
  expect(response.data).toBeDefined();
  expect(response.data).toHaveProperty('items');
});
