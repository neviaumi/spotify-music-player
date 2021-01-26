import { render, screen } from '@testing-library/react';

import { TestApp } from '../../App';
import { createPollyContext } from '../../utils/tests/createPollyContext';
import { Suggestion } from '../index';

describe('Test render PlayListSuggestion', () => {
  const _context = createPollyContext();
  it('Should render PlayListSuggestion', async () => {
    render(
      <TestApp>
        <Suggestion />
      </TestApp>,
    );
    expect(
      screen.getByTestId('suggested-playlist-by-last-played-artist'),
      'Should contain suggested playlist by last played artist',
    ).toBeVisible();
    expect(
      screen.getByTestId('suggested-playlist-by-last-played-track'),
      'Should contain suggested playlist by last played track',
    ).toBeVisible();
    expect(
      screen.getByTestId('suggested-playlist-by-user-top-artist'),
      'Should contain suggested playlist by user top artist',
    ).toBeVisible();
    expect(
      screen.getByTestId('suggested-playlist-by-user-top-track'),
      'Should contain suggested playlist by user top track',
    ).toBeVisible();
  });
});
