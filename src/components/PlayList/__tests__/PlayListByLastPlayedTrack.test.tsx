import { render } from '@testing-library/react';
import React from 'react';

import ThemeProvider from '../../../contexts/Theme';
import { PlayListByLastPlayedTrack } from '../PlayListByLastPlayedTrack';

describe('Test PlayListByLastPlayedTrack component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <PlayListByLastPlayedTrack />
      </ThemeProvider>,
    );
    expect(getByTestId('playlist-by-last-played-track')).toBeDefined();
  });
});
