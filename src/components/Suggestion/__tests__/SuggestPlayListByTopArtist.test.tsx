import { render } from '@testing-library/react';
import React from 'react';

import { TestSWRConfigProvider } from '../../../contexts/SWR';
import ThemeProvider from '../../../contexts/Theme';
import { SuggestPlayListByTopArtist } from '../SuggestPlayListByTopArtist';

describe('Test SuggestPlayListByTopArtist component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <TestSWRConfigProvider value={{ initialData: { data: {} } }}>
        <ThemeProvider>
          <SuggestPlayListByTopArtist />
        </ThemeProvider>
      </TestSWRConfigProvider>,
    );
    expect(getByTestId('playlist-by-top-artist')).toBeDefined();
  });
});
