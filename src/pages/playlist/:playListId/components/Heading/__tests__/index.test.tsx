import { render, screen } from '@testing-library/react';

import React from 'react';

import { TestApp } from '../../../../../../App';
import { Heading } from '../index';

it('render without error', () => {
  const playlist = {
    name: 'Cat music',
    images: [
      {
        url: 'https://http.cat/404.jpg',
      },
    ],
    owner: {
      display_name: 'David Ng',
    },
    followers: {
      total: 128,
    },
    tracks: {
      items: [
        {
          track: {
            duration_ms: 1000,
          },
        },
        {
          track: {
            duration_ms: 1000,
          },
        },
      ],
    },
  } as any;

  render(
    <TestApp>
      <Heading playList={playlist} />
    </TestApp>,
  );
  expect(
    screen.getByRole('img', {
      name: 'cover-image',
    }),
  ).toBeVisible();
  expect(
    screen.getByRole('heading', {
      name: playlist.name,
    }),
  ).toBeVisible();

  expect(screen.getByText(playlist.owner.display_name)).toBeVisible();
  expect(screen.getByText(`${playlist.followers.total} likes`)).toBeVisible();
});
