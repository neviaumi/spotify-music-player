import { render, screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import casual from 'casual';
import { createMemoryHistory } from 'history';
import { TestApp } from 'src/App';

import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import type { Props } from '../Present/PresentSuggestAlbum';
import { withSuggestAlbumByUserLastPlayedTracks } from '../SuggestAlbumByUserLastPlayedTracks';

const mockPlayHistory = casual.PlayHistoryObject({});
const mockTrack = casual.SimplifiedTrackObject({});
createPollyContext({
  appConfig: {
    enableMockServer: true,
    mockRouteHandlers: {
      '/me/player/recently-played': (_, res) => {
        res.status(200).json(casual.CursorPagingObject([mockPlayHistory]));
      },
      '/recommendations': (_, res) => {
        res.status(200).json(casual.RecommendationsObject([mockTrack]));
      },
    },
  },
});

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
              {suggestion.name}
            </button>
          );
        })}
      </div>
    );
  },
);

describe('Test SuggestAlbumByUserLastPlayedTracks component', () => {
  it('Click suggestion should jump to /album/:id', async () => {
    const history = createMemoryHistory();
    render(
      <TestApp RouterProps={{ history }}>
        <SuggestAlbumByUserLastPlayedTracks />
      </TestApp>,
    );
    await expect(
      screen.findByRole('heading', {
        name: `Continue with ${mockPlayHistory.track.name}`,
      }),
    ).resolves.toBeVisible();

    event.click(
      screen.getByRole('button', {
        name: mockTrack.album.name,
      }),
    );
    expect(history.entries[1].pathname).toEqual(`/album/${mockTrack.album.id}`);
  });
});
