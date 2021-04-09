import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RepeatMode } from '../../../../../../contexts/SpotifyWebPlayback/states/RepeatMode';
import { AppThemeProvider } from '../../../../../../contexts/Theme';
import { ControlButtons, Props } from '../';

function createMockProps(props: Partial<Props> = {}): Props {
  return {
    disallows: {
      pausing: true,
      peeking_next: true,
      peeking_prev: true,
      resuming: true,
      seeking: true,
      skipping_next: true,
      skipping_prev: true,
    },
    isActive: false,
    isLoading: false,
    isPaused: true,
    onClickChangeRepeatMode: jest.fn(),
    onClickNextTrack: jest.fn(),
    onClickPreviousTrack: jest.fn(),
    onClickTogglePlay: jest.fn(),
    onClickToggleShuffleMode: jest.fn(),
    repeatMode: RepeatMode.Off,
    shuffleMode: false,
    ...props,
  };
}

describe('Test ControlButtons', () => {
  it('render with isLoading', () => {
    render(
      <AppThemeProvider>
        <ControlButtons
          {...createMockProps({
            isLoading: true,
          })}
        />
      </AppThemeProvider>,
    );
    expect(
      screen.getByRole('button', { name: 'Enable shuffle mode' }),
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Previous track' }),
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Continue playback' }),
    ).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next track' })).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Enable repeat' }),
    ).toBeDisabled();
  });

  it('render with all button and state off', () => {
    render(
      <AppThemeProvider>
        <ControlButtons {...createMockProps()} />
      </AppThemeProvider>,
    );
    expect(
      screen.getByRole('button', { name: 'Enable shuffle mode' }),
    ).toBeVisible();
    expect(
      screen.getByRole('button', { name: 'Previous track' }),
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Continue playback' }),
    ).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next track' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Enable repeat' })).toBeVisible();
  });

  it('render with all button and state on', () => {
    render(
      <AppThemeProvider>
        <ControlButtons
          {...createMockProps({
            disallows: undefined,
            isActive: true,
            isPaused: false,
            repeatMode: RepeatMode.Context,
            shuffleMode: true,
          })}
        />
      </AppThemeProvider>,
    );
    expect(
      screen.getByRole('button', { name: 'Disable shuffle mode' }),
    ).toBeVisible();
    expect(
      screen.getByRole('button', { name: 'Previous track' }),
    ).toBeEnabled();
    expect(
      screen.getByRole('button', { name: 'Pause playback' }),
    ).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Next track' })).toBeEnabled();
    expect(
      screen.getByRole('button', { name: 'Enable repeat one' }),
    ).toBeVisible();
  });

  it.each`
    shuffleMode | buttonTitle
    ${true}     | ${'Disable shuffle mode'}
    ${false}    | ${'Enable shuffle mode'}
  `('render shuffleMode is $shuffleMode', ({ shuffleMode, buttonTitle }) => {
    const props = createMockProps({
      isActive: true,
      shuffleMode: shuffleMode,
    });
    render(
      <AppThemeProvider>
        <ControlButtons {...props} />
      </AppThemeProvider>,
    );
    expect(screen.getByRole('button', { name: buttonTitle })).toBeVisible();
    userEvent.click(screen.getByRole('button', { name: buttonTitle }));
    expect(props.onClickToggleShuffleMode).toHaveBeenCalled();
  });

  it.each`
    skippingPrev
    ${true}
    ${false}
  `('render skipping_prev is $skippingPrev', ({ skippingPrev }) => {
    const props = createMockProps({
      disallows: {
        skipping_prev: skippingPrev,
      } as any,
      isActive: true,
    });
    render(
      <AppThemeProvider>
        <ControlButtons {...props} />
      </AppThemeProvider>,
    );
    expect(
      screen.getByRole('button', { name: 'Previous track' }),
    ).toBeVisible();
    userEvent.click(screen.getByRole('button', { name: 'Previous track' }));
    expect(props.onClickPreviousTrack).toHaveBeenCalledTimes(
      skippingPrev ? 0 : 1,
    );
  });

  it.each`
    isPaused | disallows | allowClick
    ${true} | ${{
  pausing: false,
  resuming: false,
}} | ${true}
    ${false} | ${{
  pausing: false,
  resuming: false,
}} | ${true}
    ${true} | ${{
  pausing: false,
  resuming: true,
}} | ${false}
    ${false} | ${{
  pausing: true,
  resuming: false,
}} | ${false}
  `(
    'render isPaused is $isPaused and disallows $disallows',
    ({ isPaused, disallows, allowClick }) => {
      const props = createMockProps({
        disallows: disallows as any,
        isActive: true,
        isPaused,
      });
      render(
        <AppThemeProvider>
          <ControlButtons {...props} />
        </AppThemeProvider>,
      );
      const button = screen.getByRole('button', {
        name: isPaused ? 'Continue playback' : 'Pause playback',
      });
      expect(button).toBeVisible();
      userEvent.click(button);
      expect(props.onClickTogglePlay).toHaveBeenCalledTimes(allowClick ? 1 : 0);
    },
  );

  it.each`
    skippingNext
    ${true}
    ${false}
  `('render skipping_next is $skippingNext', ({ skippingNext }) => {
    const props = createMockProps({
      disallows: {
        skipping_next: skippingNext,
      } as any,
      isActive: true,
    });
    render(
      <AppThemeProvider>
        <ControlButtons {...props} />
      </AppThemeProvider>,
    );
    expect(screen.getByRole('button', { name: 'Next track' })).toBeVisible();
    userEvent.click(screen.getByRole('button', { name: 'Next track' }));
    expect(props.onClickNextTrack).toHaveBeenCalledTimes(skippingNext ? 0 : 1);
  });

  it.each`
    repeatMode            | nextRepeatMode        | buttonName
    ${RepeatMode.Off}     | ${RepeatMode.Context} | ${'Enable repeat'}
    ${RepeatMode.Context} | ${RepeatMode.Track}   | ${'Enable repeat one'}
    ${RepeatMode.Track}   | ${RepeatMode.Off}     | ${'Disable repeat'}
  `(
    'render repeatMode is $repeatMode',
    ({ repeatMode, nextRepeatMode, buttonName }) => {
      const props = createMockProps({
        isActive: true,
        repeatMode,
      });
      render(
        <AppThemeProvider>
          <ControlButtons {...props} />
        </AppThemeProvider>,
      );
      const button = screen.getByRole('button', { name: buttonName });
      expect(button).toBeVisible();
      userEvent.click(button);
      expect(props.onClickChangeRepeatMode).toHaveBeenCalledWith(
        nextRepeatMode,
      );
    },
  );
});
