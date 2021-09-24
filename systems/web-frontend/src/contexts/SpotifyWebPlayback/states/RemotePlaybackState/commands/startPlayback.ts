import type { AxiosInstance } from 'axios';

import type { StartPlaybackPayload } from '../../../typings/Command';

export async function startPlayback(params: {
  apiClient: AxiosInstance;
  deviceId: string;
  payload: StartPlaybackPayload;
}) {
  const { apiClient, deviceId, payload } = params;
  await apiClient.request({
    data: payload,
    method: 'PUT',
    params: {
      device_id: deviceId,
    },
    url: 'me/player/play',
  });
}
