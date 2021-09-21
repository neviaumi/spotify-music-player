import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route } from 'react-router-dom';

import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import { setupMockServer } from '../../../../../testHelper/polly/setupMockServer';
import { PlaylistObject } from '../../../../../testHelper/seeders/PlaylistObject';
import { describe, expect, it } from '../../../../../testHelper/test-runner';
import { TestApp } from '../../../../App';
import { PresentPlayList, withPlayList } from '../';

describe('render PresentPlayList', () => {
  const context = createPollyContext();
  const playlist = PlaylistObject();
  it('should render heading', async () => {
    setupMockServer(context.polly, {});
    render(
      <TestApp>
        <PresentPlayList playList={playlist as any} />
      </TestApp>,
    );
    expect(screen.getByTestId('heading')).toBeVisible();
    await expect(screen.findByTestId('track-listing')).resolves.toBeVisible();
  });
});

describe('render withPlayList HOC', () => {
  const PlayList = withPlayList(({ playList }) => {
    return (
      <div>
        {playList?.tracks.items.map(item => (
          <button key={item.track.id}>${item.track.name}</button>
        ))}
      </div>
    );
  });
  createPollyContext();
  it('pass response to wrapper', async () => {
    const history = createMemoryHistory({
      initialEntries: ['/playlist/37i9dQZF1DXdLtD0qszB1w'],
    });
    render(
      <TestApp RouterProps={{ history }}>
        <Route component={PlayList} path="/playlist/:playlistId" />
      </TestApp>,
    );
    await waitFor(() =>
      expect(screen.getAllByRole('button').length).toBeGreaterThan(0),
    );
  });
});
