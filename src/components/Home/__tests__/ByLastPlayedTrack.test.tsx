import { render } from '@testing-library/react';
import React from 'react';

import ThemeProvider from '../../../contexts/Theme';
import { ByLastPlayedTrack } from '../ByLastPlayedTrack';

describe('Test ByLastPlayedTrack component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ByLastPlayedTrack />
      </ThemeProvider>,
    );
    expect(getByTestId('playlist-from-last-played-track')).toBeDefined();
  });
});
