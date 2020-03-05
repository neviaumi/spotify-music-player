import getAllPlaylist from '../getAllPlaylist';

it('Should resolve value', async () => {
  const client = {
    request: jest.fn().mockResolvedValue({}),
  } as any;
  await getAllPlaylist(client);
  expect(client.request).toHaveBeenCalledWith({
    url: '/me/playlists',
    method: 'GET',
  });
});
