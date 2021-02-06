import { render, screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import { TestApp } from '../../../../App';
import { useFeaturedPlaylists } from '../../../../hooks/spotify/query/useFeaturedPlaylists';
import { withFeaturedPlayListBySpotify } from '../FeaturedPlayListBySpotify';
import type { Props } from '../Present/PresentSuggestPlayList';

jest.mock('../../../../hooks/spotify/query/useFeaturedPlaylists');

const FeaturedPlayListBySpotify = withFeaturedPlayListBySpotify(function ({
  title,
  suggestions,
  onClickSuggestion,
}: Props) {
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
});

describe('Test FeaturedPlayListBySpotify', () => {
  it('have title', () => {
    (useFeaturedPlaylists as jest.Mock).mockReturnValue({
      data: {
        message: 'Testing title',
        playlists: {
          items: [
            {
              id: 'example-playlist',
            },
          ],
        },
      },
    });
    render(
      <TestApp>
        <FeaturedPlayListBySpotify />
      </TestApp>,
    );
    expect(screen.getByText('Testing title')).toBeVisible();
  });

  it('Click suggestion should jump to /playlist/:id', () => {
    (useFeaturedPlaylists as jest.Mock).mockReturnValue({
      data: {
        message: 'Testing title',
        playlists: {
          items: [
            {
              id: 'example-playlist',
            },
          ],
        },
      },
    });
    const history = createMemoryHistory();

    render(
      <TestApp RouterProps={{ history }}>
        <FeaturedPlayListBySpotify />
      </TestApp>,
    );
    expect(screen.getByRole('button')).toBeVisible();
    event.click(screen.getByRole('button'));
    expect(history.entries[1].pathname).toEqual('/playlist/example-playlist');
  });
});
