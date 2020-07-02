import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import createPollyContext from '../../../../utils/tests/createPollyContext';
import isCategoryExist from '../isCategoryExist';
createPollyContext();

it('Category exist', async () => {
  const apiClient = createSpotifyAPIClientForTesting();
  const response = await isCategoryExist(apiClient, 'toplists');
  expect(response.data).toBeDefined();
  expect(response.data.isCategoryExist).toEqual(true);
});

it('Category not exist', async () => {
  const apiClient = createSpotifyAPIClientForTesting();
  const response = await isCategoryExist(apiClient, 'fjlajfklajlk');
  expect(response.data).toBeDefined();
  expect(response.data.isCategoryExist).toEqual(false);
});
