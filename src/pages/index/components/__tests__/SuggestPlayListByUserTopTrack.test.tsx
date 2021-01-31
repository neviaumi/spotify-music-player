import { render, screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import { TestApp } from '../../../../App';
import { useSuggestedPlayListByUserTopTrack } from '../../../../hooks/spotify/query/useSuggestedPlayListByUserTopTrack';
import type { Props } from '../Present/PresentSuggestPlayList';
import { withSuggestPlayListByUserTopTrack } from '../SuggestPlayListByUserTopTrack';

jest.mock('../../../../hooks/spotify/query/useSuggestedPlayListByUserTopTrack');

const SuggestPlayListByTopTrack = withSuggestPlayListByUserTopTrack(
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

describe('Test SuggestPlayListByTopTrack component', () => {
  it('have title', () => {
    (useSuggestedPlayListByUserTopTrack as any).mockReturnValue({
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
        <SuggestPlayListByTopTrack />
      </TestApp>,
    );
    expect(screen.getByText('More like track')).toBeVisible();
  });

  it('Click suggestion should jump to /playlist/:id', () => {
    (useSuggestedPlayListByUserTopTrack as any).mockReturnValue({
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
        <SuggestPlayListByTopTrack />
      </TestApp>,
    );
    expect(screen.getByRole('button')).toBeVisible();
    event.click(screen.getByRole('button'));
    expect(history.entries[1].pathname).toEqual('/playlist/example-playlist');
  });
});