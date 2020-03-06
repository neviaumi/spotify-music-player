import createSpotifyAPIClient from '../../../../utils/createSpotifyAPIClient';
import getAllPlaylist from '../getAllPlaylist';

it('Should resolve value', async () => {
  const client = createSpotifyAPIClient('foobar!');
  await getAllPlaylist(client);
  expect(true).toEqual(true);
});
