import createSpotifyAPIClient from '../../../../utils/createSpotifyAPIClient';
import getPlayListByTopTrack from '../getPlayListByTopTrack';

it('get playlist by top track', async () => {
  const client = createSpotifyAPIClient(
    'BQBx8lo2HYP1Ao-7gVUDBfc5iXTkHybAyr-DHeuorsTN9hvDu8x1ismUJ7UONF71bBSlxbMJ9O2l0q4vSfRVSPUYaDW6o8UDalynC7TXezpm2Z3IEGmM8WAgrmjM2TTAYi9VGgBfgggOz6o9aZgM--LHVbT6H1UzjqvlPNzyPdFndamc07z7bdlTB0ogy7j3Cft-Wr0z6eIQhFdrtdmBxf1t',
  );
  const response = await getPlayListByTopTrack(client);
  expect(response.data.artist).toBeDefined();
  expect(response.data.playlists).toBeDefined();
});
