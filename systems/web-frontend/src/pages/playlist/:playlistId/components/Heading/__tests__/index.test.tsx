import { render, screen } from '@testing-library/react';

import { expect, it } from '../../../../../../../testHelper/test-runner';
import { TestApp } from '../../../../../../App';
import { Heading } from '../index';

it('render without error', () => {
  const playlist = {
    followers: {
      total: 128,
    },
    images: [
      {
        url: 'https://http.cat/404.jpg',
      },
    ],
    name: 'Cat music',
    owner: {
      display_name: 'David Ng',
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
