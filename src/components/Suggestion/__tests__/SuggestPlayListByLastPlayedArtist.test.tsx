import { render } from '@testing-library/react';
import React from 'react';

import { TestApp } from '../../../App';
import { SuggestPlayListByLastPlayedArtist } from '../SuggestPlayListByLastPlayedArtist';

describe('Test SuggestPlayListByLastPlayedArtist component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <TestApp SWRConfigProviderProps={{ initialData: { data: {} } }}>
        <SuggestPlayListByLastPlayedArtist />
      </TestApp>,
    );
    expect(getByTestId('playlist-by-last-played-artist')).toBeDefined();
  });
});
