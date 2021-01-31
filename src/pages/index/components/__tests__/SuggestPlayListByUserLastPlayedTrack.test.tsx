import { render, screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import { TestApp } from '../../../../App';
import { useSuggestedPlayListByUserLastPlayedTrack } from '../../../../hooks/spotify/query/useSuggestedPlayListByUserLastPlayedTrack';
import type { Props } from '../Present/PresentSuggestionList';
import { withSuggestPlayListByUserLastPlayedTrack } from '../SuggestPlayListByUserLastPlayedTrack';

jest.mock(
  '../../../../hooks/spotify/query/useSuggestedPlayListByUserLastPlayedTrack',
);

const SuggestPlayListByLastPlayedTrack = withSuggestPlayListByUserLastPlayedTrack(
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

describe('Test SuggestPlayListByLastPlayedTrack component', () => {
  it('have title', () => {
    (useSuggestedPlayListByUserLastPlayedTrack as any).mockReturnValue({
      data: {
        playlists: [
          {
            id: 'example-playlist',
          },
        ],
        track: { name: 'track' },
      },
    });
    render(
      <TestApp>
        <SuggestPlayListByLastPlayedTrack />
      </TestApp>,
    );
    expect(screen.getByText('More like track')).toBeVisible();
  });

  it('Click suggestion should jump to /playlist/:id', () => {
    (useSuggestedPlayListByUserLastPlayedTrack as any).mockReturnValue({
      data: {
        playlists: [
          {
            id: 'example-playlist',
          },
        ],
        track: { name: 'track' },
      },
    });
    const history = createMemoryHistory();
    render(
      <TestApp RouterProps={{ history }}>
        <SuggestPlayListByLastPlayedTrack />
      </TestApp>,
    );
    expect(screen.getByRole('button')).toBeVisible();
    event.click(screen.getByRole('button'));
    expect(history.entries[1].pathname).toEqual('/playlist/example-playlist');
  });
});
