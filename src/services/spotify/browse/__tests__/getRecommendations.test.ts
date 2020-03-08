import createSpotifyAPIClient from '../../../../utils/createSpotifyAPIClient';
import getUserTop, { Type } from '../../personalization/getUserTop';
import getRecentlyPlayed from '../../player/getRecentlyPlayed';
import getRecommendations, { SeedType } from '../getRecommendations';

it('Get recommendations from seed track', async () => {
  const apiClient = createSpotifyAPIClient(
    'BQD6YXCR9PhmY8v2mg7A373FsYuL2Fn0-D2vaGgrMPxdHgcNlIFU8lZGfXeS1In447g1gpWGQU38WlbFJORo0DUrxS9INaqxv9-bMmCj3Y4cZ6vfDaKhV-RDfaPuKMPqoZ-IF7kKwo2ye03qGc0PcXwlxNN2SQlo7zQIKZsY5xkt1cjecHnVJ8N00qNFDZbrpXYoDlMgMgSXAlKaD_hsyRxN',
  );
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
  const apiClient = createSpotifyAPIClient(
    'BQD6YXCR9PhmY8v2mg7A373FsYuL2Fn0-D2vaGgrMPxdHgcNlIFU8lZGfXeS1In447g1gpWGQU38WlbFJORo0DUrxS9INaqxv9-bMmCj3Y4cZ6vfDaKhV-RDfaPuKMPqoZ-IF7kKwo2ye03qGc0PcXwlxNN2SQlo7zQIKZsY5xkt1cjecHnVJ8N00qNFDZbrpXYoDlMgMgSXAlKaD_hsyRxN',
  );
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
