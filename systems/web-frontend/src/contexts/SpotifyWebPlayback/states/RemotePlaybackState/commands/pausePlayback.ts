import type { AxiosInstance } from 'axios';

export async function pausePlayback(params: {
  apiClient: AxiosInstance;
  deviceId: string;
}) {
  const { apiClient, deviceId } = params;
  await apiClient.request({
    method: 'PUT',
    params: {
      device_id: deviceId,
    },
    url: 'me/player/pause',
  });
}
