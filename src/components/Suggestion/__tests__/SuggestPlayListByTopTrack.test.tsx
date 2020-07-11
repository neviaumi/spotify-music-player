import { render } from '@testing-library/react';
import React from 'react';

import { TestSWRConfigProvider } from '../../../contexts/SWR';
import ThemeProvider from '../../../contexts/Theme';
import { SuggestPlayListByTopTrack } from '../SuggestPlayListByTopTrack';

describe('Test SuggestPlayListByTopTrack component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <TestSWRConfigProvider value={{ initialData: { data: {} } }}>
        <ThemeProvider>
          <SuggestPlayListByTopTrack />
        </ThemeProvider>
      </TestSWRConfigProvider>,
    );
    expect(getByTestId('playlist-by-top-track')).toBeDefined();
  });
});
