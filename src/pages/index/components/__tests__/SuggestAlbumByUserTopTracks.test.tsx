import { render, screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { TestApp } from 'src/App';
import { useSuggestedAlbumByUserTopTracks } from 'src/hooks/spotify/query/useSuggestedAlbumByUserTopTracks';

import type { Props } from '../Present/PresentSuggestAlbum';
import { withSuggestAlbumByUserTopTracks } from '../SuggestAlbumByUserTopTracks';

jest.mock('../../../../hooks/spotify/query/useSuggestedAlbumByUserTopTracks');

const SuggestPlayListByTopTrack = withSuggestAlbumByUserTopTracks(
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

describe('Test SuggestAlbumByUserTopTracks component', () => {
  it('have title', () => {
    (useSuggestedAlbumByUserTopTracks as any).mockReturnValue({
      data: {
        albums: [
          {
            id: 'example-album',
          },
        ],
        tracks: [{ name: 'track 1' }, { name: 'track 2' }],
      },
    });
    render(
      <TestApp>
        <SuggestPlayListByTopTrack />
      </TestApp>,
    );
    expect(screen.getByText('More like track 1')).toBeVisible();
  });

  it('Click suggestion should jump to /album/:id', () => {
    (useSuggestedAlbumByUserTopTracks as any).mockReturnValue({
      data: {
        albums: [
          {
            id: 'example-album',
          },
        ],
        tracks: [{ name: 'track 1' }, { name: 'track 2' }],
      },
    });
    const history = createMemoryHistory();
    render(
      <TestApp RouterProps={{ history }}>
        <SuggestPlayListByTopTrack />
      </TestApp>,
    );
    expect(screen.getByRole('button')).toBeVisible();
    event.click(screen.getByRole('button'));
    expect(history.entries[1].pathname).toEqual('/album/example-album');
  });
});
