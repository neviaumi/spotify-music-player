import createSpotifyAPIClient from '../../../../utils/createSpotifyAPIClient';
import { searchPlayLists } from '../searchPlayLists';

describe('Test search', () => {
  it('get playlist by given query', async () => {
    const client = createSpotifyAPIClient(
      'BQAXbHbL0jkQMKvtP5uUhkWk3PhucMsrQQDdKMrmi2l0SaU1aUD9_--B4Bs2tv57AitMNJs_murKYj0Ib0a-6a06dKydzGKuJBkl1wq_dZX6rcXQOP3akN-LCJy2NYKRrZehFRDxoi2UvbQ2v3Kr66B2SgiMCCQnZJ1QhCzxRNWj2ZOI22-eHXtBymaIpVhlzZPur-y9q4evBfwfDQllrXm_',
    );
    const response = await searchPlayLists(client, 'endy');
    expect(response.data).toBeDefined();
    expect(response.data.playlists).toHaveProperty('items');
  });
});
