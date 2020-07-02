import { render } from '@testing-library/react';
import React from 'react';

import ThemeProvider from '../../../contexts/Theme';
import { SuggestPlayListByTopArtist } from '../SuggestPlayListByTopArtist';

describe('Test SuggestPlayListByTopArtist component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <SuggestPlayListByTopArtist />
      </ThemeProvider>,
    );
    expect(getByTestId('playlist-by-top-artist')).toBeDefined();
  });
});
