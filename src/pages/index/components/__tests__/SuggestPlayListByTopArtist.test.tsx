import { render, screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import { TestApp } from '../../../../App';
import useSuggestedPlayListByUserTopArtist from '../../../../hooks/spotify/query/useSuggestedPlayListByUserTopArtist';
import type { Props } from '../Present/PresentSuggestionList';
import { withSuggestPlayListByTopArtist } from '../SuggestPlayListByTopArtist';

jest.mock(
  '../../../../hooks/spotify/query/useSuggestedPlayListByUserTopArtist',
);

const SuggestPlayListByTopArtist = withSuggestPlayListByTopArtist(
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
    (useSuggestedPlayListByUserTopArtist as any).mockReturnValue({
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
    (useSuggestedPlayListByUserTopArtist as any).mockReturnValue({
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
