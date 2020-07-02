import { render } from '@testing-library/react';
import React from 'react';

import ThemeProvider from '../../../contexts/Theme';
import { SuggestPlayListByLastPlayedTrack } from '../SuggestPlayListByLastPlayedTrack';

describe('Test SuggestPlayListByLastPlayedTrack component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <SuggestPlayListByLastPlayedTrack />
      </ThemeProvider>,
    );
    expect(getByTestId('playlist-by-last-played-track')).toBeDefined();
  });
});
