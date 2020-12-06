import { render, screen } from '@testing-library/react';
import React from 'react';

import { TestApp } from '../../../../../../App';
import TrackingList from '../index';

it('render TrackList with one Item', () => {
  const props = {
    playList: {
      tracks: {
        items: [
          {
            track: {
              album: { name: 'Disraeli Gears' },
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
      <TrackingList {...props} />
    </TestApp>,
  );
  expect(screen.getAllByRole('listitem')).toHaveLength(1);
  expect(screen.getByText('Sunrise of love')).toBeVisible();
  expect(screen.getByText('Disraeli Gears')).toBeVisible();
  expect(screen.getByText('Cream')).toBeVisible();
});
