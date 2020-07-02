import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import createPollyContext from '../../../../utils/tests/createPollyContext';
import searchPlayLists from '../searchPlayLists';
createPollyContext();
describe('Test search', () => {
  it('get playlist by given query', async () => {
    const client = createSpotifyAPIClientForTesting();

    const response = await searchPlayLists(client, 'endy');
    expect(response.data).toBeDefined();
    expect(response.data.playlists).toHaveProperty('items');
  });
});
