import { render } from '@testing-library/react';
import React from 'react';

import playlist from '../../../../__fixtures__/playlist.json';
import { TestApp } from '../../../App';
import { Playlist } from '../UserPlayList';

describe('Test render UserPlaylist component', () => {
  it('Should render without error', () => {
    const { getAllByTestId } = render(
      <TestApp
        SWRConfigProviderProps={{
          initialData: {
            data: {
              items: [
                { ...playlist, id: '1' },
                { ...playlist, id: '2' },
                { ...playlist, id: '3' },
              ],
            },
          },
        }}
      >
        <Playlist />
      </TestApp>,
    );
    const playlists = getAllByTestId('user-playlist');

    expect(playlists).toHaveLength(3);
  });
});
