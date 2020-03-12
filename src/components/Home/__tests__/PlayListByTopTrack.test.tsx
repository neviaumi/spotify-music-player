import { render } from '@testing-library/react';
import React from 'react';

import ThemeProvider from '../../../contexts/Theme';
import { PlayListByTopTrack } from '../PlayListByTopTrack';

describe('Test ByLastPlayedTrack component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <PlayListByTopTrack />
      </ThemeProvider>,
    );
    expect(getByTestId('playlist-from-last-played-track')).toBeDefined();
  });
});
