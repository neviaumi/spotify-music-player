import { render } from '@testing-library/react';
import React from 'react';

import ThemeProvider from '../../../contexts/Theme';
import { SuggestPlayListByTopTrack } from '../SuggestPlayListByTopTrack';

describe('Test SuggestPlayListByTopTrack component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <SuggestPlayListByTopTrack />
      </ThemeProvider>,
    );
    expect(getByTestId('playlist-by-top-track')).toBeDefined();
  });
});
