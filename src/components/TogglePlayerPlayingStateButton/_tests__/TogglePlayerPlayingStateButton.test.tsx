import { render, screen, waitFor } from '@testing-library/react';
import events from '@testing-library/user-event';
import casual from 'casual';

import { TogglePlayerPlayingStateButton } from '../';

describe('Test TogglePlayerPlayingState', () => {
  it('default show the play icon', () => {
    render(
      <TogglePlayerPlayingStateButton
        isBelongCurrentTrack={false}
        item={casual.AlbumObject()}
        onClickToggleButton={jest.fn()}
      />,
    );
    expect(
      screen.getByRole('button', {
        name: 'play-button',
      }),
    ).toBeVisible();
  });

  it('show pause icon when current item belong to current track', () => {
    render(
      <TogglePlayerPlayingStateButton
        isBelongCurrentTrack={true}
        item={casual.PlaylistObject()}
        onClickToggleButton={jest.fn()}
      />,
    );
    expect(
      screen.getByRole('button', {
        name: 'pause-button',
      }),
    ).toBeVisible();
  });

  it('onClick button will call .onClickToggleButton', async () => {
    const item = casual.AlbumObject();
    const onClickToggleButton = jest.fn();
    render(
      <TogglePlayerPlayingStateButton
        isBelongCurrentTrack={false}
        item={item}
        onClickToggleButton={onClickToggleButton}
      />,
    );
    expect(
      screen.getByRole('button', {
        name: 'play-button',
      }),
    ).toBeVisible();
    events.click(
      screen.getByRole('button', {
        name: 'play-button',
      }),
    );
    await waitFor(() => expect(onClickToggleButton).toHaveBeenCalledWith(item));
  });
});
