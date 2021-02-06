import { render, screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { TestApp } from 'src/App';
import { useSuggestedAlbumByUserLastPlayedArtists } from 'src/hooks/spotify/query/useSuggestedAlbumByUserLastPlayedArtists';

import type { Props } from '../Present/PresentSuggestAlbum';
import { withSuggestAlbumByUserLastPlayedArtists } from '../SuggestAlbumByUserLastPlayedArtists';

jest.mock(
  '../../../../hooks/spotify/query/useSuggestedAlbumByUserLastPlayedArtists',
);

const SuggestAlbumByUserLastPlayedArtists = withSuggestAlbumByUserLastPlayedArtists(
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

describe('Test SuggestAlbumByUserLastPlayedArtists component', () => {
  it('have title', () => {
    (useSuggestedAlbumByUserLastPlayedArtists as any).mockReturnValue({
      data: {
        albums: [
          {
            id: 'example-album',
          },
        ],
        artists: [{ name: 'artist1' }, { name: 'artist2' }],
      },
    });
    render(
      <TestApp>
        <SuggestAlbumByUserLastPlayedArtists />
      </TestApp>,
    );
    expect(screen.getByText('Continue with artist1')).toBeVisible();
  });

  it('Click suggestion should jump to /album/:id', () => {
    (useSuggestedAlbumByUserLastPlayedArtists as any).mockReturnValue({
      data: {
        albums: [
          {
            id: 'example-album',
          },
        ],
        artists: [{ name: 'artist1' }, { name: 'artist2' }],
      },
    });
    const history = createMemoryHistory();
    render(
      <TestApp RouterProps={{ history }}>
        <SuggestAlbumByUserLastPlayedArtists />
      </TestApp>,
    );
    expect(screen.getByRole('button')).toBeVisible();
    event.click(screen.getByRole('button'));
    expect(history.entries[1].pathname).toEqual('/album/example-album');
  });
});
