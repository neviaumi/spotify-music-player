import { render, screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import casual from 'casual';
import { createMemoryHistory } from 'history';

import { interceptNetlifyFunctions } from '../../../../../functions/testHelper/polly/interceptNetlifyFunctions';
import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import { TestApp } from '../../../../App';
import { withAlbumByTopStreamTracks } from '../AlbumByTopStreamTracks';
import type { Props } from '../Present/PresentSuggestAlbum';

const mockTrack = casual.TrackObject({});
const context = createPollyContext({
  appConfig: {
    enableMockServer: true,
    mockRouteHandlers: {
      '/tracks': (_, res) => {
        res.status(200).json(casual.RecommendationsObject([mockTrack]));
      },
    },
  },
});

const AlbumByTopStreamTracks = withAlbumByTopStreamTracks(
  ({ title, suggestions, onClickSuggestion }: Props) => {
    return (
      <div>
        <h1>{title}</h1>
        <li>
          {suggestions?.map(suggestion => (
            <button
              key={suggestion.id}
              onClick={() => onClickSuggestion(suggestion)}
            >
              {suggestion.name}
            </button>
          ))}
        </li>
      </div>
    );
  },
);

describe('Test AlbumByTopStreamTracks', () => {
  it('Click suggestion should jump to /album/:id', async () => {
    interceptNetlifyFunctions(context.polly);
    const history = createMemoryHistory();

    render(
      <TestApp RouterProps={{ history }}>
        <AlbumByTopStreamTracks />
      </TestApp>,
    );
    await expect(
      screen.findByRole('heading', { name: 'Top streaming album in HK' }),
    ).resolves.toBeVisible();

    event.click(
      screen.getByRole('button', {
        name: mockTrack.album.name,
      }),
    );
    expect(history.entries[1].pathname).toEqual(`/album/${mockTrack.album.id}`);
  });
});
