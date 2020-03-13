import { render } from '@testing-library/react';
import React from 'react';

import ThemeProvider from '../../../contexts/Theme';
import { PlayListByTopArtist } from '../PlayListByTopArtist';

describe('Test PlayListByTopArtist component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <PlayListByTopArtist />
      </ThemeProvider>,
    );
    expect(getByTestId('playlist-by-top-artist')).toBeDefined();
  });
});
