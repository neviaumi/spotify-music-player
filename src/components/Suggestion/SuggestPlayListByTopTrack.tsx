import React from 'react';

import useDataFetcher from '../../hooks/useDataFetcher';
import useSpotifyAPIClient from '../../hooks/useSpotifyAPIClient';
import searchPlayListsByTopTrack from '../../services/spotify/search/searchPlayListsByTopTrack';
import withSuspense from '../HOC/withSuspense';
import PresentSuggestionList from './Present/PresentSuggestionList';

export function SuggestPlayListByTopTrack() {
  const apiClient = useSpotifyAPIClient();
  const response = useDataFetcher(['search/playlist', 'by-top-track'], () =>
    searchPlayListsByTopTrack(apiClient),
  );

  return (
    <PresentSuggestionList
      title={`More like ${response.data.track?.name}`}
      suggestions={response.data.playlists}
      data-testid="playlist-by-top-track"
    />
  );
}

export default withSuspense(SuggestPlayListByTopTrack);
