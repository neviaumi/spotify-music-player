import { render } from '@testing-library/react';
import React from 'react';

import { TestApp } from '../../../App';
import { PlayListTracksList } from '../PlayListTracksList';

it('render without error', () => {
  const { getByTestId } = render(
    <TestApp DataFetchingConfigProviderProps={{ initialData: { data: {} } }}>
      <PlayListTracksList playListId="foobar" />
    </TestApp>,
  );
  expect(getByTestId('playlist-tracks-list')).toBeDefined();
});
