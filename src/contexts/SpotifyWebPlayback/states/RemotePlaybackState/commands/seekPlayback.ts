import type { AxiosInstance } from 'axios';

import type { SeekPlaybackPayload } from '../../../typings/Command';

export async function seekPlayback(params: {
  apiClient: AxiosInstance;
  deviceId: string;
  payload: SeekPlaybackPayload;
}) {
  const {
    apiClient,
    deviceId,
    payload: { position_ms },
  } = params;
  await apiClient.request({
    method: 'PUT',
    params: {
      device_id: deviceId,
      position_ms,
    },
    url: 'me/player/seek',
  });
}
