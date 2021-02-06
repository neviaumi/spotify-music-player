import { render, screen } from '@testing-library/react';
import { TestApp } from 'src/App';

import { TracksList } from '../index';

describe('Test Album track list', () => {
  it('render TrackList with one Item', () => {
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
        <TracksList {...props} />
      </TestApp>,
    );
    expect(
      screen.getByRole('listitem', {
        name: 'album-track-header',
      }),
    ).toBeVisible();
    expect(screen.getAllByRole('columnheader'), 'have 3 column').toHaveLength(
      3,
    );
    expect(
      screen.getAllByRole('listitem', {
        name: 'album-track',
      }),
    ).toHaveLength(1);
    expect(screen.getByText('Sunrise of love')).toBeVisible();
    expect(screen.getByText('Cream')).toBeVisible();
  });
});
