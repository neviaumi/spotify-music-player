import { render } from '@testing-library/react';
import React from 'react';

import playlist from '../../../../__fixtures__/playlist.json';
import useDataFetcher from '../../../hooks/useDataFetcher';
import { Playlist } from '../UserPlayList';

jest.mock('../../../hooks/useDataFetcher');

describe('Test render Playlist component', () => {
  it('Should render without error', () => {
    const useDataFetcherMock = useDataFetcher as TestUtils.JestMock<
      typeof useDataFetcher
    >;
    useDataFetcherMock.mockReturnValueOnce({
      data: {
        items: [
          { ...playlist, id: '1' },
          { ...playlist, id: '2' },
          { ...playlist, id: '3' },
        ],
      },
    });
    const { getAllByTestId } = render(<Playlist />);
    const playlists = getAllByTestId('user-playlist');

    expect(playlists).toHaveLength(3);
  });
});
