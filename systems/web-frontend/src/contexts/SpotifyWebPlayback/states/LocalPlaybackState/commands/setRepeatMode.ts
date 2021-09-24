import type { AxiosInstance } from 'axios';

import type { SetRepeatModePayload } from '../../../typings/Command';

export async function setRepeatMode(params: {
  apiClient: AxiosInstance;
  deviceId: string;
  payload: SetRepeatModePayload;
}) {
  const {
    apiClient,
    deviceId,
    payload: { repeatMode },
  } = params;
  await apiClient.request({
    method: 'PUT',
    params: {
      device_id: deviceId,
      state: repeatMode,
    },
    url: 'me/player/repeat',
  });
}
