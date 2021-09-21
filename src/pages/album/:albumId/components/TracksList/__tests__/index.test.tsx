import { render, screen } from '@testing-library/react';

import { createPollyContext } from '../../../../../../../testHelper/polly/createPollyContext';
import { setupMockServer } from '../../../../../../../testHelper/polly/setupMockServer';
import {
  describe,
  expect,
  it,
} from '../../../../../../../testHelper/test-runner';
import { TestApp } from '../../../../../../App';
import { AlbumTracksList } from '../index';

const context = createPollyContext();

describe('Test Album track list', () => {
  it('render TrackList with one Item', async () => {
    setupMockServer(context.polly, {});
    const props = {
      album: {
        tracks: {
          items: [
            {
              album: { name: 'Disraeli Gears' },
              artists: [{ name: 'Cream' }],
              duration_ms: 1000,
              name: 'Sunrise of love',
            },
          ],
        },
      } as any,
    };
    render(
      <TestApp>
        <AlbumTracksList {...props} />
      </TestApp>,
    );
    await expect(
      screen.findAllByRole('columnheader'),
      'have 3 column',
    ).resolves.toHaveLength(3);
    expect(
      screen.getAllByRole('listitem', {
        name: /^track-item/,
      }),
    ).toHaveLength(1);
    expect(screen.getByText('Sunrise of love')).toBeVisible();
    expect(screen.getByText('Cream')).toBeVisible();
  });
});
