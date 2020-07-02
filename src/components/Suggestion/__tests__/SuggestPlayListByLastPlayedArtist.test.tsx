import { render } from '@testing-library/react';
import React from 'react';

import ThemeProvider from '../../../contexts/Theme';
import { SuggestPlayListByLastPlayedArtist } from '../SuggestPlayListByLastPlayedArtist';

describe('Test SuggestPlayListByLastPlayedArtist component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <SuggestPlayListByLastPlayedArtist />
      </ThemeProvider>,
    );
    expect(getByTestId('playlist-by-last-played-artist')).toBeDefined();
  });
});
