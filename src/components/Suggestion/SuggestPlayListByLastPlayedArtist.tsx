import React from 'react';

import useDataFetcher from '../../hooks/useDataFetcher';
import useSpotifyAPIClient from '../../hooks/useSpotifyAPIClient';
import searchPlayListByLastPlayedArtist from '../../services/spotify/search/searchPlayListByLastPlayedArtist';
import withSuspense from '../HOC/withSuspense';
import PresentSuggestionList from './Present/PresentSuggestionList';

export function SuggestPlayListByLastPlayedArtist() {
  const apiClient = useSpotifyAPIClient();
  const response = useDataFetcher(
    ['search/playlist', 'by-last-played-artist'],
    () => searchPlayListByLastPlayedArtist(apiClient),
  );

  return (
    <PresentSuggestionList
      title={`Continue with ${response.data.artist?.name}`}
      suggestions={response.data.playlists}
      data-testid="playlist-by-last-played-artist"
    />
  );
}

export default withSuspense(SuggestPlayListByLastPlayedArtist);
