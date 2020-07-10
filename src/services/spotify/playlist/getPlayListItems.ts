import { omit } from 'ramda';

import { Fetcher } from '../typings/fetcher';

export interface Response {
  items: { track: Spotify.Track }[];
}

const getPlayListItems: Fetcher<Response> = async (
  apiClient,
  playListId: string,
) => {
  const { data, ...rest } = await apiClient.request<Response>({
    url: `/playlists/${playListId}/tracks`,
    method: 'GET',
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
