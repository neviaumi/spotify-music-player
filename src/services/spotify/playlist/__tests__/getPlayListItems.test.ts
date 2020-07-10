import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import createPollyContext from '../../../../utils/tests/createPollyContext';
import getPlayListItems from '../getPlayListItems';
createPollyContext();
it('get items beside of playlist', async () => {
  const client = createSpotifyAPIClientForTesting();
  const { data } = await getPlayListItems(client, '37i9dQZF1DXdLtD0qszB1w');
  expect(data.items.length).toBeGreaterThan(20);
});
