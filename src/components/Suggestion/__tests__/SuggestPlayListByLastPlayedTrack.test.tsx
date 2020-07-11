import { render } from '@testing-library/react';
import React from 'react';

import { TestSWRConfigProvider } from '../../../contexts/SWR';
import ThemeProvider from '../../../contexts/Theme';
import { SuggestPlayListByLastPlayedTrack } from '../SuggestPlayListByLastPlayedTrack';

describe('Test SuggestPlayListByLastPlayedTrack component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <TestSWRConfigProvider value={{ initialData: { data: {} } }}>
        <ThemeProvider>
          <SuggestPlayListByLastPlayedTrack />
        </ThemeProvider>
      </TestSWRConfigProvider>,
    );
    expect(getByTestId('playlist-by-last-played-track')).toBeDefined();
  });
});
