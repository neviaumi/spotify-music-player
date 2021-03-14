import { render, screen, waitFor } from '@testing-library/react';
import casual from 'casual';
import { createMemoryHistory } from 'history';
import { Route } from 'react-router-dom';

import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import { TestApp } from '../../../../App';
import { PresentPlayList, withPlayList } from '../';

describe('render PresentPlayList', () => {
  const playlist = casual.PlaylistObject();
  it('should render heading', () => {
    render(
      <TestApp>
        <PresentPlayList playList={playlist as any} />
      </TestApp>,
    );
    expect(screen.getByTestId('heading')).toBeVisible();
    expect(screen.getByTestId('track-listing')).toBeVisible();
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
