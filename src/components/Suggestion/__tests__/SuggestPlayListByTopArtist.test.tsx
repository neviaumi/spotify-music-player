import { render } from '@testing-library/react';
import React from 'react';

import { TestApp } from '../../../App';
import { SuggestPlayListByTopArtist } from '../SuggestPlayListByTopArtist';

describe('Test SuggestPlayListByTopArtist component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <TestApp DataFetchingConfigProviderProps={{ initialData: { data: {} } }}>
        <SuggestPlayListByTopArtist />
      </TestApp>,
    );
    expect(getByTestId('playlist-by-top-artist')).toBeDefined();
  });
});
