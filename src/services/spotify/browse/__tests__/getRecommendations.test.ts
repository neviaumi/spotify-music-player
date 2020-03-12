import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import getUserTop, { Type } from '../../personalization/getUserTop';
import getRecentlyPlayed from '../../player/getRecentlyPlayed';
import getRecommendations, { SeedType } from '../getRecommendations';

it('Get recommendations from seed track', async () => {
  const apiClient = createSpotifyAPIClientForTesting();
  const {
    data: { items: tracks },
  } = await getRecentlyPlayed(apiClient);
  const response = await getRecommendations(
    apiClient,
    SeedType.TRACK,
    tracks.map(track => track.track.id),
  );
  expect(response.data).toBeDefined();
  expect(response.config.params).toHaveProperty('seed_tracks');
});

it('Get recommendations from seed artist', async () => {
  const apiClient = createSpotifyAPIClientForTesting();

  const {
    data: { items: artists },
  } = await getUserTop(apiClient, Type.ARTIST);
  const response = await getRecommendations(
    apiClient,
    SeedType.ARTIST,
    artists.map(artist => artist.id),
  );
  expect(response.data).toBeDefined();
  expect(response.config.params).toHaveProperty('seed_artists');
});
