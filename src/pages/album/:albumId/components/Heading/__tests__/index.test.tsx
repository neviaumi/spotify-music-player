import { render, screen } from '@testing-library/react';
import { TestApp } from 'src/App';

import { Heading } from '../index';

it('render without error', () => {
  const album = {
    artists: [{ name: 'Eric clapton' }],
    followers: {
      total: 128,
    },
    images: [
      {
        url: 'https://http.cat/404.jpg',
      },
    ],
    name: 'Cat music',
    total_tracks: 10,
    tracks: {
      items: [
        {
          duration_ms: 1000,
        },
        {
          duration_ms: 1000,
        },
      ],
    },
  } as any;

  render(
    <TestApp>
      <Heading album={album} />
    </TestApp>,
  );
  expect(
    screen.getByRole('img', {
      name: 'cover-image',
    }),
  ).toBeVisible();
  expect(
    screen.getByRole('heading', {
      name: album.name,
    }),
  ).toBeVisible();

  expect(screen.getByText(album.artists[0].name)).toBeVisible();
  expect(screen.getByText(`${album.total_tracks} songs`)).toBeVisible();
});
