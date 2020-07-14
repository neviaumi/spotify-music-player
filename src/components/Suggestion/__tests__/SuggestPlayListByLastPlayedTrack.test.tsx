import { render } from '@testing-library/react';
import React from 'react';

import { TestApp } from '../../../App';
import { SuggestPlayListByLastPlayedTrack } from '../SuggestPlayListByLastPlayedTrack';

describe('Test SuggestPlayListByLastPlayedTrack component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <TestApp DataFetchingConfigProviderProps={{ initialData: { data: {} } }}>
        <SuggestPlayListByLastPlayedTrack />
      </TestApp>,
    );
    expect(getByTestId('playlist-by-last-played-track')).toBeDefined();
  });
});
