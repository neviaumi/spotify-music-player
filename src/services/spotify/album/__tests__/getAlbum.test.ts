import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import createPollyContext from '../../../../utils/tests/createPollyContext';
import getAlbum from '../getAlbum';

createPollyContext();

it('Get album by given ID', async () => {
  const client = createSpotifyAPIClientForTesting();
  const response = await getAlbum(client, '5Xj7E6AboPIZ1IVPX1iihw');
  expect(response.data).toBeDefined();
  expect(response.data.id).toBeDefined();
});
