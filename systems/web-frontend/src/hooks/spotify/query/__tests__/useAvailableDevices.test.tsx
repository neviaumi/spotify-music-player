import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import {
  createMockHandler,
  setupMockServer,
} from '../../../../../testHelper/polly/setupMockServer';
import { DeviceObject } from '../../../../../testHelper/seeders/DeviceObject';
import { describe, expect, it } from '../../../../../testHelper/test-runner';
import { renderHook } from '../../../../../testHelper/testing-library/react-hooks';
import { TestApp } from '../../../../App';
import { useAvailableDevices } from '../useAvailableDevices';

const context = createPollyContext(import.meta.url);

describe('Test useAvailableDevices', () => {
  it('Should call API and report empty Array', async () => {
    setupMockServer(context.polly, {
      handlers: {
        spotifyAPI: {
          get: {
            '/v1/me/player/devices': createMockHandler((_, res) => {
              res.status(200).json({
                devices: [],
              });
            }),
          },
        },
      },
    });
    const { result, waitFor } = renderHook(() => useAvailableDevices(), {
      wrapper: ({ children }) => <TestApp>{children}</TestApp>,
    });
    await waitFor(() => expect(result.current.data).toBeDefined());
    expect(result.current.data?.data).toStrictEqual({
      devices: [],
    });
  });

  it('Should call API and report contained device', async () => {
    const devices = [DeviceObject()];
    setupMockServer(context.polly, {
      handlers: {
        spotifyAPI: {
          get: {
            '/v1/me/player/devices': createMockHandler((_, res) => {
              res.status(200).json({
                devices,
              });
            }),
          },
        },
      },
    });
    const { result, waitFor } = renderHook(() => useAvailableDevices(), {
      wrapper: ({ children }) => <TestApp>{children}</TestApp>,
    });
    await waitFor(() => expect(result.current.data).toBeDefined());
    expect(result.current.data?.data).toStrictEqual({
      devices,
    });
  });
});
