import React from 'react';

import useDataFetcher from '../../hooks/useDataFetcher';
import useSpotifyAPIClient from '../../hooks/useSpotifyAPIClient';
import getUserTop, {
  Type,
} from '../../services/spotify/personalization/getUserTop';
import searchPlayLists from '../../services/spotify/search/searchPlayLists';
import withSuspense from '../HOC/withSuspense';
import PresentPlayList from './Present';

export function ByLastPlayedTrack() {
  const apiClient = useSpotifyAPIClient();
  const response = useDataFetcher(
    ['search/playlist', 'by-last-played-track'],
    async () => {
      const { data: tracks } = await getUserTop(apiClient, Type.TRACK);
      const _artist = tracks.items[0].artists[0];
      const query: string = `"${_artist.name}"`;
      const searchResponse = await searchPlayLists(apiClient, query);
      const {
        data: {
          playlists: { items: _playlists },
        },
      } = searchResponse;
      return Object.assign(searchResponse, {
        data: {
          artist: _artist,
          playlists: _playlists,
        },
      });
    },
  );

  return (
    <PresentPlayList
      title={`More track by ${response.data.artist?.name}`}
      playlists={response.data.playlists}
      data-testid="playlist-from-last-played-track"
    />
  );
}

export default withSuspense(ByLastPlayedTrack);
