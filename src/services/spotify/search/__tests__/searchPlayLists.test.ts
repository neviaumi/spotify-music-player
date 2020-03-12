import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import searchPlayLists from '../searchPlayLists';

describe('Test search', () => {
  it('get playlist by given query', async () => {
    const client = createSpotifyAPIClientForTesting();

    const response = await searchPlayLists(client, 'endy');
    expect(response.data).toBeDefined();
    expect(response.data.playlists).toHaveProperty('items');
  });
});
