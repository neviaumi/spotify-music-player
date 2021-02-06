import { render, screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { TestApp } from 'src/App';
import { useSuggestedAlbumByUserTopArtistGenres } from 'src/hooks/spotify/query/useSuggestedAlbumByUserTopArtistGenres';

import type { Props } from '../Present/PresentSuggestAlbum';
import { withSuggestAlbumByUserTopArtistGenres } from '../SuggestAlbumByUserTopArtistGenres';

jest.mock(
  '../../../../hooks/spotify/query/useSuggestedAlbumByUserTopArtistGenres',
);

const SuggestAlbumByUserTopArtistGenres = withSuggestAlbumByUserTopArtistGenres(
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

describe('Test SuggestAlbumByUserTopArtistGenres component', () => {
  it('have title', () => {
    (useSuggestedAlbumByUserTopArtistGenres as any).mockReturnValue({
      data: {
        albums: [
          {
            id: 'example-album',
          },
        ],
        genres: ['Rock', 'Roll'],
      },
    });
    render(
      <TestApp>
        <SuggestAlbumByUserTopArtistGenres />
      </TestApp>,
    );
    expect(screen.getByText('Rock')).toBeVisible();
  });

  it('Click suggestion should jump to /album/:id', () => {
    (useSuggestedAlbumByUserTopArtistGenres as any).mockReturnValue({
      data: {
        albums: [
          {
            id: 'example-album',
          },
        ],
        genres: ['Rock', 'Roll'],
      },
    });
    const history = createMemoryHistory();
    render(
      <TestApp RouterProps={{ history }}>
        <SuggestAlbumByUserTopArtistGenres />
      </TestApp>,
    );
    expect(screen.getByRole('button')).toBeVisible();
    event.click(screen.getByRole('button'));
    expect(history.entries[1].pathname).toEqual('/album/example-album');
  });
});
