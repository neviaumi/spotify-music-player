import { render } from '@testing-library/react';
import React from 'react';

import { TestSWRConfigProvider } from '../../../contexts/SWR';
import ThemeProvider from '../../../contexts/Theme';
import { SuggestPlayListByLastPlayedArtist } from '../SuggestPlayListByLastPlayedArtist';

describe('Test SuggestPlayListByLastPlayedArtist component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <TestSWRConfigProvider value={{ initialData: { data: {} } }}>
        <ThemeProvider>
          <SuggestPlayListByLastPlayedArtist />
        </ThemeProvider>
      </TestSWRConfigProvider>,
    );
    expect(getByTestId('playlist-by-last-played-artist')).toBeDefined();
  });
});
