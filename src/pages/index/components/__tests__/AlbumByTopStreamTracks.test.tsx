import { render, screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import { TestApp } from '../../../../App';
import { useTopStreamingAlbum } from '../../../../hooks/spotify/query/useTopStreamingAlbum';
import { withAlbumByTopStreamTracks } from '../AlbumByTopStreamTracks';
import type { Props } from '../Present/PresentSuggestAlbum';

jest.mock('../../../../hooks/spotify/query/useTopStreamingAlbum');

const AlbumByTopStreamTracks = withAlbumByTopStreamTracks(
  ({ title, suggestions, onClickSuggestion }: Props) => {
    return (
      <div>
        <h1>{title}</h1>
        <li>
          {suggestions?.map(suggestion => (
            <button
              key={suggestion.id}
              onClick={() => onClickSuggestion(suggestion)}
            >
              {suggestion.name}
            </button>
          ))}
        </li>
      </div>
    );
  },
);

describe('Test AlbumByTopStreamTracks', () => {
  it('have title', () => {
    (useTopStreamingAlbum as jest.Mock).mockReturnValue({
      data: {
        albums: [],
        userCountry: 'HK',
      },
    });
    render(
      <TestApp>
        <AlbumByTopStreamTracks />
      </TestApp>,
    );
    expect(screen.getByText('Top streaming album in HK')).toBeVisible();
  });

  it('Click suggestion should jump to /album/:id', () => {
    (useTopStreamingAlbum as jest.Mock).mockReturnValue({
      data: {
        albums: [
          {
            id: 'example-album',
          },
        ],
      },
    });
    const history = createMemoryHistory();

    render(
      <TestApp RouterProps={{ history }}>
        <AlbumByTopStreamTracks />
      </TestApp>,
    );
    expect(screen.getByRole('button')).toBeVisible();
    event.click(screen.getByRole('button'));
    expect(history.entries[1].pathname).toEqual('/album/example-album');
  });
});
