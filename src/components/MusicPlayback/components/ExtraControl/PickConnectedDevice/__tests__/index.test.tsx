import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { createPollyContext } from '../../../../../../../testHelper/polly/createPollyContext';
import { setupMockServer } from '../../../../../../../testHelper/polly/setupMockServer';
import { CurrentlyPlayingContextObject } from '../../../../../../../testHelper/seeders/CurrentlyPlayingContextObject';
import { DeviceObject } from '../../../../../../../testHelper/seeders/DeviceObject';
import {
  describe,
  expect,
  it,
  jest,
} from '../../../../../../../testHelper/test-runner';
import { TestApp } from '../../../../../../App';
import { PickConnectedDevice } from '../index';

const context = createPollyContext();
describe('ConnectedDeviceList', () => {
  it('Click item in list will transfer playback', async () => {
    const device = DeviceObject();
    const transferPlaybackMock = jest
      .fn()
      .mockImplementation((_, res) => res.status(204));
    setupMockServer(context.polly, {
      handlers: {
        spotifyAPI: {
          get: {
            '/v1/me/player/devices': jest.fn().mockImplementation((_, res) => {
              res.status(200).json({
                devices: [device],
              });
            }),
          },
          put: {
            '/v1/me/player': transferPlaybackMock,
          },
        },
      },
    });
    render(
      <TestApp>
        <PickConnectedDevice />
      </TestApp>,
    );
    await waitFor(() => {
      expect(
        screen.getByRole('button', {
          name: 'pick-connected-device-button',
        }),
      ).toBeEnabled();
    });
    userEvent.click(
      screen.getByRole('button', {
        name: 'pick-connected-device-button',
      }),
    );
    userEvent.click(await screen.findByRole('button', { name: device.name }));
    await waitFor(() => expect(transferPlaybackMock).toHaveBeenCalled());
  });

  it('Click current device in list will not transfer playback', async () => {
    const device = DeviceObject();
    const transferPlaybackMock = jest
      .fn()
      .mockImplementation((_, res) => res.status(204));
    setupMockServer(context.polly, {
      handlers: {
        spotifyAPI: {
          get: {
            '/v1/me/player': jest.fn().mockImplementation((_, res) => {
              res.status(200).json(
                CurrentlyPlayingContextObject({
                  device,
                }),
              );
            }),
            '/v1/me/player/devices': jest.fn().mockImplementation((_, res) => {
              res.status(200).json({
                devices: [device],
              });
            }),
          },
          put: {
            '/v1/me/player': transferPlaybackMock,
          },
        },
      },
    });
    render(
      <TestApp>
        <PickConnectedDevice />
      </TestApp>,
    );
    await waitFor(() => {
      expect(
        screen.getByRole('button', {
          name: 'pick-connected-device-button',
        }),
      ).toBeEnabled();
    });
    userEvent.click(
      screen.getByRole('button', {
        name: 'pick-connected-device-button',
      }),
    );
    userEvent.click(await screen.findByRole('button', { name: device.name }));
    await waitFor(() => expect(transferPlaybackMock).not.toHaveBeenCalled());
  });
});
