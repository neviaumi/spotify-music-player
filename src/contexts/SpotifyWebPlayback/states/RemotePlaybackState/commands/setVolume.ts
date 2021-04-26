import type { AxiosInstance } from 'axios';

import type { SetVolumePayload } from '../../../typings/Command';

export async function setVolume(params: {
  apiClient: AxiosInstance;
  deviceId: string;
  payload: SetVolumePayload;
}) {
  const {
    apiClient,
    deviceId,
    payload: { volume },
  } = params;
  await apiClient.request({
    method: 'PUT',
    params: {
      device_id: deviceId,
      volume_percent: volume,
    },
    url: 'me/player/volume',
  });
}
