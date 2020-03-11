import createSpotifyAPIClient from '../../../../utils/createSpotifyAPIClient';
import getRecentlyPlayed from '../getRecentlyPlayed';

it('Get recently played list', async () => {
  const client = createSpotifyAPIClient(
    'BQBdBZC2faTw2xfA7BjGLDY0YNBEgxrVfNr_fwiy3VyDo9xPMxmzFmLYdmnWGvmkJmot_pTXwpwpei1ikIz7v92g-oDMLT3G25EJcvIfW2eWZW_jVhhrxi269XTz41B6y8Mj8plGKaiuF3BuotZuhuFSml6Fm0xsBIUbaIfbzVzZwa7HZVyK0bs12Ud9XTYkFLT33QUNauXvzFtj9gXZUPB1',
  );
  const response = await getRecentlyPlayed(client);
  expect(response.data).toBeDefined();
  expect(response.data).toHaveProperty('items');
});
