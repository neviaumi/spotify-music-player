import { render } from '@testing-library/react';
import React from 'react';

import PresentPlayList from '../PresentPlayListSmall';

describe('Test render PresentPlaylist component', () => {
  it('Should render without error', () => {
    const items = [{ id: '1' }, { id: '2' }, { id: '3' }] as any;

    const { getAllByTestId } = render(<PresentPlayList items={items} />);
    const playlists = getAllByTestId('user-playlist');

    expect(playlists).toHaveLength(3);
  });
});
