import { render, screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { TestApp } from 'src/App';
import { useSuggestedAlbumByUserLastPlayedTracks } from 'src/hooks/spotify/query/useSuggestedAlbumByUserLastPlayedTracks';

import type { Props } from '../Present/PresentSuggestAlbum';
import { withSuggestAlbumByUserLastPlayedTracks } from '../SuggestAlbumByUserLastPlayedTracks';

jest.mock(
  '../../../../hooks/spotify/query/useSuggestedAlbumByUserLastPlayedTracks',
);

const SuggestAlbumByUserLastPlayedTracks = withSuggestAlbumByUserLastPlayedTracks(
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

describe('Test SuggestAlbumByUserLastPlayedTracks component', () => {
  it('have title', () => {
    (useSuggestedAlbumByUserLastPlayedTracks as any).mockReturnValue({
      data: {
        albums: [
          {
            id: 'example-album',
          },
        ],
        tracks: [{ name: 'track1' }, { name: 'track2' }],
      },
    });
    render(
      <TestApp>
        <SuggestAlbumByUserLastPlayedTracks />
      </TestApp>,
    );
    expect(screen.getByText('Continue with track1')).toBeVisible();
  });

  it('Click suggestion should jump to /album/:id', () => {
    (useSuggestedAlbumByUserLastPlayedTracks as any).mockReturnValue({
      data: {
        albums: [
          {
            id: 'example-album',
          },
        ],
        tracks: [{ name: 'track1' }, { name: 'track2' }],
      },
    });
    const history = createMemoryHistory();
    render(
      <TestApp RouterProps={{ history }}>
        <SuggestAlbumByUserLastPlayedTracks />
      </TestApp>,
    );
    expect(screen.getByRole('button')).toBeVisible();
    event.click(screen.getByRole('button'));
    expect(history.entries[1].pathname).toEqual('/album/example-album');
  });
});
