import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  describe,
  each,
  expect,
  it,
  jest,
} from '../../../../../../../testHelper/test-runner';
import { RepeatMode } from '../../../../../../contexts/SpotifyWebPlayback/typings/RepeatMode';
import { AppThemeProvider } from '../../../../../../contexts/Theme';
import { ControlButtons, Props } from '../index';

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

  each.objects<{
    buttonTitle: string;
    shuffleMode: boolean;
  }>([
    ['buttonTitle', 'shuffleMode'],
    ['Disable shuffle mode', true],
    ['Enable shuffle mode', false],
  ])(({ buttonTitle, shuffleMode }) => {
    it(`render shuffleMode is ${shuffleMode}`, () => {
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
  });

  each.objects<{ skippingPrev: boolean }>([['skippingPrev'], [true], [false]])(
    ({ skippingPrev }) => {
      it(`render skipping_prev is ${skippingPrev}`, () => {
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
    },
  );

  each.objects<{
    allowClick: boolean;
    disallows: {
      pausing: boolean;
      resuming: boolean;
    };
    isPaused: boolean;
  }>([
    ['allowClick', 'disallows', 'isPaused'],
    [true, { pausing: false, resuming: false }, true],
    [true, { pausing: false, resuming: false }, false],
    [false, { pausing: false, resuming: true }, true],
    [false, { pausing: true, resuming: false }, false],
  ])(({ isPaused, disallows, allowClick }) => {
    it(`render isPaused is ${isPaused} and disallows ${disallows}`, () => {
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
    });
  });

  each.objects<{
    skippingNext: boolean;
  }>([['skippingNext'], [true], [false]])(({ skippingNext }) => {
    it(`render skipping_next is ${skippingNext}`, () => {
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
      expect(props.onClickNextTrack).toHaveBeenCalledTimes(
        skippingNext ? 0 : 1,
      );
    });
  });

  each.objects<{
    buttonName: string;
    nextRepeatMode: RepeatMode;
    repeatMode: RepeatMode;
  }>([
    ['buttonName', 'nextRepeatMode', 'repeatMode'],
    ['Enable repeat', RepeatMode.Context, RepeatMode.Off],
    ['Enable repeat one', RepeatMode.Track, RepeatMode.Context],
    ['Disable repeat', RepeatMode.Off, RepeatMode.Track],
  ])(({ repeatMode, nextRepeatMode, buttonName }) => {
    it(`render repeatMode is ${repeatMode}`, () => {
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
    });
  });
});
