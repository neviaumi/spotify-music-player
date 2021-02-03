import { render, screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { TestApp } from 'src/App';
import { useSuggestedAlbumByUserTopArtists } from 'src/hooks/spotify/query/useSuggestedAlbumByUserTopArtists';

import type { Props } from '../Present/PresentSuggestAlbum';
import { withSuggestAlbumByUserTopArtists } from '../SuggestAlbumByUserTopArtists';

jest.mock('../../../../hooks/spotify/query/useSuggestedAlbumByUserTopArtists');

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
describe('Test SuggestAlbumByUserTopArtists component', () => {
  it('have title', () => {
    (useSuggestedAlbumByUserTopArtists as any).mockReturnValue({
      data: {
        albums: [
          {
            id: 'example-album',
          },
        ],
        artists: [{ name: 'artist 1' }, { name: 'artist 2' }],
      },
    });
    render(
      <TestApp>
        <SuggestPlayListByTopArtist />
      </TestApp>,
    );
    expect(screen.getByText('More like artist 1')).toBeVisible();
  });

  it('Click suggestion should jump to /album/:id', () => {
    (useSuggestedAlbumByUserTopArtists as any).mockReturnValue({
      data: {
        albums: [
          {
            id: 'example-album',
          },
        ],
        artists: [{ name: 'artist' }],
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
    expect(history.entries[1].pathname).toEqual('/album/example-album');
  });
});
