import createSpotifyAPIClient from '../../../../utils/createSpotifyAPIClient';
import getUserTop, { Type } from '../getUserTop';

it(`Get User Top artist`, async () => {
  const client = createSpotifyAPIClient(
    'BQBdBZC2faTw2xfA7BjGLDY0YNBEgxrVfNr_fwiy3VyDo9xPMxmzFmLYdmnWGvmkJmot_pTXwpwpei1ikIz7v92g-oDMLT3G25EJcvIfW2eWZW_jVhhrxi269XTz41B6y8Mj8plGKaiuF3BuotZuhuFSml6Fm0xsBIUbaIfbzVzZwa7HZVyK0bs12Ud9XTYkFLT33QUNauXvzFtj9gXZUPB1',
  );
  const response = await getUserTop(client, Type.ARTIST);
  expect(response.data).toBeDefined();
  expect(response.data).toHaveProperty('items');
});

it(`Get User Top track`, async () => {
  const client = createSpotifyAPIClient(
    'BQBdBZC2faTw2xfA7BjGLDY0YNBEgxrVfNr_fwiy3VyDo9xPMxmzFmLYdmnWGvmkJmot_pTXwpwpei1ikIz7v92g-oDMLT3G25EJcvIfW2eWZW_jVhhrxi269XTz41B6y8Mj8plGKaiuF3BuotZuhuFSml6Fm0xsBIUbaIfbzVzZwa7HZVyK0bs12Ud9XTYkFLT33QUNauXvzFtj9gXZUPB1',
  );
  const response = await getUserTop(client, Type.TRACK);
  expect(response.data).toBeDefined();
  expect(response.data).toHaveProperty('items');
});
