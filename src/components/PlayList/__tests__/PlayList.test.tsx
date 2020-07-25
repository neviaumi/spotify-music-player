import { render } from '@testing-library/react';
import React from 'react';

import playlist from '../../../../__fixtures__/playlist.json';
import { TestApp } from '../../../App';
import { PlayList } from '../PlayList';

it('render without error', () => {
  const { getByTestId } = render(
    <TestApp
      DataFetchingConfigProviderProps={{ initialData: { data: playlist } }}
    >
      <PlayList playListId="foobar" />
    </TestApp>,
  );
  expect(getByTestId('playlist-info')).toBeDefined();
});
