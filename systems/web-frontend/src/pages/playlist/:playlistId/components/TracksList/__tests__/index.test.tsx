import { render, screen } from '@testing-library/react';

import { createPollyContext } from '../../../../../../../testHelper/polly/createPollyContext';
import { setupMockServer } from '../../../../../../../testHelper/polly/setupMockServer';
import {
  describe,
  expect,
  it,
} from '../../../../../../../testHelper/test-runner';
import { TestApp } from '../../../../../../App';
import { PlayListTracksList } from '../index';

const context = createPollyContext(import.meta.url);

describe('Test PlayList tracks list', () => {
  it('render TrackList with one Item', async () => {
    setupMockServer(context.polly, {});
    const props = {
      playList: {
        tracks: {
          items: [
            {
              track: {
                album: {
                  images: [{ url: 'https://www.google.com' }],
                  name: 'Disraeli Gears',
                },
                artists: [{ name: 'Cream' }],
                duration_ms: 1000,
                name: 'Sunrise of love',
              },
            },
          ],
        },
      } as any,
    };
    render(
      <TestApp>
        <PlayListTracksList {...props} />
      </TestApp>,
    );
    await expect(
      screen.findAllByRole('columnheader'),
      'Have 5 column',
    ).resolves.toHaveLength(5);
    expect(
      screen.getAllByRole('listitem', {
        name: /^track-item/,
      }),
      'only one record',
    ).toHaveLength(1);
    expect(
      screen.getByRole('img', { name: 'Disraeli Gears cover' }),
      'album cover',
    ).toBeVisible();
    expect(screen.getByText('Sunrise of love'), 'Track name').toBeVisible();
    expect(screen.getByText('Disraeli Gears'), 'album name').toBeVisible();
    expect(screen.getByText('Cream'), 'artist name').toBeVisible();
  });
});
