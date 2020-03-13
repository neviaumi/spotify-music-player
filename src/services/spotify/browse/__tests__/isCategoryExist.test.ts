import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import isCategoryExist from '../isCategoryExist';

it('Category exist', async () => {
  const apiClient = createSpotifyAPIClientForTesting();
  const response = await isCategoryExist(apiClient, 'cantopop');
  expect(response.data).toBeDefined();
  expect(response.data.isCategoryExist).toEqual(true);
});

it('Category not exist', async () => {
  const apiClient = createSpotifyAPIClientForTesting();
  const response = await isCategoryExist(apiClient, 'fjlajfklajlk');
  expect(response.data).toBeDefined();
  expect(response.data.isCategoryExist).toEqual(false);
});
