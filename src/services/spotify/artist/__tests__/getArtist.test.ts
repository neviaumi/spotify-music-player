import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import createPollyContext from '../../../../utils/tests/createPollyContext';
import getArtist from '../getArtist';

createPollyContext();
it('Get artist by given ID', async () => {
  const client = createSpotifyAPIClientForTesting();
  const response = await getArtist(client, '5r0xeBSRKRJ5Dm63XzTZhE');
  expect(response.data).toBeDefined();
  expect(response.data.id).toBeDefined();
});
