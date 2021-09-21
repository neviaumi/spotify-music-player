import { render, screen } from '@testing-library/react';
import events from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import { createPollyContext } from '../../../../testHelper/polly/createPollyContext';
import { describe, expect, it, jest } from '../../../../testHelper/test-runner';
import { TestApp } from '../../../App';
import { PresentUserPlaylist, Props, withUserPlayList } from '../UserPlayList';

describe('Test withUserPlayList HOC', () => {
  const Playlist = withUserPlayList(({ playlists, onClickPlayList }: Props) => {
    return (
      <div>
        {playlists?.map(playlist => (
          <button key={playlist.id} onClick={() => onClickPlayList(playlist)}>
            {playlist.name}
          </button>
        ))}
      </div>
    );
  });
  const _context = createPollyContext(import.meta.url);
  it('Should render without error', async () => {
    const history = createMemoryHistory();
    render(
      <TestApp RouterProps={{ history }}>
        <Playlist />
      </TestApp>,
    );

    await expect(screen.findAllByRole('button')).resolves.toBeDefined();
    events.click(screen.getAllByRole('button')[0]);
    expect(
      history.entries[1].pathname,
      'should redirected after click',
    ).toMatch(/\/playlist/);
  });
});

describe('Test PresentUserPlaylist components', () => {
  it('Should render title to heading', () => {
    render(
      <TestApp>
        <PresentUserPlaylist onClickPlayList={jest.fn()} playlists={[]} />
      </TestApp>,
    );
    expect(screen.getByRole('heading')).toHaveTextContent('PLAYLISTS');
  });
  it('Should render playlist as link', () => {
    render(
      <TestApp>
        <PresentUserPlaylist
          onClickPlayList={jest.fn()}
          playlists={
            [
              { id: '1', name: 'test playlist 1' },
              { id: '2', name: 'test playlist 2' },
              { id: '3', name: 'test playlist 3' },
            ] as any
          }
        />
      </TestApp>,
    );
    expect(
      screen.getAllByRole('link'),
      'should render playlist to link',
    ).toHaveLength(3);
  });

  it('click playlist should trigger callback', () => {
    const clickCallback = jest.fn();
    render(
      <TestApp>
        <PresentUserPlaylist
          onClickPlayList={clickCallback}
          playlists={
            [
              { id: '1', name: 'test playlist 1' },
              { id: '2', name: 'test playlist 2' },
              { id: '3', name: 'test playlist 3' },
            ] as any
          }
        />
      </TestApp>,
    );
    events.click(
      screen.getByRole('link', {
        name: 'test playlist 1',
      }),
    );
    expect(clickCallback).toHaveBeenCalledWith({
      id: '1',
      name: 'test playlist 1',
    });
  });
});
