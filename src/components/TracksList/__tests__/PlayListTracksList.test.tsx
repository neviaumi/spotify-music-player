import { render } from '@testing-library/react';
import React from 'react';

import ThemeProvider from '../../../contexts/Theme';
import { PlayListTracksList } from '../PlayListTracksList';

it('render without error', () => {
  const { getByTestId } = render(
    <ThemeProvider>
      <PlayListTracksList playListId="foobar" />
    </ThemeProvider>,
  );
  expect(getByTestId('playlist-tracks-list')).toBeDefined();
});
