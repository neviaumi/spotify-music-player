import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import createPollyContext from '../../../../utils/tests/createPollyContext';
import getPlayList from '../getPlayList';
createPollyContext();
it('get playlist', async () => {
  const client = createSpotifyAPIClientForTesting();
  const { data } = await getPlayList(client, '37i9dQZF1DXdLtD0qszB1w');
  expect(data.name).toEqual('This Is The Beatles');
});
