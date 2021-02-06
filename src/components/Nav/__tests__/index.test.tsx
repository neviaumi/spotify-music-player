import { render, screen, waitFor } from '@testing-library/react';

import { createPollyContext } from '../../../../testHelper/polly/createPollyContext';
import { TestApp } from '../../../App';
import { Nav } from '../';

const context = createPollyContext();
describe('Test render Nav component', () => {
  it('Should render without error', async () => {
    context.polly.server.any().intercept((_, res) => {
      res.status(200);
    });
    render(
      <TestApp>
        <Nav />
      </TestApp>,
    );
    await waitFor(() =>
      expect(screen.findByTestId('nav-home')).resolves.toBeVisible(),
    );
  });
});
