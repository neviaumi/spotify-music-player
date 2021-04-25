import type { AxiosInstance } from 'axios';

import type { SetShuffleModePayload } from '../../../typings/Command';

export async function setShuffleMode(params: {
  apiClient: AxiosInstance;
  deviceId: string;
  payload: SetShuffleModePayload;
}) {
  const {
    apiClient,
    deviceId,
    payload: { shouldPlayOnShuffleMode },
  } = params;
  await apiClient.request({
    method: 'PUT',
    params: {
      device_id: deviceId,
      state: shouldPlayOnShuffleMode,
    },
    url: 'me/player/shuffle',
  });
}
