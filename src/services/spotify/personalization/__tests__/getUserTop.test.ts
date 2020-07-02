import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import createPollyContext from '../../../../utils/tests/createPollyContext';
import getUserTop, { Type } from '../getUserTop';
createPollyContext();
it(`Get User Top artist`, async () => {
  const client = createSpotifyAPIClientForTesting();

  const response = await getUserTop(client, Type.ARTIST);
  expect(response.data).toBeDefined();
  expect(response.data).toHaveProperty('items');
});

it(`Get User Top track`, async () => {
  const client = createSpotifyAPIClientForTesting();

  const response = await getUserTop(client, Type.TRACK);
  expect(response.data).toBeDefined();
  expect(response.data).toHaveProperty('items');
});
