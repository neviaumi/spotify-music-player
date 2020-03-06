import { render } from '@testing-library/react';
import React from 'react';

import playlist from '../../../../__fixtures__/playlist.json';
import PresentPlayList from '../PresentPlayList';

describe('Test render PresentPlaylist component', () => {
  it('Should render without error', () => {
    const items = [
      { ...playlist, id: '1' },
      { ...playlist, id: '2' },
      { ...playlist, id: '3' },
    ];

    const { getAllByTestId } = render(<PresentPlayList items={items} />);
    const playlists = getAllByTestId('user-playlist');

    expect(playlists).toHaveLength(3);
  });
});
