import { render, screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import { TestApp } from '../../../../App';
import { useSuggestedAlbumByUserTopArtists } from '../../../../hooks/spotify/query/useSuggestedAlbumByUserTopArtists';
import type { Props } from '../Present/PresentSuggestPlayList';
import { withSuggestAlbumByUserTopArtists } from '../SuggestAlbumByUserTopArtists';

jest.mock(
  '../../../../hooks/spotify/query/useSuggestedPlayListByUserTopArtist',
);

const SuggestPlayListByTopArtist = withSuggestAlbumByUserTopArtists(
  ({ onClickSuggestion, suggestions, title }: Props) => {
    return (
      <div>
        <h1>{title}</h1>
        {suggestions?.map(suggestion => {
          return (
            <button
              key={suggestion.id}
              onClick={() => onClickSuggestion(suggestion)}
            >
              Dummy
            </button>
          );
        })}
      </div>
    );
  },
);
describe('Test SuggestPlayListByTopArtist component', () => {
  it('have title', () => {
    (useSuggestedAlbumByUserTopArtists as any).mockReturnValue({
      data: {
        artist: { name: 'artist' },
        playlists: [
          {
            id: 'example-playlist',
          },
        ],
      },
    });
    render(
      <TestApp>
        <SuggestPlayListByTopArtist />
      </TestApp>,
    );
    expect(screen.getByText('artist')).toBeVisible();
  });

  it('Click suggestion should jump to /playlist/:id', () => {
    (useSuggestedAlbumByUserTopArtists as any).mockReturnValue({
      data: {
        artist: { name: 'artist' },
        playlists: [
          {
            id: 'example-playlist',
          },
        ],
      },
    });
    const history = createMemoryHistory();
    render(
      <TestApp RouterProps={{ history }}>
        <SuggestPlayListByTopArtist />
      </TestApp>,
    );
    expect(screen.getByRole('button')).toBeVisible();
    event.click(screen.getByRole('button'));
    expect(history.entries[1].pathname).toEqual('/playlist/example-playlist');
  });
});
