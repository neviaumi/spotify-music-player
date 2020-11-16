import { omit } from 'ramda';

import type { Fetcher } from '../typings/fetcher';

export interface Response {
  items: { track: Spotify.Track }[];
}

const getPlayListItems: Fetcher<Response> = async (
  apiClient,
  playListId: string,
) => {
  const { data, ...rest } = await apiClient.request<Response>({
    method: 'GET',
    url: `/playlists/${playListId}/tracks`,
  });
  return {
    ...rest,
    data: {
      ...omit(['items'], data),
      items: data.items.filter(item => item.track),
    },
  };
};

export default getPlayListItems;
