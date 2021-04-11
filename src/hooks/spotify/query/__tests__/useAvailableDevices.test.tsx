import { renderHook } from '@testing-library/react-hooks';
import casual from 'casual';

import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import { setupMockServer } from '../../../../../testHelper/polly/setupMockServer';
import { TestApp } from '../../../../App';
import { useAvailableDevices } from '../useAvailableDevices';

const context = createPollyContext();

describe('Test useAvailableDevices', () => {
  it('Should call API and report empty Array', async () => {
    setupMockServer(context.polly, {
      handlers: {
        spotifyAPI: {
          get: {
            '/v1/me/player/devices': jest.fn().mockImplementation((_, res) => {
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
    // @ts-expect-error
    expect(result.current.data.data).toStrictEqual({
      devices: [],
    });
  });

  it('Should call API and report contained device', async () => {
    const devices = [casual.DeviceObject()];
    setupMockServer(context.polly, {
      handlers: {
        spotifyAPI: {
          get: {
            '/v1/me/player/devices': jest.fn().mockImplementation((_, res) => {
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
    // @ts-expect-error
    expect(result.current.data.data).toStrictEqual({
      devices,
    });
  });
});
