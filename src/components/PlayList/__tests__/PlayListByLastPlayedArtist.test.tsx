import { render } from '@testing-library/react';
import React from 'react';

import ThemeProvider from '../../../contexts/Theme';
import { PlayListByLastPlayedArtist } from '../PlayListByLastPlayedArtist';

describe('Test PlayListByLastPlayedArtist component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <PlayListByLastPlayedArtist />
      </ThemeProvider>,
    );
    expect(getByTestId('playlist-by-last-played-artist')).toBeDefined();
  });
});
