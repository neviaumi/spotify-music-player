import { render, screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import { TestApp } from '../../../../App';
import { useTopStreamingAlbum } from '../../../../hooks/spotify/query/useTopStreamingAlbum';
import type { Props } from '../Present/PresentSuggestAlbum';
import { withSuggestAlbumBySpotifyTopStreamTracks } from '../SuggestAlbumBySpotifyTopStreamTracks';

jest.mock('../../../../hooks/spotify/query/useTopStreamingAlbum');

const SuggestAlbumBySpotifyTopStreamTracks = withSuggestAlbumBySpotifyTopStreamTracks(
  function ({ title, suggestions, onClickSuggestion }: Props) {
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

describe('Test SuggestAlbumBySpotifyTopStreamTracks', () => {
  it('have title', () => {
    (useTopStreamingAlbum as jest.Mock).mockReturnValue({
      data: {
        albums: [],
      },
    });
    render(
      <TestApp>
        <SuggestAlbumBySpotifyTopStreamTracks />
      </TestApp>,
    );
    expect(
      screen.getByText('Continue with top streaming artist'),
    ).toBeVisible();
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
        <SuggestAlbumBySpotifyTopStreamTracks />
      </TestApp>,
    );
    expect(screen.getByRole('button')).toBeVisible();
    event.click(screen.getByRole('button'));
    expect(history.entries[1].pathname).toEqual('/album/example-album');
  });
});
