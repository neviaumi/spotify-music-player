import { render } from '@testing-library/react';
import React from 'react';

import { TestApp } from '../../../App';
import { SuggestPlayListByTopTrack } from '../SuggestPlayListByTopTrack';

describe('Test SuggestPlayListByTopTrack component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <TestApp DataFetchingConfigProviderProps={{ initialData: { data: {} } }}>
        <SuggestPlayListByTopTrack />
      </TestApp>,
    );
    expect(getByTestId('playlist-by-top-track')).toBeDefined();
  });
});
