import createSpotifyAPIClient from '../../../../utils/createSpotifyAPIClient';
import getAllPlaylist from '../getAllPlaylist';

it('resolve all playList', async () => {
  const client = createSpotifyAPIClient(
    'BQAc-kIr1jKBfIXqhfsbCq1_lpf6AiCZ9ckHfBN7jueKNlN2xjN0WQC0TZrsChdYvY6FQEOVn0mIHplUNISXdcmpKN4QB2AjHOs4-z4hr6q6dQbM8MnNYhCBeAkAtIdpty3yll30tQDgw_OWyfZUFEB4Mz7TzXGvW-Pemgti8aT2mv36uLUjSRR0BwVJ2rp9v-bz0r1puWa-UH6XFeYR849f',
  );
  const response = await getAllPlaylist(client);
  expect(response.data.items.length).toBeGreaterThan(20);
});
