import { render } from '@testing-library/react';
import React from 'react';

import playlist from '../../../../__fixtures__/playlist.json';
import { TestApp } from '../../../App';
import PlayListTracks from '../index';

describe('Test render PlayListTracks', () => {
  it('Should render PlayListTracks', () => {
    const props = {
      match: {
        params: {
          playListId: 'foobar',
        },
      },
    };
    const { getByTestId } = render(
      <TestApp
        DataFetchingConfigProviderProps={{
          initialData: { data: playlist },
        }}
      >
        <PlayListTracks {...props} />
      </TestApp>,
    );
    expect(getByTestId('playlist-tracks')).toBeDefined();
  });
});
